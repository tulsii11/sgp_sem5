-- ============================================================
-- Migration: 20260913_001_core_schema.sql
-- Description: Phase 2 — Core tables for Placement Platform
-- Tables: profiles, student_profiles, company_profiles, skills
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES — linked to auth.users via user_id
-- ============================================================
CREATE TABLE public.profiles (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    role        TEXT NOT NULL CHECK (role IN ('student', 'company', 'admin')),
    full_name   TEXT NOT NULL,
    email       TEXT NOT NULL,
    phone       TEXT,
    location    TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.profiles IS 'Core user profile linked to auth.users. One profile per auth user.';
COMMENT ON COLUMN public.profiles.user_id IS 'FK to auth.users(id) — the Supabase Auth identity.';
COMMENT ON COLUMN public.profiles.role IS 'Application role: student, company, or admin.';

-- Index for quick lookups by user_id (already UNIQUE so this is automatic)
-- Index for role filtering
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- ============================================================
-- 2. STUDENT PROFILES — one-to-one with profiles
-- ============================================================
CREATE TABLE public.student_profiles (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id  UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    university  TEXT,
    degree      TEXT,
    branch      TEXT,
    semester    INT CHECK (semester IS NULL OR (semester >= 1 AND semester <= 12)),
    cgpa        NUMERIC(4, 2) CHECK (cgpa IS NULL OR (cgpa >= 0 AND cgpa <= 10)),
    backlogs    INT DEFAULT 0 CHECK (backlogs >= 0),
    attendance  NUMERIC(5, 2) CHECK (attendance IS NULL OR (attendance >= 0 AND attendance <= 100)),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.student_profiles IS 'Academic details for students. One student_profile per profile.';

-- Index for profile_id lookups (already UNIQUE so automatic)

-- ============================================================
-- 3. COMPANY PROFILES — one-to-one with profiles
-- ============================================================
CREATE TABLE public.company_profiles (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id    UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_name  TEXT NOT NULL,
    description   TEXT,
    website       TEXT,
    industry      TEXT,
    location      TEXT,
    company_size  TEXT CHECK (company_size IS NULL OR company_size IN ('1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+')),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.company_profiles IS 'Company details for recruiter accounts. One company_profile per profile.';

-- ============================================================
-- 4. SKILLS — master skill taxonomy
-- ============================================================
CREATE TABLE public.skills (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            TEXT NOT NULL,
    category        TEXT,
    normalized_name TEXT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_skills_normalized_name UNIQUE (normalized_name)
);

COMMENT ON TABLE public.skills IS 'Master skill catalogue. normalized_name is lowercase for dedup matching.';

-- Index for category filtering
CREATE INDEX idx_skills_category ON public.skills(category);
