-- STEP 1: Diagnose current policies
-- Run this first to see what policies exist:
-- SELECT * FROM pg_policies WHERE tablename = 'exams';

-- STEP 2: Completely disable RLS temporarily to test
-- This will help us confirm if RLS is the issue
-- ALTER TABLE exams DISABLE ROW LEVEL SECURITY;

-- STEP 3: Drop ALL existing policies on exams table
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'exams'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON exams', r.policyname);
    END LOOP;
END $$;

-- STEP 4: Re-enable RLS
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;

-- STEP 5: Create simple, non-recursive policies
-- Key: Do NOT reference profiles table or any other table that might have its own RLS

-- Policy 1: Allow anyone to SELECT published exams, or their own exams
-- This uses auth.uid() which is a function, NOT a table lookup
CREATE POLICY "select_exams_policy" 
ON exams 
FOR SELECT 
USING (
  is_published = true 
  OR 
  created_by = auth.uid()
);

-- Policy 2: Allow authenticated users to INSERT exams
-- No USING clause needed for INSERT
CREATE POLICY "insert_exams_policy" 
ON exams 
FOR INSERT 
TO authenticated
WITH CHECK (
  created_by = auth.uid()
);

-- Policy 3: Allow users to UPDATE only their own exams
CREATE POLICY "update_exams_policy" 
ON exams 
FOR UPDATE 
TO authenticated
USING (
  created_by = auth.uid()
)
WITH CHECK (
  created_by = auth.uid()
);

-- Policy 4: Allow users to DELETE only their own exams
CREATE POLICY "delete_exams_policy" 
ON exams 
FOR DELETE 
TO authenticated
USING (
  created_by = auth.uid()
);

-- STEP 6: Verify policies are created
-- Run this to confirm:
-- SELECT * FROM pg_policies WHERE tablename = 'exams';
