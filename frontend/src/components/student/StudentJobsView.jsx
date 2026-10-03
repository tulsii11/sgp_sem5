import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  Send, 
  Check, 
  Building2, 
  X,
  FileCheck2
} from 'lucide-react';
import { studentJobService } from '../../services/studentJobService';

export const StudentJobsView = () => {
  const [activeSubTab, setActiveSubTab] = useState('browse'); // 'browse' | 'my_applications'
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  const loadData = async () => {
    setLoading(true);
    try {
      const sId = await studentJobService.getActiveStudentId();
      setStudentId(sId);

      const [availableJobs, myApps] = await Promise.all([
        studentJobService.getAvailableJobs(),
        studentJobService.getMyApplications(sId)
      ]);

      setJobs(availableJobs || []);
      setApplications(myApps || []);
    } catch (err) {
      console.error('Failed to load student jobs data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApply = async (jobId) => {
    if (!studentId) {
      setStatusMessage({ text: 'Unable to identify active student profile.', type: 'error' });
      return;
    }

    setApplyingJobId(jobId);
    setStatusMessage({ text: '', type: '' });

    try {
      await studentJobService.applyForJob({
        jobId,
        studentId
      });

      setStatusMessage({
        text: 'Application submitted successfully to company recruitment portal!',
        type: 'success'
      });
      setTimeout(() => setStatusMessage({ text: '', type: '' }), 5000);

      // Refresh applications list
      const myApps = await studentJobService.getMyApplications(studentId);
      setApplications(myApps || []);
      if (selectedJobForModal) setSelectedJobForModal(null);
    } catch (err) {
      const isDuplicate = err.code === 'DUPLICATE_APPLICATION' || err.code === '23505';
      setStatusMessage({
        text: isDuplicate 
          ? 'You have already applied for this opening. Check "My Applications" tab.' 
          : (err.message || 'Failed to submit application. Please try again.'),
        type: 'error'
      });
    } finally {
      setApplyingJobId(null);
    }
  };

  const isApplied = (jobId) => {
    return applications.some(a => a.job_id === jobId || a.jobs?.id === jobId);
  };

  const filteredJobs = jobs.filter(j => {
    const term = searchTerm.toLowerCase();
    const title = j.title?.toLowerCase() || '';
    const company = j.company_name?.toLowerCase() || '';
    const loc = j.location?.toLowerCase() || '';
    const skills = (j.required_skills || []).map(s => s.name?.toLowerCase() || '');
    return title.includes(term) || company.includes(term) || loc.includes(term) || skills.some(s => s.includes(term));
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAF2FB] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#18B7C9]/15 text-[#0B2A52] text-[10px] font-extrabold uppercase tracking-wider">
              Campus Recruitment Portal
            </span>
            <span className="text-xs text-slate-400 font-semibold">• {jobs.length} Active Openings</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2A52]">Campus Job Drives & Openings</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover verified institutional recruitment drives, apply directly with your profile, and track application status.
          </p>
        </div>

        {/* Tab switch between browse and my applications */}
        <div className="flex items-center gap-2 bg-[#F5F8FC] p-1.5 rounded-2xl border border-[#EAF2FB]">
          <button
            onClick={() => setActiveSubTab('browse')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeSubTab === 'browse'
                ? 'bg-[#18B7C9] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0B2A52]'
            }`}
          >
            Explore Drives ({jobs.length})
          </button>
          <button
            onClick={() => setActiveSubTab('my_applications')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeSubTab === 'my_applications'
                ? 'bg-[#18B7C9] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0B2A52]'
            }`}
          >
            My Applications ({applications.length})
          </button>
        </div>
      </div>

      {/* Status Feedback Message */}
      {statusMessage.text && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* SUB-TAB 1: BROWSE AVAILABLE JOBS */}
      {activeSubTab === 'browse' && (
        <div className="space-y-5">
          {/* Search bar */}
          <div className="bg-white rounded-2xl p-3 border border-[#EAF2FB] shadow-xs flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            <input
              type="text"
              placeholder="Search by role title, company name, required skills (e.g. React, Python), or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs font-semibold text-[#0B2A52] placeholder-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl p-12 border border-[#EAF2FB] shadow-xs flex flex-col items-center justify-center min-h-[300px]">
              <RefreshCw className="w-8 h-8 text-[#18B7C9] animate-spin mb-3" />
              <p className="text-xs font-semibold text-slate-500">Loading verified openings from Supabase...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-[#EAF2FB] shadow-xs text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-[#18B7C9]/15 text-[#18B7C9] flex items-center justify-center mb-3">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-base font-extrabold text-[#0B2A52] mb-1">
                {searchTerm ? 'No Openings Match Your Search' : 'No Active Drives Published Yet'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {searchTerm 
                  ? 'Try searching with alternate skill names or job titles.' 
                  : 'Company recruiters will post placement openings and internships here soon.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.map((job) => {
                const applied = isApplied(job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#18B7C9]/15 text-[#0B2A52] uppercase">
                            {job.job_type || 'Full-Time Campus Drive'}
                          </span>
                          <h3 className="text-base font-extrabold text-[#0B2A52] mt-1.5">{job.title}</h3>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-0.5">
                            <Building2 className="w-3.5 h-3.5 text-[#18B7C9]" />
                            <span>{job.company_name}</span>
                          </div>
                        </div>

                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl shrink-0">
                          {job.salary || 'Competitive CTC'}
                        </span>
                      </div>

                      {/* Meta Attributes */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 my-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{job.location || 'Pan-India / Hybrid'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{job.experience_required || '2026 Batch'}</span>
                        </div>
                      </div>

                      {/* Description Snippet */}
                      {job.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                          {job.description}
                        </p>
                      )}

                      {/* Skills Tags */}
                      <div className="pt-2 border-t border-[#EAF2FB]">
                        <span className="text-[10px] font-bold text-slate-400 block mb-1">Required Skills:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {(job.required_skills || []).length === 0 ? (
                            <span className="text-[11px] text-slate-400">Core Engineering Proficiencies</span>
                          ) : (
                            job.required_skills.map((s, idx) => (
                              <span
                                key={s.id || idx}
                                className="px-2 py-0.5 rounded-lg bg-[#F5F8FC] border border-[#EAF2FB] text-[10px] font-bold text-[#0B2A52]"
                              >
                                {s.name}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 mt-4 border-t border-[#EAF2FB] flex items-center justify-between">
                      <button
                        onClick={() => setSelectedJobForModal(job)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0B2A52] cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-[#18B7C9]" />
                        <span>View Details</span>
                      </button>

                      {applied ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApply(job.id)}
                          disabled={applyingJobId === job.id}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#18B7C9] text-white rounded-xl text-xs font-extrabold hover:bg-[#159FB0] shadow-md transition-all cursor-pointer disabled:opacity-50"
                        >
                          {applyingJobId === job.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Applying...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Apply Now</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: MY SUBMITTED APPLICATIONS */}
      {activeSubTab === 'my_applications' && (
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-[#EAF2FB] shadow-xs text-center flex flex-col items-center justify-center">
              <FileCheck2 className="w-12 h-12 text-slate-300 mb-3" />
              <h3 className="text-base font-extrabold text-[#0B2A52] mb-1">No Applications Submitted Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                Explore campus job openings under the "Explore Drives" tab and click "Apply Now" to submit your application.
              </p>
              <button
                onClick={() => setActiveSubTab('browse')}
                className="px-4 py-2 bg-[#18B7C9] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Browse Available Openings
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAF2FB] shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-[#0B2A52] pb-3 border-b border-[#EAF2FB]">
                Your Submitted Applications ({applications.length})
              </h3>
              <div className="divide-y divide-[#EAF2FB]">
                {applications.map((app) => (
                  <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0B2A52]">
                        {app.jobs?.title || 'Campus Placement Role'}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span>Company: <strong>{app.jobs?.company_profiles?.company_name || 'Partner Recruiter'}</strong></span>
                        <span>•</span>
                        <span>Applied on: {new Date(app.applied_at || app.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold capitalize">
                        {app.status || 'Applied'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* JOB DETAILS MODAL */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-4 text-xs"
          >
            <div className="flex items-start justify-between pb-3 border-b border-[#EAF2FB]">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#18B7C9]/15 text-[#0B2A52] text-[10px] font-extrabold uppercase">
                  {selectedJobForModal.job_type}
                </span>
                <h3 className="text-lg font-extrabold text-[#0B2A52] mt-1">{selectedJobForModal.title}</h3>
                <p className="text-slate-500 font-semibold">{selectedJobForModal.company_name} • {selectedJobForModal.location}</p>
              </div>
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="font-bold text-[#0B2A52] block mb-1">Package CTC:</span>
              <p className="font-extrabold text-emerald-700 text-sm">{selectedJobForModal.salary || 'Competitive'}</p>
            </div>

            <div>
              <span className="font-bold text-[#0B2A52] block mb-1">Target Experience / Batch:</span>
              <p className="text-slate-600 font-semibold">{selectedJobForModal.experience_required || '2026 Graduating Batch'}</p>
            </div>

            <div>
              <span className="font-bold text-[#0B2A52] block mb-1">Application Deadline:</span>
              <p className="text-slate-600 font-semibold">
                {selectedJobForModal.application_deadline ? new Date(selectedJobForModal.application_deadline).toLocaleDateString() : 'Rolling Application'}
              </p>
            </div>

            <div>
              <span className="font-bold text-[#0B2A52] block mb-1">Role Description:</span>
              <div className="p-3.5 bg-[#F5F8FC] rounded-2xl border border-[#EAF2FB] text-slate-700 whitespace-pre-line leading-relaxed">
                {selectedJobForModal.description || 'No detailed description provided.'}
              </div>
            </div>

            <div>
              <span className="font-bold text-[#0B2A52] block mb-1.5">Required Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedJobForModal.required_skills || []).map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#0B2A52] text-white font-bold text-[10px]">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAF2FB] flex items-center justify-between">
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>

              {isApplied(selectedJobForModal.id) ? (
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 font-extrabold rounded-xl flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Already Applied</span>
                </span>
              ) : (
                <button
                  onClick={() => handleApply(selectedJobForModal.id)}
                  disabled={applyingJobId === selectedJobForModal.id}
                  className="px-5 py-2 bg-[#18B7C9] text-white font-extrabold rounded-xl hover:bg-[#159FB0] shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply with My Profile</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudentJobsView;
