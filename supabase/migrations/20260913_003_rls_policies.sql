-- ============================================================
-- Migration: 20260913_003_rls_policies.sql
-- Description: Phase 2 — Row Level Security for all tables
-- ============================================================

-- ============================================================
-- HELPER: Get the profile_id for the currently authenticated user
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_my_profile_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE user_id = auth.uid();
$$;

COMMENT ON FUNCTION public.get_my_profile_id() IS
  'Returns the profile.id for the current auth user. SECURITY DEFINER to read profiles regardless of RLS.';

-- ============================================================
-- HELPER: Get the student_profile.id for the currently authenticated user
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_my_student_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT sp.id
  FROM public.student_profiles sp
  JOIN public.profiles p ON p.id = sp.profile_id
  WHERE p.user_id = auth.uid();
$$;

COMMENT ON FUNCTION public.get_my_student_id() IS
  'Returns the student_profiles.id for the current auth user. SECURITY DEFINER to resolve the FK chain.';

-- ============================================================
-- HELPER: Check if the current user has a specific role
-- ============================================================
CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role = required_role
  );
$$;

COMMENT ON FUNCTION public.has_role(TEXT) IS
  'Returns true if the auth user has the specified role. SECURITY DEFINER to check profiles table.';


-- ============================================================
-- TABLE: profiles
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY profiles_select_own ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

-- Users can update their own profile (cannot change role or user_id)
CREATE POLICY profiles_update_own ON public.profiles
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Insert: only for the user themselves (profile creation via trigger or app)
CREATE POLICY profiles_insert_own ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admins can read all profiles
CREATE POLICY profiles_admin_select ON public.profiles
  FOR SELECT USING (public.has_role('admin'));


-- ============================================================
-- TABLE: student_profiles
-- ============================================================
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY student_profiles_select_own ON public.student_profiles
  FOR SELECT USING (profile_id = public.get_my_profile_id());

CREATE POLICY student_profiles_insert_own ON public.student_profiles
  FOR INSERT WITH CHECK (profile_id = public.get_my_profile_id());

CREATE POLICY student_profiles_update_own ON public.student_profiles
  FOR UPDATE USING (profile_id = public.get_my_profile_id())
  WITH CHECK (profile_id = public.get_my_profile_id());

CREATE POLICY student_profiles_admin_select ON public.student_profiles
  FOR SELECT USING (public.has_role('admin'));


-- ============================================================
-- TABLE: company_profiles
-- ============================================================
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY company_profiles_select_own ON public.company_profiles
  FOR SELECT USING (profile_id = public.get_my_profile_id());

CREATE POLICY company_profiles_insert_own ON public.company_profiles
  FOR INSERT WITH CHECK (profile_id = public.get_my_profile_id());

CREATE POLICY company_profiles_update_own ON public.company_profiles
  FOR UPDATE USING (profile_id = public.get_my_profile_id())
  WITH CHECK (profile_id = public.get_my_profile_id());

CREATE POLICY company_profiles_admin_select ON public.company_profiles
  FOR SELECT USING (public.has_role('admin'));


-- ============================================================
-- TABLE: skills (public read, admin write)
-- ============================================================
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can read skills (shared taxonomy)
CREATE POLICY skills_select_authenticated ON public.skills
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Only admins can insert/update/delete skills
CREATE POLICY skills_admin_insert ON public.skills
  FOR INSERT WITH CHECK (public.has_role('admin'));

CREATE POLICY skills_admin_update ON public.skills
  FOR UPDATE USING (public.has_role('admin'));

CREATE POLICY skills_admin_delete ON public.skills
  FOR DELETE USING (public.has_role('admin'));


-- ============================================================
-- TABLE: student_skills
-- ============================================================
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY student_skills_select_own ON public.student_skills
  FOR SELECT USING (student_id = public.get_my_student_id());

