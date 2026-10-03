import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Calendar, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw,
  X
} from 'lucide-react';
import { companyService } from '../../services/companyService';
import CompanyJobForm from './CompanyJobForm';

export const CompanyJobsTab = ({ companyId, onNavigateToApplicants, onPostNewClick }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Edit / Create Form Modal
  const [editingJob, setEditingJob] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // View Details Modal
  const [viewingJob, setViewingJob] = useState(null);

  // Delete Confirmation Modal
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadJobs = async () => {
    if (!companyId) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await companyService.getCompanyJobs(companyId);
      setJobs(data || []);
    } catch (err) {
      console.error('Failed to load company jobs:', err);
      setErrorMsg('Failed to load company jobs from Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [companyId]);

  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return;
    setDeleting(true);
    setErrorMsg('');
    try {
      await companyService.deleteJob(jobToDelete.id);
      setSuccessMsg(`Job opening "${jobToDelete.title}" deleted successfully.`);
      setTimeout(() => setSuccessMsg(''), 4000);
      setJobToDelete(null);
      await loadJobs();
    } catch (err) {
      console.error('Delete job failure:', err);
      setErrorMsg(err.message || 'Failed to delete job.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredJobs = jobs.filter(j => {
    const term = searchTerm.toLowerCase();
    const matchesTitle = j.title?.toLowerCase().includes(term);
    const matchesLoc = j.location?.toLowerCase().includes(term);
    const matchesType = j.job_type?.toLowerCase().includes(term);
    const matchesSkill = (j.required_skills || []).some(s => s.name?.toLowerCase().includes(term));
    return matchesTitle || matchesLoc || matchesType || matchesSkill;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Top Banner & Action */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAF2FB] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#18B7C9]/15 text-[#0B2A52] text-[10px] font-extrabold uppercase tracking-wider">
              Recruitment Requisitions
            </span>
            <span className="text-xs text-slate-400 font-semibold">• {jobs.length} Published</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2A52]">My Campus Job Postings</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your organization's active placement drives, technical requirements, and applicant flows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadJobs}
            disabled={loading}
            className="p-2.5 text-xs font-bold text-[#0B2A52] bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl hover:bg-[#EAF2FB] transition-colors cursor-pointer"
            title="Reload from Supabase"
          >
            <RefreshCw className={`w-4 h-4 text-[#18B7C9] ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => (onPostNewClick ? onPostNewClick() : setIsCreating(true))}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#18B7C9] text-white rounded-xl text-xs font-extrabold hover:bg-[#159FB0] shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Opening</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-rose-800">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-3 border border-[#EAF2FB] shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
        <input
          type="text"
          placeholder="Filter by title, required skills (React, Python), location, or job type..."
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

      {/* Job Form Inline (if creating or editing) */}
      {(isCreating || editingJob) && (
        <div className="mb-6">
          <CompanyJobForm
            companyId={companyId}
            jobToEdit={editingJob}
            onCancel={() => {
              setIsCreating(false);
              setEditingJob(null);
            }}
            onSuccess={async () => {
              setIsCreating(false);
              setEditingJob(null);
              setSuccessMsg(editingJob ? 'Job updated successfully!' : 'Job created and published successfully!');
              setTimeout(() => setSuccessMsg(''), 4000);
              await loadJobs();
            }}
          />
        </div>
      )}

      {/* Job Listings Grid */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 border border-[#EAF2FB] shadow-xs flex flex-col items-center justify-center min-h-[300px]">
          <RefreshCw className="w-8 h-8 text-[#18B7C9] animate-spin mb-3" />
          <p className="text-xs font-semibold text-slate-500">Querying public.jobs from Supabase...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-[#EAF2FB] shadow-xs text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#18B7C9]/15 text-[#18B7C9] flex items-center justify-center mb-3">
            <Briefcase className="w-7 h-7" />
          </div>
          <h3 className="text-base font-extrabold text-[#0B2A52] mb-1">
            {searchTerm ? 'No Openings Match Your Filter' : "You haven't created any jobs yet."}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
            {searchTerm 
              ? 'Try modifying your search criteria to match your active job titles or required skills.'
              : 'Publish your technical campus openings, define required skills, and start receiving student applicant dossiers.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => (onPostNewClick ? onPostNewClick() : setIsCreating(true))}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#18B7C9] text-white rounded-xl text-xs font-extrabold hover:bg-[#159FB0] shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Opening</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#18B7C9]/15 text-[#0B2A52] text-[10px] font-extrabold uppercase tracking-wide">
                      {job.job_type || 'Full-Time Campus Drive'}
                    </span>
                    <h3 className="text-base font-extrabold text-[#0B2A52] mt-1.5">{job.title}</h3>
                  </div>

                  {/* Applicants Badge */}
                  <button
                    onClick={() => onNavigateToApplicants && onNavigateToApplicants(job.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs font-extrabold cursor-pointer shrink-0"
                    title="Click to view applicants for this job"
                  >
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>{job.applications_count || 0} Applicants</span>
                  </button>
                </div>

                {/* Meta Attributes */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 my-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate font-semibold">{job.location || 'Flexible Location'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate font-bold text-emerald-700">{job.salary || 'Competitive CTC'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate font-semibold">{job.experience_required || 'Freshers / 2026 Batch'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate font-semibold">
                      {job.application_deadline ? `Deadline: ${new Date(job.application_deadline).toLocaleDateString()}` : 'Rolling Applications'}
                    </span>
                  </div>
                </div>

                {/* Description snippet */}
                {job.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {job.description}
                  </p>
                )}

                {/* Required Skills Chips */}
                <div className="pt-2 border-t border-[#EAF2FB]">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1.5">Required Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(job.required_skills || []).length === 0 ? (
                      <span className="text-[11px] text-slate-400">General Technical Skills</span>
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

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[#EAF2FB] flex items-center justify-between">
                <button
                  onClick={() => setViewingJob(job)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0B2A52] cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#18B7C9]" />
                  <span>Preview Details</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingJob(job)}
                    className="p-2 text-slate-600 hover:text-[#0B2A52] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    title="Edit Opening"
                  >
                    <Edit3 className="w-4 h-4 text-blue-600" />
                  </button>

                  <button
                    onClick={() => setJobToDelete(job)}
                    className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete Opening"
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewingJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#EAF2FB]">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#18B7C9]/15 text-[#0B2A52] text-[10px] font-extrabold uppercase">
                  {viewingJob.job_type}
                </span>
                <h3 className="text-xl font-extrabold text-[#0B2A52] mt-1">{viewingJob.title}</h3>
                <p className="text-xs text-slate-500">{viewingJob.location} • {viewingJob.salary}</p>
              </div>
              <button
                onClick={() => setViewingJob(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#0B2A52] mb-1">Target Experience:</h4>
                <p className="text-slate-600 font-semibold">{viewingJob.experience_required || 'Not specified'}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#0B2A52] mb-1">Application Deadline:</h4>
                <p className="text-slate-600 font-semibold">
                  {viewingJob.application_deadline ? new Date(viewingJob.application_deadline).toLocaleString() : 'Open / Rolling'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0B2A52] mb-1">Role Description:</h4>
                <div className="p-4 bg-[#F5F8FC] rounded-2xl border border-[#EAF2FB] text-slate-700 whitespace-pre-line leading-relaxed">
                  {viewingJob.description || 'No detailed description provided.'}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#0B2A52] mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(viewingJob.required_skills || []).map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-[#0B2A52] text-white rounded-xl font-bold text-[11px]">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EAF2FB] flex justify-end">
              <button
                onClick={() => setViewingJob(null)}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {jobToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#0B2A52]">Confirm Job Deletion</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Are you sure you want to permanently delete the job opening <strong className="text-[#0B2A52]">"{jobToDelete.title}"</strong>?
            </p>
            <div className="p-3 my-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-snug">
              ⚠️ Database Notice: Any linked candidate applications and required skill junctions for this opening will be cascade-removed according to the database schema.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setJobToDelete(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteConfirm}
                className="inline-flex items-center gap-2 px-5 py-2 bg-rose-600 text-white text-xs font-extrabold rounded-xl hover:bg-rose-700 shadow-md cursor-pointer disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Opening</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CompanyJobsTab;
