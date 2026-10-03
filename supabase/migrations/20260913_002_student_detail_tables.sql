-- ============================================================
-- Migration: 20260913_002_student_detail_tables.sql
-- Description: Phase 2 — Student-owned detail tables
-- Tables: student_skills, projects, internships,
--         certifications, achievements,
--         preferred_roles, preferred_locations
-- ============================================================

-- ============================================================
-- 1. STUDENT SKILLS — many-to-many junction
-- ============================================================
CREATE TABLE public.student_skills (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id          UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    skill_id            UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    proficiency_level   TEXT CHECK (proficiency_level IS NULL OR proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    years_of_experience NUMERIC(3, 1) CHECK (years_of_experience IS NULL OR years_of_experience >= 0),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_student_skill UNIQUE (student_id, skill_id)
);

COMMENT ON TABLE public.student_skills IS 'Links students to skills with proficiency metadata. One row per student-skill pair.';

CREATE INDEX idx_student_skills_student ON public.student_skills(student_id);
CREATE INDEX idx_student_skills_skill   ON public.student_skills(skill_id);

-- ============================================================
-- 2. PROJECTS
-- ============================================================
CREATE TABLE public.projects (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id   UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    title        TEXT NOT NULL,
    description  TEXT,
    technologies TEXT,
    project_url  TEXT,
    github_url   TEXT,
    start_date   DATE,
    end_date     DATE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.projects IS 'Student project portfolio entries.';

CREATE INDEX idx_projects_student ON public.projects(student_id);

-- ============================================================
-- 3. INTERNSHIPS
-- ============================================================
CREATE TABLE public.internships (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id    UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    company_name  TEXT NOT NULL,
    role          TEXT,
    description   TEXT,
    start_date    DATE,
    end_date      DATE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.internships IS 'Student internship history records.';

CREATE INDEX idx_internships_student ON public.internships(student_id);

-- ============================================================
-- 4. CERTIFICATIONS
-- ============================================================
CREATE TABLE public.certifications (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id      UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    issuer          TEXT,
    issue_date      DATE,
    credential_url  TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.certifications IS 'Student certification and credential records.';

CREATE INDEX idx_certifications_student ON public.certifications(student_id);

-- ============================================================
-- 5. ACHIEVEMENTS
-- ============================================================
CREATE TABLE public.achievements (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id       UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    title            TEXT NOT NULL,
    description      TEXT,
    achievement_date DATE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.achievements IS 'Student achievement and award records.';

CREATE INDEX idx_achievements_student ON public.achievements(student_id);

-- ============================================================
-- 6. PREFERRED ROLES
-- ============================================================
CREATE TABLE public.preferred_roles (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id  UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    role_name   TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_preferred_role UNIQUE (student_id, role_name)
);

COMMENT ON TABLE public.preferred_roles IS 'Student target job role preferences. One row per role per student.';

CREATE INDEX idx_preferred_roles_student ON public.preferred_roles(student_id);

-- ============================================================
-- 7. PREFERRED LOCATIONS
-- ============================================================
CREATE TABLE public.preferred_locations (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id  UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    location    TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_preferred_location UNIQUE (student_id, location)
);

COMMENT ON TABLE public.preferred_locations IS 'Student preferred work location preferences. One row per location per student.';

CREATE INDEX idx_preferred_locations_student ON public.preferred_locations(student_id);
