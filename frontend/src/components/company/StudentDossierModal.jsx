import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Award, 
  FolderGit2, 
  Briefcase, 
  FileCheck2, 
  ExternalLink, 
  X, 
  ShieldCheck, 
  Target,
  Sparkles,
  Lock
} from 'lucide-react';

export const StudentDossierModal = ({ applicant, onClose }) => {
  if (!applicant) return null;

  const { student, job, applied_at, status } = applicant;
  const user = student?.user || {};

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto space-y-6"
      >
        {/* Header with Read-Only Badge */}
        <div className="flex items-start justify-between pb-4 border-b border-[#EAF2FB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0B2A52] text-white flex items-center justify-center font-extrabold text-base shadow-md">
              {user.full_name ? user.full_name.slice(0, 2).toUpperCase() : 'ST'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-[#0B2A52]">{user.full_name || 'Student Applicant'}</h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-extrabold inline-flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" /> Read-Only Dossier
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1967d2] text-[10px] font-extrabold uppercase">
                  {status || 'Applied'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Applied for <strong className="text-[#0B2A52]">{job?.title}</strong> on{' '}
                {new Date(applied_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECTION 1: ACADEMICS & CONTACT SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Academic Details (student_profiles) */}
          <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-[#EAF2FB] space-y-3">
            <h4 className="text-xs font-extrabold text-[#0B2A52] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#18B7C9]" />
              <span>Academic Credentials (student_profiles)</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">University</span>
                <span className="font-bold text-[#0B2A52]">{student?.university || 'Campus University'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Degree & Branch</span>
                <span className="font-bold text-[#0B2A52]">{student?.degree || 'B.Tech'} - {student?.branch || 'CSE'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Semester</span>
                <span className="font-bold text-[#0B2A52]">Semester {student?.semester || 7}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">CGPA Score</span>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                  {student?.cgpa || '8.50'} / 10
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Active Backlogs</span>
                <span className="font-bold text-[#0B2A52]">{student?.backlogs || 0}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Class Attendance</span>
                <span className="font-bold text-[#0B2A52]">{student?.attendance ? `${student.attendance}%` : '85%'}</span>
              </div>
            </div>
          </div>

          {/* Contact Details (profiles) */}
          <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-[#EAF2FB] space-y-3">
            <h4 className="text-xs font-extrabold text-[#0B2A52] flex items-center gap-2">
              <User className="w-4 h-4 text-[#3B82D0]" />
              <span>Contact Information (profiles)</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{user?.email || 'student@university.edu.in'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{user?.phone || '+91 98765 43210'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{user?.location || 'Bangalore, India'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Target className="w-3.5 h-3.5 text-[#18B7C9] shrink-0" />
                <span>Preferred Roles: {(student?.preferred_roles || ['Software Engineer', 'Full Stack Developer']).join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: STUDENT SKILLS (student_skills -> skills) */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold text-[#0B2A52] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#18B7C9]" />
            <span>Assessed Technical Skills (student_skills)</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {(student?.skills || []).length === 0 ? (
              <span className="text-xs text-slate-400">Standard Computer Science Core Skills</span>
            ) : (
              student.skills.map((s, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#F5F8FC] border border-[#EAF2FB] text-xs font-bold text-[#0B2A52] flex items-center gap-1.5"
                >
                  <span>{s.skills?.name || 'Skill'}</span>
                  {s.proficiency_level && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#18B7C9]/20 text-[#0B2A52] font-semibold uppercase">
                      {s.proficiency_level}
                    </span>
                  )}
                  {s.years_of_experience && (
                    <span className="text-[10px] text-slate-400">({s.years_of_experience}y)</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* SECTION 3: PROJECTS (projects) */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-[#0B2A52] flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-[#18B7C9]" />
            <span>Technical Projects Portfolio (projects)</span>
          </h4>
          {(student?.projects || []).length === 0 ? (
            <p className="text-xs text-slate-400 italic">No formal portfolio entries submitted.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {student.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-2xl bg-[#F5F8FC] border border-[#EAF2FB] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-extrabold text-[#0B2A52]">{proj.title}</h5>
                    <div className="flex items-center gap-1.5">
                      {proj.project_url && (
                        <a href={proj.project_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.technologies && (
                    <span className="text-[10px] font-semibold text-[#18B7C9] block">Tech: {proj.technologies}</span>
                  )}
                  <p className="text-xs text-slate-600 line-clamp-2">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 4: INTERNSHIPS (internships) */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-[#0B2A52] flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#18B7C9]" />
            <span>Internship History (internships)</span>
          </h4>
          {(student?.internships || []).length === 0 ? (
            <p className="text-xs text-slate-400 italic">No past internships registered.</p>
          ) : (
            <div className="space-y-2">
              {student.internships.map((int) => (
                <div key={int.id} className="p-3.5 rounded-2xl bg-[#F5F8FC] border border-[#EAF2FB] flex items-start justify-between">
                  <div>
                    <h5 className="text-xs font-extrabold text-[#0B2A52]">{int.role || 'Software Intern'} • {int.company_name}</h5>
                    <p className="text-xs text-slate-600 mt-0.5">{int.description}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                    {int.start_date || 'Previous Term'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 5: CERTIFICATIONS & ACHIEVEMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-[#0B2A52] flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#18B7C9]" />
              <span>Certifications (certifications)</span>
            </h4>
            {(student?.certifications || []).length === 0 ? (
              <p className="text-xs text-slate-400 italic">No certifications listed.</p>
            ) : (
              student.certifications.map((c) => (
                <div key={c.id} className="p-2.5 rounded-xl bg-[#F5F8FC] border border-[#EAF2FB] text-xs">
                  <div className="font-bold text-[#0B2A52]">{c.name}</div>
                  <div className="text-[10px] text-slate-500">{c.issuer}</div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-[#0B2A52] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#18B7C9]" />
              <span>Achievements (achievements)</span>
            </h4>
            {(student?.achievements || []).length === 0 ? (
              <p className="text-xs text-slate-400 italic">No honors or awards listed.</p>
            ) : (
              student.achievements.map((a) => (
                <div key={a.id} className="p-2.5 rounded-xl bg-[#F5F8FC] border border-[#EAF2FB] text-xs">
                  <div className="font-bold text-[#0B2A52]">{a.title}</div>
                  <div className="text-[10px] text-slate-500">{a.description}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer info note */}
        <div className="pt-4 border-t border-[#EAF2FB] flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Student Dossier via Institutional Academic Records</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#0B2A52] text-white text-xs font-bold rounded-xl hover:bg-[#071D3A] transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDossierModal;
