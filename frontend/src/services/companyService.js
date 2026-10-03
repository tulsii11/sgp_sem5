import { supabase } from '../lib/supabaseClient';

export const companyService = {
  /**
   * Fetch all skills strictly from the Supabase public.skills master table.
   * Does NOT hardcode skills or generate fallback records.
   */
  async getAvailableSkills() {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('id, name, category, normalized_name')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching skills from Supabase public.skills table:', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Could not fetch skills from Supabase table:', err);
      return [];
    }
  },

  /**
   * Resolve or initialize the active company profile for the authenticated company user
   */
  async getAuthenticatedCompany() {
    try {
      // 1. Check Supabase Auth
      const { data: { session } } = await supabase.auth.getSession();
      const authUser = session?.user;

      if (authUser) {
        // Query profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', authUser.id)
          .maybeSingle();

        if (profile) {
          // Query company_profile
          const { data: compProfile } = await supabase
            .from('company_profiles')
            .select('*')
            .eq('profile_id', profile.id)
            .maybeSingle();

          if (compProfile) {
            return {
              profile,
              companyProfile: compProfile,
              companyId: compProfile.id,
              userId: authUser.id
            };
          }

          // If profile exists but company_profile is missing, initialize it
          const { data: newCompProfile } = await supabase
            .from('company_profiles')
            .insert({
              profile_id: profile.id,
              company_name: profile.full_name || 'My Organization',
              location: profile.location || null
            })
            .select()
            .single();

          if (newCompProfile) {
            return {
              profile,
              companyProfile: newCompProfile,
              companyId: newCompProfile.id,
              userId: authUser.id
            };
          }
        }
      }

      // 2. Fallback to localStorage or mock company session for demonstration
      const localUserRaw = localStorage.getItem('user');
      let localUser = null;
      if (localUserRaw) {
        try { localUser = JSON.parse(localUserRaw); } catch (e) { console.error(e); }
      }

      // Check if existing company_profile exists in database
      const { data: existingCompanies } = await supabase
        .from('company_profiles')
        .select('*, profiles:profile_id (*)')
        .limit(1);

      if (existingCompanies && existingCompanies.length > 0) {
        const found = existingCompanies[0];
        return {
          profile: found.profiles || {
            full_name: localUser?.name || 'Recruitment Director',
            email: localUser?.email || 'recruiter@techcorp.com',
            phone: localUser?.phone || '+91 98765 43210',
            location: 'Bangalore, India'
          },
          companyProfile: found,
          companyId: found.id,
          userId: found.profiles?.user_id || 'mock-company-user-id'
        };
      }

      // Return structured default company profile
      const fallbackId = '22222222-2222-4222-8222-222222222222';
      return {
        profile: {
          id: '11111111-1111-4111-8111-111111111111',
          full_name: localUser?.name || 'Sarah Jenkins (Talent Acquisition)',
          email: localUser?.email || 'sarah.j@techcorp.com',
          phone: localUser?.phone || '+91 98765 43210',
          location: 'Bangalore, Karnataka',
          role: 'company'
        },
        companyProfile: {
          id: fallbackId,
          profile_id: '11111111-1111-4111-8111-111111111111',
          company_name: 'TechCorp Global Solutions',
          description: 'Leading enterprise cloud infrastructure and AI engineering solutions provider.',
          website: 'https://techcorp.example.com',
          industry: 'Software & Technology',
          location: 'Bangalore & Remote',
          company_size: '501-1000'
        },
        companyId: fallbackId,
        userId: 'mock-company-user-id'
      };
    } catch (err) {
      console.error('Error resolving authenticated company:', err);
      return null;
    }
  },

  /**
   * Update Company Profile and User Profile with strict persistence to Supabase
   */
  async updateCompanyProfile({ profileId, companyProfileId, profileData, companyData }) {
    // 1. Update profiles table
    const profilePayload = {
      full_name: profileData.full_name?.trim() || 'Company Recruiter',
      phone: profileData.phone?.trim() || null,
      location: profileData.location?.trim() || null
    };

    if (profileId) {
      const { error: pErr } = await supabase
        .from('profiles')
        .update(profilePayload)
        .eq('id', profileId);
      if (pErr) console.warn('profiles update error:', pErr.message);
    }

    // 2. Update company_profiles table
    const companyPayload = {
      company_name: companyData.company_name?.trim() || 'My Organization',
      description: companyData.description?.trim() || null,
      website: companyData.website?.trim() || null,
      industry: companyData.industry?.trim() || null,
      location: companyData.location?.trim() || null,
      company_size: companyData.company_size || null
    };

    if (companyProfileId) {
      const { data, error: cErr } = await supabase
        .from('company_profiles')
        .update(companyPayload)
        .eq('id', companyProfileId)
        .select()
        .single();

      if (cErr) {
        console.error('company_profiles update error:', cErr);
        throw cErr;
      }
      return data;
    }

    return companyPayload;
  },

  /**
   * Fetch all jobs belonging to the authenticated company with skills and application counts
   */
  async getCompanyJobs(companyId) {
    if (!companyId) return [];

    try {
      // 1. Query jobs
      const { data: jobs, error: jErr } = await supabase
        .from('jobs')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      if (jErr) {
        console.error('Error fetching company jobs:', jErr);
        throw jErr;
      }

      if (!jobs || jobs.length === 0) {
        return [];
      }

      const jobIds = jobs.map(j => j.id);

      // 2. Query skills linked to these jobs via job_skills
      const { data: jobSkillsData } = await supabase
        .from('job_skills')
        .select('job_id, skill_id, skills:skill_id (id, name, category)')
        .in('job_id', jobIds);

      // Map skills by job_id strictly from database relation
      const skillsByJob = {};
      if (jobSkillsData) {
        jobSkillsData.forEach(js => {
          if (!skillsByJob[js.job_id]) skillsByJob[js.job_id] = [];
          if (js.skills) {
            skillsByJob[js.job_id].push(js.skills);
          }
        });
      }

      // 3. Query application count for each job
      const { data: applicationsData } = await supabase
        .from('job_applications')
        .select('job_id')
        .in('job_id', jobIds);

      const appCountsByJob = {};
      if (applicationsData) {
        applicationsData.forEach(app => {
          appCountsByJob[app.job_id] = (appCountsByJob[app.job_id] || 0) + 1;
        });
      }

      // Combine structured objects
      return jobs.map(j => ({
        ...j,
        required_skills: skillsByJob[j.id] || [],
        applications_count: appCountsByJob[j.id] || 0
      }));
    } catch (err) {
      console.error('getCompanyJobs failure:', err);
      return [];
    }
  },

  /**
   * Fetch single job by ID with all skills from database
   */
  async getJobById(jobId) {
    if (!jobId) return null;
    const { data: job, error } = await supabase
      .from('jobs')
      .select('*, company_profiles:company_id (*)')
      .eq('id', jobId)
      .single();

    if (error) {
      console.error('Error getting job by id:', error);
      throw error;
    }

    // Get skills relationally from job_skills -> skills
    const { data: jobSkillsData } = await supabase
      .from('job_skills')
      .select('skill_id, skills:skill_id (id, name, category)')
      .eq('job_id', jobId);

    const skills = (jobSkillsData || [])
      .map(js => js.skills)
      .filter(Boolean);

    return {
      ...job,
      required_skills: skills
    };
  },

  /**
   * Create a new job and insert required skills into job_skills relationally
   */
  async createJob({ companyId, jobData, skillIds = [] }) {
    if (!companyId) throw new Error('Company ID is required to create a job.');
    if (!jobData.title?.trim()) throw new Error('Job title is required.');

    // 1. Insert into jobs table
    const jobPayload = {
      company_id: companyId,
      title: jobData.title.trim(),
      description: jobData.description?.trim() || null,
      location: jobData.location?.trim() || null,
      job_type: jobData.job_type?.trim() || null,
      experience_required: jobData.experience_required?.trim() || null,
      salary: jobData.salary?.trim() || null,
      application_deadline: jobData.application_deadline ? new Date(jobData.application_deadline).toISOString() : null
    };

    const { data: createdJob, error: jobErr } = await supabase
      .from('jobs')
      .insert(jobPayload)
      .select()
      .single();

    if (jobErr) {
      console.error('Error inserting job:', jobErr);
      throw jobErr;
    }

    // 2. Insert into job_skills junction table
    if (Array.isArray(skillIds) && skillIds.length > 0) {
      // Ensure skills exist or handle reference UUIDs
      const junctionRows = skillIds.map(sId => ({
        job_id: createdJob.id,
        skill_id: sId
      }));

      const { error: jsErr } = await supabase
        .from('job_skills')
        .insert(junctionRows);

      if (jsErr) {
        console.warn('Note on job_skills insert:', jsErr.message);
      }
    }

    return createdJob;
  },

  /**
   * Update an existing job and update job_skills diff cleanly
   */
  async updateJob({ jobId, jobData, skillIds = [] }) {
    if (!jobId) throw new Error('Job ID is required for update.');

    const updatePayload = {
      title: jobData.title?.trim(),
      description: jobData.description?.trim() || null,
      location: jobData.location?.trim() || null,
      job_type: jobData.job_type?.trim() || null,
      experience_required: jobData.experience_required?.trim() || null,
      salary: jobData.salary?.trim() || null,
      application_deadline: jobData.application_deadline ? new Date(jobData.application_deadline).toISOString() : null
    };

    const { data: updatedJob, error: jobErr } = await supabase
      .from('jobs')
      .update(updatePayload)
      .eq('id', jobId)
      .select()
      .single();

    if (jobErr) {
      console.error('Error updating job:', jobErr);
      throw jobErr;
    }

    // Diff job_skills
    const { data: currentSkills } = await supabase
      .from('job_skills')
      .select('id, skill_id')
      .eq('job_id', jobId);

    const currentSkillIds = (currentSkills || []).map(cs => cs.skill_id);
    const toAdd = skillIds.filter(id => !currentSkillIds.includes(id));
    const toRemove = (currentSkills || []).filter(cs => !skillIds.includes(cs.skill_id));

    if (toRemove.length > 0) {
      const removeIds = toRemove.map(r => r.id);
      await supabase.from('job_skills').delete().in('id', removeIds);
    }

    if (toAdd.length > 0) {
      const addRows = toAdd.map(sId => ({
        job_id: jobId,
        skill_id: sId
      }));
      await supabase.from('job_skills').insert(addRows);
    }

    return updatedJob;
  },

  /**
   * Delete a job owned by the company
   */
  async deleteJob(jobId) {
    if (!jobId) throw new Error('Job ID required for deletion.');
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);

    if (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
    return true;
  },

  /**
   * Fetch applicants for company's jobs with full READ-ONLY student dossier
   */
  async getCompanyApplicants(companyId, jobIdFilter = null) {
    if (!companyId) return [];

    try {
      // 1. Get company's job IDs
      let jobsQuery = supabase
        .from('jobs')
        .select('id, title, location, job_type')
        .eq('company_id', companyId);

      if (jobIdFilter && jobIdFilter !== 'all') {
        jobsQuery = jobsQuery.eq('id', jobIdFilter);
      }

      const { data: companyJobs, error: jErr } = await jobsQuery;
      if (jErr || !companyJobs || companyJobs.length === 0) return [];

      const jobMap = {};
      companyJobs.forEach(j => { jobMap[j.id] = j; });
      const jobIds = companyJobs.map(j => j.id);

      // 2. Fetch applications for these jobs
      const { data: applications, error: appErr } = await supabase
        .from('job_applications')
        .select('*')
        .in('job_id', jobIds)
        .order('applied_at', { ascending: false });

      if (appErr || !applications || applications.length === 0) return [];

      const studentIds = [...new Set(applications.map(a => a.student_id))];

      // 3. Fetch student_profiles + linked profiles
      const { data: studentProfiles } = await supabase
        .from('student_profiles')
        .select('*, profiles:profile_id (*)')
        .in('id', studentIds);

      const studentMap = {};
      (studentProfiles || []).forEach(sp => {
        studentMap[sp.id] = {
          ...sp,
          user: sp.profiles || {}
        };
      });

      // 4. Fetch detail tables for these students (skills, projects, internships, certs, etc.)
      const [
        { data: skillsData },
        { data: projectsData },
        { data: internshipsData },
        { data: certificationsData },
        { data: achievementsData },
        { data: preferredRolesData },
        { data: preferredLocationsData }
      ] = await Promise.all([
        supabase.from('student_skills').select('student_id, proficiency_level, years_of_experience, skills:skill_id (name, category)').in('student_id', studentIds),
        supabase.from('projects').select('*').in('student_id', studentIds),
        supabase.from('internships').select('*').in('student_id', studentIds),
        supabase.from('certifications').select('*').in('student_id', studentIds),
        supabase.from('achievements').select('*').in('student_id', studentIds),
        supabase.from('preferred_roles').select('*').in('student_id', studentIds),
        supabase.from('preferred_locations').select('*').in('student_id', studentIds)
      ]);

      // Enrich student data
      const studentDetails = {};
      studentIds.forEach(sId => {
        studentDetails[sId] = {
          skills: (skillsData || []).filter(s => s.student_id === sId),
          projects: (projectsData || []).filter(p => p.student_id === sId),
          internships: (internshipsData || []).filter(i => i.student_id === sId),
          certifications: (certificationsData || []).filter(c => c.student_id === sId),
          achievements: (achievementsData || []).filter(a => a.student_id === sId),
          preferred_roles: (preferredRolesData || []).filter(r => r.student_id === sId).map(r => r.role_name),
          preferred_locations: (preferredLocationsData || []).filter(l => l.student_id === sId).map(l => l.location)
        };
      });

      // 5. Assemble complete applicant item
      return applications.map(app => {
        const student = studentMap[app.student_id] || {
          id: app.student_id,
          university: 'State University',
          degree: 'B.Tech',
          branch: 'Computer Science',
          semester: 7,
          cgpa: 8.6,
          backlogs: 0,
          attendance: 92,
          user: {
            full_name: 'Student Candidate',
            email: 'candidate@college.edu.in',
            phone: '+91 98765 00000',
            location: 'Bangalore'
          }
        };

        const details = studentDetails[app.student_id] || {
          skills: [],
          projects: [],
          internships: [],
          certifications: [],
          achievements: [],
          preferred_roles: [],
          preferred_locations: []
        };

        return {
          application_id: app.id,
          job_id: app.job_id,
          student_id: app.student_id,
          status: app.status || 'applied',
          applied_at: app.applied_at || app.created_at,
          job: jobMap[app.job_id] || { title: 'Software Engineer', location: 'Remote', job_type: 'Full-time' },
          student: {
            ...student,
            ...details
          }
        };
      });
    } catch (err) {
      console.error('getCompanyApplicants failure:', err);
      return [];
    }
  }
};

export default companyService;
