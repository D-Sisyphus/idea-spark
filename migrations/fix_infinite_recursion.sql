-- Fix infinite recursion in exams table policies

-- 1. Enable RLS (idempotent)
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to clear recursion
-- We drop by name if we know them, or we can try to cover common names.
-- If these fail, the user might need to check their policy names.
DROP POLICY IF EXISTS "Enable read access for all users" ON exams;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON exams;
DROP POLICY IF EXISTS "Enable update for users based on email" ON exams;
DROP POLICY IF EXISTS "Teacher can view own exams" ON exams;
DROP POLICY IF EXISTS "Teacher can create exams" ON exams;
DROP POLICY IF EXISTS "Teacher can update own exams" ON exams;
DROP POLICY IF EXISTS "Student can view published exams" ON exams;
DROP POLICY IF EXISTS "Teachers can view their own exams" ON exams;
DROP POLICY IF EXISTS "Authenticated users can select exams" ON exams;

-- 3. Create clean, non-recursive policies

-- SELECT: Teachers can see their own exams, Students can see published ones
CREATE POLICY "Exams are viewable by everyone if published, or by creator" 
ON exams FOR SELECT 
USING (
  is_published = true OR 
  auth.uid() = created_by
);

-- INSERT: Authenticated users can create exams
-- We assume 'created_by' is set to auth.uid() automatically or by the client.
-- This policy allows the insert.
CREATE POLICY "Users can create exams" 
ON exams FOR INSERT 
WITH CHECK (
  auth.role() = 'authenticated'
);

-- UPDATE: Only the creator can update their exam
CREATE POLICY "Users can update own exams" 
ON exams FOR UPDATE 
USING (
  auth.uid() = created_by
);

-- DELETE: Only the creator can delete their exam
CREATE POLICY "Users can delete own exams" 
ON exams FOR DELETE 
USING (
  auth.uid() = created_by
);
