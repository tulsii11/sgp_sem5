import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import Stage1Profile from '../components/ScrollStory/Stage1Profile';
import Stage2Potential from '../components/ScrollStory/Stage2Potential';
import Stage3Probability from '../components/ScrollStory/Stage3Probability';
import Stage4Gaps from '../components/ScrollStory/Stage4Gaps';
import Stage5Guided from '../components/ScrollStory/Stage5Guided';

// Company Portal Components
import CompanyOverviewTab from '../components/company/CompanyOverviewTab';
import CompanyProfileTab from '../components/company/CompanyProfileTab';
import CompanyJobsTab from '../components/company/CompanyJobsTab';
import CompanyJobForm from '../components/company/CompanyJobForm';
import CompanyApplicantsTab from '../components/company/CompanyApplicantsTab';

// Student Live Jobs Component
import StudentJobsView from '../components/student/StudentJobsView';

// Services
import { companyService } from '../services/companyService';
import { logoutUser, getCurrentSessionAndProfile } from '../services/authService';

import {
  LayoutDashboard,
  UserCheck,
  TrendingUp,
  Target,
  Briefcase,
  LogOut,
  Bell,
  ChevronRight,
  Sparkles,
  FileText,
  Users,
  Plus,
  Building2,
  CheckCircle2,
  UploadCloud,
  GraduationCap,
  Cpu,
  Compass,
  ArrowRightLeft
} from 'lucide-react';

