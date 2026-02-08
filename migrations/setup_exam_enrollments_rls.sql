-- Set up RLS policies for exam_enrollments table

-- 1. Enable RLS
ALTER TABLE exam_enrollments ENABLE ROW LEVEL SECURITY;

-- 2. Drop any existing policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'exam_enrollments'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON exam_enrollments', r.policyname);
    END LOOP;
END $$;

-- 3. Create clean policies

-- SELECT: Students can see their own enrollments, teachers can see enrollments for their exams
CREATE POLICY "select_exam_enrollments_policy" 
ON exam_enrollments 
FOR SELECT 
USING (
  auth.uid() = student_id 
  OR 
  auth.uid() IN (
    SELECT created_by FROM exams WHERE exams.id = exam_enrollments.exam_id
  )
);

-- INSERT: Only teachers can enroll students (or system via functions)
CREATE POLICY "insert_exam_enrollments_policy" 
ON exam_enrollments 
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() IN (
    SELECT created_by FROM exams WHERE exams.id = exam_enrollments.exam_id
  )
);

-- DELETE: Only the exam creator can remove enrollments
CREATE POLICY "delete_exam_enrollments_policy" 
ON exam_enrollments 
FOR DELETE 
TO authenticated
USING (
  auth.uid() IN (
    SELECT created_by FROM exams WHERE exams.id = exam_enrollments.exam_id
  )
);

-- Note: We don't allow UPDATE on enrollments as they should be immutable
