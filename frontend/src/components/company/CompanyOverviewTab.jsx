import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { companyService } from '../../services/companyService';

export const CompanyOverviewTab = ({ company, onNavigateTab, onSelectJobForApplicants }) => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const companyId = company?.companyId || company?.companyProfile?.id;

  const loadData = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const [fetchedJobs, fetchedApps] = await Promise.all([
        companyService.getCompanyJobs(companyId),
        companyService.getCompanyApplicants(companyId, 'all')
      ]);
      setJobs(fetchedJobs || []);
      setApplicants(fetchedApps || []);
    } catch (err) {
      console.error('Failed to load overview data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [companyId]);

  // Derived Analytics from actual database fields
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(j => {
    if (!j.application_deadline) return true;
    return new Date(j.application_deadline) >= new Date();
  }).length;
  const totalApplications = applicants.length;

  const recentJobs = jobs.slice(0, 4);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B2A52] via-[#0D366A] to-[#071D3A] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#18B7C9]/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-[#18B7C9]/20 text-[#18B7C9] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border border-[#18B7C9]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Recruiter Portal</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome, {company?.companyProfile?.company_name || 'Partner Recruiter'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Publish placement drives, review verified academic dossiers, and streamline campus candidate selection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('company_create_job')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#18B7C9] text-[#0B2A52] font-extrabold text-xs shadow-md hover:bg-[#159FB0] hover:text-white transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Opening</span>
            </button>

            <button
              onClick={() => onNavigateTab('company_profile')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer border border-white/10"
            >
              <Building2 className="w-4 h-4 text-[#18B7C9]" />
              <span>Company Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Metrics Cards from Supabase DB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Total Jobs */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Total Openings Posted
            </span>
            <div className="text-3xl font-extrabold text-[#0B2A52] mt-1">{totalJobs}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Active on campus portal</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Active Jobs */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Active / Accepting Drives
            </span>
            <div className="text-3xl font-extrabold text-emerald-600 mt-1">{activeJobs}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Within deadline window</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Total Applications */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Candidate Applications
            </span>
            <div className="text-3xl font-extrabold text-[#18B7C9] mt-1">{totalApplications}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Verified student submissions</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#18B7C9]/15 text-[#18B7C9] flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Openings Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAF2FB] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAF2FB]">
          <div>
            <h3 className="text-base font-extrabold text-[#0B2A52]">Recent Campus Postings</h3>
            <p className="text-xs text-slate-400">Recently created job openings and current application metrics</p>
          </div>
          <button
            onClick={() => onNavigateTab('company_jobs')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({totalJobs})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#18B7C9]" />
            <span>Loading recent jobs from Supabase...</span>
          </div>
        ) : recentJobs.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No campus jobs created yet. Click "Post New Opening" to create your first listing.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentJobs.map((j) => (
              <div
                key={j.id}
                className="p-5 rounded-2xl bg-[#F5F8FC] border border-[#EAF2FB] flex flex-col justify-between hover:border-[#18B7C9] transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#18B7C9]/15 text-[#0B2A52] uppercase">
                      {j.job_type}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700">{j.salary || 'Competitive'}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#0B2A52]">{j.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{j.location} • {j.experience_required}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EAF2FB] flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>{j.applications_count || 0} applicants</span>
                  </span>

                  <button
                    onClick={() => {
                      if (onSelectJobForApplicants) onSelectJobForApplicants(j.id);
                      onNavigateTab('company_applicants');
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    View Applicants &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          onClick={() => onNavigateTab('company_create_job')}
          className="p-6 bg-white rounded-3xl border border-[#EAF2FB] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#0B2A52]">Publish New Role</h4>
            <p className="text-xs text-slate-400 mt-0.5">Post an opening with skills criteria</p>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('company_applicants')}
          className="p-6 bg-white rounded-3xl border border-[#EAF2FB] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#0B2A52]">Review Applicants</h4>
            <p className="text-xs text-slate-400 mt-0.5">Inspect read-only student dossiers</p>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('company_profile')}
          className="p-6 bg-white rounded-3xl border border-[#EAF2FB] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#18B7C9]/15 text-[#18B7C9] flex items-center justify-center font-bold shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#0B2A52]">Organization Profile</h4>
            <p className="text-xs text-slate-400 mt-0.5">Update branding & contact info</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyOverviewTab;
