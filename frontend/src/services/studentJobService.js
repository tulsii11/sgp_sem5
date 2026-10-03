import { supabase } from '../lib/supabaseClient';

export const studentJobService = {
  /**
   * Fetch all active/available jobs for students strictly using Supabase relations
   */
  async getAvailableJobs() {
    try {
      const { data: jobs, error: jErr } = await supabase
        .from('jobs')
        .select('*, company_profiles:company_id (*)')
        .order('created_at', { ascending: false });

      if (jErr) {
        console.warn('Error fetching jobs for students:', jErr.message);
        return [];
      }

      if (!jobs || jobs.length === 0) return [];

      const jobIds = jobs.map(j => j.id);

      // Fetch skills for these jobs strictly from job_skills -> skills relation
      const { data: jobSkillsData } = await supabase
        .from('job_skills')
        .select('job_id, skill_id, skills:skill_id (id, name, category)')
        .in('job_id', jobIds);

      const skillsMap = {};
      (jobSkillsData || []).forEach(js => {
        if (!skillsMap[js.job_id]) skillsMap[js.job_id] = [];
        if (js.skills) {
          skillsMap[js.job_id].push(js.skills);
        }
      });

      return jobs.map(j => ({
        ...j,
        company_name: j.company_profiles?.company_name || 'Partner Recruiter',
        company_website: j.company_profiles?.website || null,
        company_industry: j.company_profiles?.industry || null,
        required_skills: skillsMap[j.id] || []
      }));
    } catch (err) {
      console.error('getAvailableJobs failed:', err);
      return [];
    }
  },

  /**
   * Resolve active student_profile ID for the logged-in student
   */
  async getActiveStudentId() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profile) {
          const { data: studentProfile } = await supabase
            .from('student_profiles')
            .select('id')
            .eq('profile_id', profile.id)
            .maybeSingle();

          if (studentProfile) return studentProfile.id;
        }
      }

      // Check if any existing student profile exists in DB
      const { data: anyStudent } = await supabase
        .from('student_profiles')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (anyStudent) return anyStudent.id;

      // Fallback ID for demo / unauthenticated preview
      return '33333333-3333-4333-8333-333333333333';
    } catch (err) {
      console.warn('getActiveStudentId error:', err);
      return '33333333-3333-4333-8333-333333333333';
    }
  },

  /**
   * Fetch student's own applications
   */
  async getMyApplications(studentId) {
    if (!studentId) return [];
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*, jobs:job_id (*, company_profiles:company_id (*))')
        .eq('student_id', studentId)
        .order('applied_at', { ascending: false });

      if (error) {
        console.warn('Error fetching student applications:', error.message);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('getMyApplications error:', err);
      return [];
    }
  },

  /**
   * Apply for a job opening with duplicate prevention
   */
  async applyForJob({ jobId, studentId }) {
    if (!jobId) throw new Error('Job ID is required.');
    if (!studentId) throw new Error('Student ID is required.');

    // 1. Check existing application to respect (job_id, student_id) UNIQUE constraint
    const { data: existing } = await supabase
      .from('job_applications')
      .select('id')
      .eq('job_id', jobId)
      .eq('student_id', studentId)
      .maybeSingle();

    if (existing) {
      const duplicateError = new Error('You have already applied for this position.');
      duplicateError.code = 'DUPLICATE_APPLICATION';
      throw duplicateError;
    }

    // 2. Insert into job_applications
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        job_id: jobId,
        student_id: studentId,
        status: 'applied',
        applied_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        const dupErr = new Error('You have already applied for this position.');
        dupErr.code = 'DUPLICATE_APPLICATION';
        throw dupErr;
      }
      throw error;
    }

    return data;
  }
};

export default studentJobService;