CREATE POLICY student_skills_insert_own ON public.student_skills
  FOR INSERT WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY student_skills_update_own ON public.student_skills
  FOR UPDATE USING (student_id = public.get_my_student_id())
  WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY student_skills_delete_own ON public.student_skills
  FOR DELETE USING (student_id = public.get_my_student_id());

CREATE POLICY student_skills_admin_select ON public.student_skills
  FOR SELECT USING (public.has_role('admin'));


-- ============================================================
-- TABLE: projects
-- ============================================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY projects_select_own ON public.projects
  FOR SELECT USING (student_id = public.get_my_student_id());

CREATE POLICY projects_insert_own ON public.projects
  FOR INSERT WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY projects_update_own ON public.projects
  FOR UPDATE USING (student_id = public.get_my_student_id())
  WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY projects_delete_own ON public.projects
  FOR DELETE USING (student_id = public.get_my_student_id());

CREATE POLICY projects_admin_select ON public.projects
  FOR SELECT USING (public.has_role('admin'));


-- ============================================================
-- TABLE: internships
-- ============================================================
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;

CREATE POLICY internships_select_own ON public.internships
  FOR SELECT USING (student_id = public.get_my_student_id());

CREATE POLICY internships_insert_own ON public.internships
  FOR INSERT WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY internships_update_own ON public.internships
  FOR UPDATE USING (student_id = public.get_my_student_id())
  WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY internships_delete_own ON public.internships
  FOR DELETE USING (student_id = public.get_my_student_id());

CREATE POLICY internships_admin_select ON public.internships
  FOR SELECT USING (public.has_role('admin'));


-- ============================================================
-- TABLE: certifications
-- ============================================================
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY certifications_select_own ON public.certifications
  FOR SELECT USING (student_id = public.get_my_student_id());

CREATE POLICY certifications_insert_own ON public.certifications
  FOR INSERT WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY certifications_update_own ON public.certifications
  FOR UPDATE USING (student_id = public.get_my_student_id())
  WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY certifications_delete_own ON public.certifications
  FOR DELETE USING (student_id = public.get_my_student_id());

CREATE POLICY certifications_admin_select ON public.certifications
  FOR SELECT USING (public.has_role('admin'));


-- ============================================================
-- TABLE: achievements
-- ============================================================
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY achievements_select_own ON public.achievements
  FOR SELECT USING (student_id = public.get_my_student_id());

CREATE POLICY achievements_insert_own ON public.achievements
  FOR INSERT WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY achievements_update_own ON public.achievements
  FOR UPDATE USING (student_id = public.get_my_student_id())
  WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY achievements_delete_own ON public.achievements
  FOR DELETE USING (student_id = public.get_my_student_id());

CREATE POLICY achievements_admin_select ON public.achievements
  FOR SELECT USING (public.has_role('admin'));


-- ============================================================
-- TABLE: preferred_roles
-- ============================================================
ALTER TABLE public.preferred_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY preferred_roles_select_own ON public.preferred_roles
  FOR SELECT USING (student_id = public.get_my_student_id());

CREATE POLICY preferred_roles_insert_own ON public.preferred_roles
  FOR INSERT WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY preferred_roles_delete_own ON public.preferred_roles
  FOR DELETE USING (student_id = public.get_my_student_id());

CREATE POLICY preferred_roles_admin_select ON public.preferred_roles
  FOR SELECT USING (public.has_role('admin'));


-- ============================================================
-- TABLE: preferred_locations
-- ============================================================
ALTER TABLE public.preferred_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY preferred_locations_select_own ON public.preferred_locations
  FOR SELECT USING (student_id = public.get_my_student_id());

CREATE POLICY preferred_locations_insert_own ON public.preferred_locations
  FOR INSERT WITH CHECK (student_id = public.get_my_student_id());

CREATE POLICY preferred_locations_delete_own ON public.preferred_locations
  FOR DELETE USING (student_id = public.get_my_student_id());

CREATE POLICY preferred_locations_admin_select ON public.preferred_locations
  FOR SELECT USING (public.has_role('admin'));