const Dashboard = ({ defaultRole, defaultTab }) => {
  const navigate = useNavigate();

  const getInitials = (nameStr) => {
    if (!nameStr) return 'CP';
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase();
  };

  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    const isCompany = defaultRole === 'company' || defaultRole === 'admin';
    return {
      name: isCompany ? 'Sarah Jenkins (Talent Lead)' : 'John Doe',
      email: isCompany ? 'recruiter@techcorp.com' : 'john.doe@xyzcollege.edu.in',
      department: isCompany ? 'Talent Acquisition • TechCorp' : 'Computer Science & Engineering',
      phone: '+91 98765 43210',
      rollNo: isCompany ? 'REC-2026-TC' : '21CS084',
      batch: '2026 Batch',
      role: isCompany ? 'company' : (defaultRole || 'student')
    };
  });

  // Active Role Mode: mapped to 'company' if admin was specified
  const initialRole = defaultRole === 'admin' ? 'company' : (defaultRole || user.role || 'student');
  const [roleMode, setRoleMode] = useState(initialRole === 'admin' ? 'company' : initialRole);

  // Active Tab
  const getInitialTab = () => {
    if (defaultTab) return defaultTab;
    if (roleMode === 'company' || defaultRole === 'admin') return 'company_overview';
    return 'overview';
  };
  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Company Data State from Supabase
  const [companyData, setCompanyData] = useState(null);
  const [selectedApplicantJobId, setSelectedApplicantJobId] = useState(null);

  // Resume Upload File State (Student Mode)
  const [uploadedResume, setUploadedResume] = useState(null);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const comp = await companyService.getAuthenticatedCompany();
        setCompanyData(comp);
      } catch (err) {
        console.error('Failed to resolve company data:', err);
      }
    };

    const verifySessionAndRole = async () => {
      try {
        const { session, profile } = await getCurrentSessionAndProfile();
        if (session?.user && profile) {
          // Role security check: prevent student account from accessing company portal
          if (roleMode === 'company' && profile.role !== 'company' && profile.role !== 'admin') {
            navigate('/dashboard');
            return;
          }
        }
      } catch (err) {
        console.error('Session role verification error:', err);
      }
    };

    loadCompany();
    verifySessionAndRole();
  }, [roleMode, navigate]);

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col md:flex-row select-none">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#071D3A] text-white flex flex-col justify-between shrink-0 p-5 border-r border-[#0B2A52]">
        <div>
          {/* Logo */}
          <div className="pb-5 border-b border-white/10 flex items-center justify-between">
            <Logo size="md" variant="full" light={true} />
          </div>

          {/* User / Company Profile Mini Badge */}
          <div className="mt-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-sm shadow-md ${
              roleMode === 'company' ? 'bg-[#18B7C9]' : 'bg-[#3B82D0]'
            }`}>
              {roleMode === 'company' ? <Building2 className="w-5 h-5 text-[#0B2A52]" /> : getInitials(user.name)}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">
                {roleMode === 'company' 
                  ? (companyData?.companyProfile?.company_name || 'TechCorp Global')
                  : user.name}
              </h4>
              <p className="text-[10px] text-slate-300 truncate">
                {roleMode === 'company' 
                  ? 'Campus Recruiter • Verified' 
                  : `${user.department || 'Student'} • Batch '26`}
              </p>
            </div>
          </div>

          {/* Role Portal Switcher */}
          <div className="mt-3">
            <button
              onClick={() => {
                const nextMode = roleMode === 'company' ? 'student' : 'company';
                setRoleMode(nextMode);
                setActiveTab(nextMode === 'company' ? 'company_overview' : 'overview');
              }}
              className="w-full py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-[11px] font-bold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/10"
              title="Toggle between Student Portal and Company Recruiter Portal"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#18B7C9]" />
              <span>Switch to {roleMode === 'company' ? 'Student View' : 'Company Recruiter View'}</span>
            </button>
          </div>

          {/* Nav Items */}
          <nav className="mt-5 space-y-1">
            {roleMode === 'company' ? (
              /* COMPANY PORTAL NAV ITEMS */
              <>
                <button
                  onClick={() => setActiveTab('company_overview')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'company_overview'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Company Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('company_profile')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'company_profile'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Company Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('company_jobs')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'company_jobs'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>My Job Openings</span>
                </button>

                <button
                  onClick={() => setActiveTab('company_create_job')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'company_create_job'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Opening</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedApplicantJobId(null);
                    setActiveTab('company_applicants');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'company_applicants'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Candidate Applicants</span>
                </button>
              </>
            ) : (
              /* STUDENT PORTAL NAV ITEMS */
              <>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Profile & Resume Upload</span>
                </button>

                <button
                  onClick={() => setActiveTab('stage1_profile')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'stage1_profile'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Stage 1 — Profile Matrix</span>
                </button>

                <button
                  onClick={() => setActiveTab('stage2_potential')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'stage2_potential'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>Stage 2 — AI Potential</span>
                </button>

                <button
                  onClick={() => setActiveTab('prediction')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'prediction'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Stage 3 — ML Prediction</span>
                </button>

                <button
                  onClick={() => setActiveTab('gaps')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'gaps'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>Stage 4 — Skill Gap Matrix</span>
                </button>

                <button
                  onClick={() => setActiveTab('stage5_guided')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'stage5_guided'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>Stage 5 — AI Roadmap</span>
                </button>

                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'jobs'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Campus Job Drives</span>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Logout CTA */}
        <div className="pt-6 border-t border-white/10">
          <button
            onClick={async () => {
              await logoutUser();
              navigate('/login');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#18B7C9]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-gradient-to-b from-[#F5F8FC] via-[#EAF2FB] to-[#DEECF9] relative">
        
        {/* Background Subtle Decor */}
        <div className="absolute top-16 left-10 pointer-events-none opacity-20 hidden md:grid grid-cols-6 gap-2.5 z-0">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#18B7C9]" />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-6">
          {/* Top Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#EAF2FB]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#18B7C9] uppercase tracking-wider">
                  {roleMode === 'company' ? 'Company Recruiter Workspace' : 'Student Placement Platform'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0B2A52] text-white flex items-center gap-1">
                  {roleMode === 'company' ? (
                    <>
                      <Building2 className="w-3 h-3 text-[#18B7C9]" />
                      <span>COMPANY PORTAL</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-3 h-3 text-[#18B7C9]" />
                      <span>STUDENT PORTAL</span>
                    </>
                  )}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B2A52] tracking-tight mt-0.5">
                {roleMode === 'company' ? (
                  <>
                    {activeTab === 'company_overview' && 'Recruiter Overview 🏢'}
                    {activeTab === 'company_profile' && 'Company Profile & Branding ⚙️'}
                    {activeTab === 'company_jobs' && 'My Campus Job Postings 💼'}
                    {activeTab === 'company_create_job' && 'Post New Campus Drive ➕'}
                    {activeTab === 'company_applicants' && 'Candidate Applicants Pipeline 👥'}
                  </>
                ) : (
                  <>
                    {activeTab === 'overview' && `Welcome back, ${user.name} 👋`}
                    {activeTab === 'profile' && 'Student Placement Profile 👤'}
                    {activeTab === 'jobs' && 'Campus Placement Drives 💼'}
                    {activeTab === 'stage1_profile' && 'Stage 1 — Academic Profile Matrix 🎓'}
                    {activeTab === 'stage2_potential' && 'Stage 2 — AI Placement Potential ⚡'}
                    {activeTab === 'prediction' && 'Stage 3 — ML Placement Probability 📈'}
                    {activeTab === 'gaps' && 'Stage 4 — Skill Gap Analysis 🎯'}
                    {activeTab === 'stage5_guided' && 'Stage 5 — AI Learning Roadmap 🧭'}
                  </>
                )}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {roleMode === 'company' && activeTab !== 'company_create_job' && (
                <button
                  onClick={() => setActiveTab('company_create_job')}
                  className="px-4 py-2 bg-[#18B7C9] text-white text-xs font-extrabold rounded-xl shadow-md hover:bg-[#159FB0] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Opening</span>
                </button>
              )}

              <button className="p-2.5 rounded-xl bg-white border border-[#EAF2FB] text-[#0B2A52] hover:bg-[#EAF2FB] transition-colors relative cursor-pointer shadow-xs">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#18B7C9]" />
              </button>
            </div>
          </div>

          {/* ========================================================== */}
          {/* COMPANY PORTAL VIEWS */}
          {/* ========================================================== */}
          {roleMode === 'company' && (
            <div className="mt-4">
              {activeTab === 'company_overview' && (
                <CompanyOverviewTab
                  company={companyData}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onSelectJobForApplicants={(jId) => setSelectedApplicantJobId(jId)}
                />
              )}

              {activeTab === 'company_profile' && (
                <CompanyProfileTab />
              )}

              {activeTab === 'company_jobs' && (
                <CompanyJobsTab
                  companyId={companyData?.companyId}
                  onNavigateToApplicants={(jId) => {
                    setSelectedApplicantJobId(jId);
                    setActiveTab('company_applicants');
                  }}
                  onPostNewClick={() => setActiveTab('company_create_job')}
                />
              )}

              {activeTab === 'company_create_job' && (
                <CompanyJobForm
                  companyId={companyData?.companyId}
                  onSuccess={() => setActiveTab('company_jobs')}
                  onCancel={() => setActiveTab('company_jobs')}
                />
              )}

              {activeTab === 'company_applicants' && (
                <CompanyApplicantsTab
                  companyId={companyData?.companyId}
                  initialJobFilter={selectedApplicantJobId}
                />
              )}
            </div>
          )}

          {/* ========================================================== */}
          {/* STUDENT PORTAL VIEWS (PRESERVED FUNCTIONALLY & VISUALLY) */}
          {/* ========================================================== */}
          {roleMode === 'student' && (
            <div className="mt-4">
              {/* OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Card 1 */}
                    <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profile Status</span>
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#EAF2FB] text-[#18B7C9]">
                            75% Complete
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B2A52]">Profile Completion</h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Upload your latest resume & certifications to reach 100% score.
                        </p>

                        <div className="mt-4 w-full h-2.5 bg-[#EAF2FB] rounded-full overflow-hidden">
                          <div className="h-full bg-[#18B7C9] rounded-full w-[75%]" />
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab('profile')}
                        className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#0B2A52] hover:text-[#18B7C9] transition-colors cursor-pointer"
                      >
                        <span>Edit Student Profile</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gradient-to-br from-[#0B2A52] to-[#071D3A] text-white rounded-3xl p-6 shadow-md border border-[#0B2A52] flex flex-col justify-between relative overflow-hidden">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-[#18B7C9] uppercase tracking-wider">Placement Score</span>
                          <Sparkles className="w-4 h-4 text-[#18B7C9]" />
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-extrabold text-white">88%</span>
                          <span className="text-xs font-bold text-[#18B7C9]">Hiring Likelihood</span>
                        </div>

                        <p className="text-xs text-slate-300 mt-2">
                          High Probability for Tier-1 Product Companies.
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTab('prediction')}
                        className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#18B7C9] hover:text-white transition-colors cursor-pointer"
                      >
                        <span>View Prediction Engine</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Step</span>
                          <Target className="w-4 h-4 text-[#0B2A52]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0B2A52]">System Design & DSA</h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Solve 2 dynamic programming problems to level up Stage 4 skill gaps.
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTab('gaps')}
                        className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#0B2A52] hover:text-[#18B7C9] transition-colors cursor-pointer"
                      >
                        <span>Open Gap Matrix</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* PROFILE & RESUME UPLOAD TAB */}
              {activeTab === 'profile' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white rounded-3xl p-8 border border-[#EAF2FB] shadow-xs">
                    <h2 className="text-xl font-extrabold text-[#0B2A52] mb-6">Student Academic Profile & ATS Resume</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Upload Box */}
                      <div className="border-2 border-dashed border-[#18B7C9]/40 rounded-3xl p-8 text-center flex flex-col items-center justify-center bg-[#F5F8FC]/60">
                        <UploadCloud className="w-12 h-12 text-[#18B7C9] mb-3" />
                        <h3 className="text-sm font-bold text-[#0B2A52]">Upload Updated Resume</h3>
                        <p className="text-xs text-slate-500 mt-1 mb-4">Supports PDF, DOCX (Max size 10MB)</p>

                        <label className="px-4 py-2.5 bg-[#0B2A52] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#071D3A] transition-colors cursor-pointer inline-flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#18B7C9]" />
                          <span>Select Resume File</span>
                          <input 
                            type="file" 
                            accept=".pdf,.docx" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setUploadedResume(e.target.files[0].name);
                              }
                            }} 
                          />
                        </label>
                      </div>

                      {/* Parsed Resume Details */}
                      <div className="p-6 rounded-3xl border border-[#EAF2FB] bg-white flex flex-col justify-between shadow-xs">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-[#EAF2FB] mb-3">
                            <div className="flex items-center gap-2.5">
                              <FileText className="w-5 h-5 text-[#18B7C9]" />
                              <div>
                                <h4 className="text-xs font-bold text-[#0B2A52]">
                                  {uploadedResume || 'John_Doe_Resume_2026.pdf'}
                                </h4>
                                <span className="text-[10px] text-slate-400 font-semibold">2.4 MB • Parsed Today</span>
                              </div>
                            </div>
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-extrabold rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>ATS Verified</span>
                            </span>
                          </div>

                          <h5 className="text-xs font-bold text-[#0B2A52] mb-2">Extracted Keyword Tags:</h5>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {['React.js', 'Node.js', 'Python', 'PostgreSQL', 'Data Structures', 'REST APIs', 'Git'].map((skill) => (
                              <span key={skill} className="px-2.5 py-1 rounded-lg bg-[#F5F8FC] text-[#0B2A52] border border-[#EAF2FB] text-[10px] font-bold">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 font-semibold">
                          ✓ Resume passes ATS scanner filters for Product & SDE roles with 85% match rate.
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STAGE 1: PROFILE MATRIX */}
              {activeTab === 'stage1_profile' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Stage1Profile />
                </motion.div>
              )}

              {/* STAGE 2: AI POTENTIAL */}
              {activeTab === 'stage2_potential' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Stage2Potential />
                </motion.div>
              )}

              {/* STAGE 3: PLACEMENT PREDICTION ENGINE */}
              {activeTab === 'prediction' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Stage3Probability />
                </motion.div>
              )}

              {/* STAGE 4: SKILL GAP MATRIX */}
              {activeTab === 'gaps' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Stage4Gaps />
                </motion.div>
              )}

              {/* STAGE 5: GUIDED AI ROADMAP */}
              {activeTab === 'stage5_guided' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Stage5Guided />
                </motion.div>
              )}

              {/* LIVE JOBS & APPLICATIONS TAB */}
              {activeTab === 'jobs' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <StudentJobsView />
                </motion.div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
