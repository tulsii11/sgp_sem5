import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  RefreshCw,
  Lock
} from 'lucide-react';
import { companyService } from '../../services/companyService';
import StudentDossierModal from './StudentDossierModal';

export const CompanyApplicantsTab = ({ companyId, initialJobFilter = null }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(initialJobFilter || 'all');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const loadData = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      // 1. Load company jobs for the filter dropdown
      const companyJobs = await companyService.getCompanyJobs(companyId);
      setJobs(companyJobs || []);

      // 2. Load applicants
      const apps = await companyService.getCompanyApplicants(companyId, selectedJobId);
      setApplicants(apps || []);
    } catch (err) {
      console.error('Failed to load company applicants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [companyId, selectedJobId]);

  const filteredApplicants = applicants.filter(app => {
    const term = searchTerm.toLowerCase();
    const student = app.student || {};
    const user = student.user || {};
    const matchesName = user.full_name?.toLowerCase().includes(term);
    const matchesEmail = user.email?.toLowerCase().includes(term);
    const matchesBranch = student.branch?.toLowerCase().includes(term);
    const matchesJob = app.job?.title?.toLowerCase().includes(term);
    return matchesName || matchesEmail || matchesBranch || matchesJob;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAF2FB] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#18B7C9]/15 text-[#0B2A52] text-[10px] font-extrabold uppercase tracking-wider">
              Candidate Pipeline
            </span>
            <span className="text-xs text-slate-400 font-semibold">• {applicants.length} Total Applicants</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2A52]">Applicant Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Review verified student applications submitted to your organization's campus drives.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#0B2A52] bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl hover:bg-[#EAF2FB] transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#18B7C9] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#EAF2FB] shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Job selector */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#18B7C9] shrink-0" />
          <span className="text-xs font-bold text-[#0B2A52] shrink-0">Filter Opening:</span>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="px-3 py-2 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
          >
            <option value="all">All Company Openings ({jobs.length})</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="flex-1 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search candidates by student name, branch, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
          />
        </div>
      </div>

      {/* Applicants List */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 border border-[#EAF2FB] shadow-xs flex flex-col items-center justify-center min-h-[300px]">
          <RefreshCw className="w-8 h-8 text-[#18B7C9] animate-spin mb-3" />
          <p className="text-xs font-semibold text-slate-500">Retrieving applicant dossiers from Supabase...</p>
        </div>
      ) : filteredApplicants.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-[#EAF2FB] shadow-xs text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-base font-extrabold text-[#0B2A52] mb-1">
            {searchTerm ? 'No Matching Applicants Found' : 'No applications have been received for this job yet.'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {searchTerm 
              ? 'Try refining your candidate search terms.'
              : 'As students discover your campus openings and apply, their verified institutional records will appear here.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApplicants.map((app) => {
            const student = app.student || {};
            const user = student.user || {};
            return (
              <div
                key={app.application_id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EAF2FB] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0B2A52] text-white flex items-center justify-center font-bold text-sm">
                        {user.full_name ? user.full_name.slice(0, 2).toUpperCase() : 'ST'}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0B2A52]">{user.full_name || 'Student Applicant'}</h4>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {student.degree || 'B.Tech'} • {student.branch || 'CSE'} (Sem {student.semester || 7})
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold capitalize">
                      {app.status || 'applied'}
                    </span>
                  </div>

                  {/* Applied Position Info */}
                  <div className="p-3 bg-[#F5F8FC] rounded-2xl border border-[#EAF2FB] mb-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Applied Role:</span>
                      <span className="font-bold text-[#0B2A52]">{app.job?.title}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Applied Date:</span>
                      <span className="font-semibold text-slate-600">
                        {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Academic Highlights */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs pb-3 border-b border-[#EAF2FB]">
                    <div className="p-2 rounded-xl bg-slate-50">
                      <span className="text-[10px] text-slate-400 block font-bold">CGPA</span>
                      <span className="font-extrabold text-emerald-700">{student.cgpa || '8.5'}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50">
                      <span className="text-[10px] text-slate-400 block font-bold">Backlogs</span>
                      <span className="font-extrabold text-[#0B2A52]">{student.backlogs || 0}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50">
                      <span className="text-[10px] text-slate-400 block font-bold">Attendance</span>
                      <span className="font-extrabold text-[#0B2A52]">{student.attendance ? `${student.attendance}%` : '90%'}</span>
                    </div>
                  </div>

                  {/* Skills preview */}
                  <div className="pt-3">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1.5">Candidate Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {(student.skills || []).slice(0, 4).map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-[#F5F8FC] border border-[#EAF2FB] text-[10px] font-bold text-[#0B2A52]">
                          {s.skills?.name || 'Skill'}
                        </span>
                      ))}
                      {(student.skills || []).length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-bold">
                          +{student.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dossier button */}
                <div className="pt-4 mt-4 border-t border-[#EAF2FB] flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 inline-flex items-center gap-1 font-semibold">
                    <Lock className="w-3 h-3" /> Read-Only Mode
                  </span>

                  <button
                    onClick={() => setSelectedApplicant(app)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B2A52] text-white rounded-xl text-xs font-bold hover:bg-[#071D3A] transition-colors cursor-pointer shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#18B7C9]" />
                    <span>View Full Dossier</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* READ-ONLY STUDENT DOSSIER MODAL */}
      {selectedApplicant && (
        <StudentDossierModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </motion.div>
  );
};

export default CompanyApplicantsTab;
