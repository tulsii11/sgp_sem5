-- ============================================================
-- Phase 2 Verification Script
-- Run in Supabase SQL Editor AFTER executing migrations 001-004
-- ============================================================

-- ============================================================
-- V1: Verify all 11 tables exist
-- ============================================================
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
  AND table_name IN (
    'profiles', 'student_profiles', 'company_profiles',
    'skills', 'student_skills',
    'projects', 'internships', 'certifications', 'achievements',
    'preferred_roles', 'preferred_locations'
  )
ORDER BY table_name;
-- Expected: 11 rows

-- ============================================================
-- V2: Verify RLS is enabled on all tables
-- ============================================================
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'profiles', 'student_profiles', 'company_profiles',
    'skills', 'student_skills',
    'projects', 'internships', 'certifications', 'achievements',
    'preferred_roles', 'preferred_locations'
  )
ORDER BY tablename;
-- Expected: All rows show rowsecurity = true

-- ============================================================
-- V3: Verify RLS policies exist
-- ============================================================
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================
-- V4: Verify foreign keys
-- ============================================================
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name;

-- ============================================================
-- V5: Verify unique constraints
-- ============================================================
SELECT tc.table_name, tc.constraint_name, kcu.column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.constraint_type = 'UNIQUE'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_name;

-- ============================================================
-- V6: Verify check constraints
-- ============================================================
SELECT tc.table_name, tc.constraint_name, cc.check_clause
FROM information_schema.table_constraints AS tc
JOIN information_schema.check_constraints AS cc
  ON tc.constraint_name = cc.constraint_name
WHERE tc.table_schema = 'public'
  AND cc.check_clause NOT LIKE '%IS NOT NULL%'
ORDER BY tc.table_name;

-- ============================================================
-- V7: Verify indexes
-- ============================================================
SELECT indexname, tablename, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- ============================================================
-- V8: Verify helper functions exist
-- ============================================================
SELECT routine_name, routine_type, security_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN ('get_my_profile_id', 'get_my_student_id', 'has_role', 'handle_updated_at')
ORDER BY routine_name;

-- ============================================================
-- V9: Verify triggers
-- ============================================================
SELECT trigger_name, event_object_table, action_timing, event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table;

-- ============================================================
-- V10: Verify skills seed data loaded
-- ============================================================
SELECT COUNT(*) AS skill_count FROM public.skills;
SELECT category, COUNT(*) AS count
FROM public.skills
GROUP BY category
ORDER BY category;

-- ============================================================
-- RLS SCENARIO TESTS (run as anon/unauthenticated)
-- ============================================================

-- Test F: Unauthenticated access should return 0 rows
-- Run this from the Supabase API (logged out) or via:
-- SELECT * FROM public.profiles;
-- Expected: 0 rows (RLS blocks unauthenticated)

-- SELECT * FROM public.student_profiles;
-- Expected: 0 rows

-- SELECT * FROM public.skills;
-- Expected: 0 rows (requires auth.uid() IS NOT NULL)
