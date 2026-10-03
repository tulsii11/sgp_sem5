import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock, 
  X, 
  Search, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Save, 
  Sparkles
} from 'lucide-react';
import { companyService } from '../../services/companyService';

export const CompanyJobForm = ({ companyId, jobToEdit = null, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Job Fields
  const [title, setTitle] = useState(jobToEdit?.title || '');
  const [jobType, setJobType] = useState(jobToEdit?.job_type || 'Full-Time Campus Drive');
  const [location, setLocation] = useState(jobToEdit?.location || 'Bangalore / Hybrid');
  const [experienceRequired, setExperienceRequired] = useState(jobToEdit?.experience_required || 'Freshers (2026 Batch)');
  const [salary, setSalary] = useState(jobToEdit?.salary || '10 - 15 LPA');
  const [deadline, setDeadline] = useState(
    jobToEdit?.application_deadline 
      ? new Date(jobToEdit.application_deadline).toISOString().split('T')[0] 
      : ''
  );
  const [description, setDescription] = useState(jobToEdit?.description || '');

  // Skills State
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(
    (jobToEdit?.required_skills || []).map(s => (typeof s === 'string' ? s : s.id))
  );
  const [skillSearch, setSkillSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchSkills = async () => {
      const skills = await companyService.getAvailableSkills();
      setAllSkills(skills);
    };
    fetchSkills();
  }, []);

  const categories = ['All', ...new Set(allSkills.map(s => s.category).filter(Boolean))];

  const filteredSkills = allSkills.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(skillSearch.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const toggleSkill = (skillId) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId) 
        : [...prev, skillId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Job Title is required.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        job_type: jobType,
        location,
        experience_required: experienceRequired,
        salary,
        application_deadline: deadline || null,
        description
      };

      if (jobToEdit?.id) {
        await companyService.updateJob({
          jobId: jobToEdit.id,
          jobData: payload,
          skillIds: selectedSkills
        });
      } else {
        await companyService.createJob({
          companyId,
          jobData: payload,
          skillIds: selectedSkills
        });
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Job save error:', err);
      setErrorMsg(err.message || 'Failed to save job opening to Supabase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAF2FB] shadow-xs"
    >
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EAF2FB]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#18B7C9]/15 text-[#18B7C9] flex items-center justify-center font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#0B2A52]">
              {jobToEdit ? 'Edit Placement Opening' : 'Create New Campus Drive Opening'}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Mapped directly to public.jobs and public.job_skills
            </p>
          </div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="p-4 mb-6 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* title */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">
              Job / Role Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Associate Software Engineer / Data Platform Specialist"
              className="w-full px-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
            />
          </div>

          {/* job_type */}
          <div>
            <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Employment / Drive Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
            >
              <option value="Full-Time Campus Drive">Full-Time Campus Drive</option>
              <option value="Internship cum PPO">Internship cum PPO (6 Months)</option>
              <option value="Summer Engineering Internship">Summer Engineering Internship</option>
              <option value="Product SDE Opening">Product SDE Opening</option>
              <option value="Off-Campus Hiring">Off-Campus Hiring</option>
              <option value="Contract / Project-Based">Contract / Project-Based</option>
            </select>
          </div>

          {/* location */}
          <div>
            <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Work Location</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bangalore / Hyderabad / Pune (Hybrid / Remote)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
              />
            </div>
          </div>

          {/* experience_required */}
          <div>
            <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Target Experience / Batch</label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={experienceRequired}
                onChange={(e) => setExperienceRequired(e.target.value)}
                placeholder="e.g. Freshers (2026 Batch) / 0-1 Year Experience"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
              />
            </div>
          </div>

          {/* salary */}
          <div>
            <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Compensation Package (CTC)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. 10 - 14 LPA (Fixed + Performance Incentive)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
              />
            </div>
          </div>

          {/* application_deadline */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Application Deadline</label>
            <div className="relative max-w-sm">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
              />
            </div>
          </div>

          {/* description */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">
              Role Description & Eligibility Criteria
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline responsibilities, minimum academic cutoffs, technical expectations, and interview rounds..."
              className="w-full p-3.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
            />
          </div>
        </div>

        {/* SECTION 2: REQUIRED SKILLS TAXONOMY (job_skills -> skills) */}
        <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-[#EAF2FB] space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-extrabold text-[#0B2A52] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#18B7C9]" />
                <span>Required Skills (Persisted in public.job_skills)</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                Select standardized skills to empower ML recommendation and applicant matching.
              </p>
            </div>
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#18B7C9]/15 text-[#0B2A52]">
              {selectedSkills.length} Selected
            </span>
          </div>

          {/* Selected Skills Chips */}
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 pb-2 border-b border-[#EAF2FB]">
              {selectedSkills.map(sId => {
                const skillObj = allSkills.find(s => s.id === sId);
                const skillName = skillObj ? skillObj.name : sId;
                return (
                  <span
                    key={sId}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#0B2A52] text-white text-[11px] font-bold shadow-xs"
                  >
                    <span>{skillName}</span>
                    <button
                      type="button"
                      onClick={() => toggleSkill(sId)}
                      className="p-0.5 hover:bg-white/20 rounded-full cursor-pointer"
                    >
                      <X className="w-3 h-3 text-[#18B7C9]" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {allSkills.length === 0 ? (
            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">No skills available in the database</p>
                <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                  The Supabase <code>public.skills</code> table currently contains no records. The database is the sole source of truth for technical skills. When skills are populated in Supabase, they will automatically appear here for selection.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <div className="flex-1 relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search skills by keyword (e.g. React, Python, Docker)..."
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Skill Selection Cloud */}
              <div className="max-h-40 overflow-y-auto p-2 bg-white rounded-xl border border-[#EAF2FB] flex flex-wrap gap-1.5">
                {filteredSkills.length === 0 ? (
                  <p className="text-[11px] text-slate-400 p-2">No matching skills found for your search.</p>
                ) : (
                  filteredSkills.map(skill => {
                    const isSelected = selectedSkills.includes(skill.id);
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => toggleSkill(skill.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer inline-flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#18B7C9] text-white border-[#18B7C9]'
                            : 'bg-[#F5F8FC] text-slate-700 border-slate-200 hover:border-[#18B7C9] hover:bg-[#EAF2FB]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{skill.name}</span>
                        <span className="text-[9px] opacity-75 font-normal">({skill.category})</span>
                      </button>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EAF2FB]">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#18B7C9] text-white rounded-xl text-xs font-extrabold hover:bg-[#159FB0] shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Publishing to Supabase...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{jobToEdit ? 'Save Changes' : 'Publish Job Drive'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CompanyJobForm;
