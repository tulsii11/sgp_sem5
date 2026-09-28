import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import Button from '../components/Button';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import {
  LayoutDashboard,
  UserCheck,
  TrendingUp,
  Target,
  Briefcase,
  BookOpen,
  LogOut,
  Bell,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Sparkles,
  FileText,
  Search
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Recharts Mock Analytics Data
  const radarSkillData = [
    { subject: 'Data Structures', score: 88, fullMark: 100 },
    { subject: 'Web Dev (React)', score: 92, fullMark: 100 },
    { subject: 'Backend (Node)', score: 78, fullMark: 100 },
    { subject: 'Database / SQL', score: 85, fullMark: 100 },
    { subject: 'Soft Skills', score: 74, fullMark: 100 },
    { subject: 'Aptitude', score: 82, fullMark: 100 },
  ];

  const placementProbabilityTrend = [
    { month: 'Sem 5', probability: 64 },
    { month: 'Sem 6', probability: 72 },
    { month: 'Sem 7', probability: 84 },
    { month: 'Current', probability: 88 },
  ];

  const recommendedJobs = [
    {
      company: 'TechCorp Solutions',
      role: 'Associate Software Engineer',
      type: 'On-Campus Drive',
      location: 'Bangalore / Remote',
      ctc: '12 LPA',
      matchScore: '94% Match',
      logoBg: 'bg-[#0B2A52]'
    },
    {
      company: 'CloudMatrix Inc',
      role: 'Full-Stack Developer Intern',
      type: 'Product Company',
      location: 'Hyderabad',
      ctc: '10 LPA',
      matchScore: '89% Match',
      logoBg: 'bg-[#18B7C9]'
    },
    {
      company: 'DataPulse Analytics',
      role: 'Junior Data Analyst',
      type: 'Off-Campus Drive',
      location: 'Pune / Hybrid',
      ctc: '8.5 LPA',
      matchScore: '82% Match',
      logoBg: 'bg-[#3B82D0]'
    }
  ];

  const careerRoadmaps = [
    {
      title: 'Master System Design Fundamentals',
      category: 'Technical Gap',
      progress: 60,
      estimatedHours: '12 hrs left',
      status: 'In Progress'
    },
    {
      title: 'Resume Metric Optimization (ATS 90+)',
      category: 'Resume Gap',
      progress: 85,
      estimatedHours: '2 hrs left',
      status: 'Action Ready'
    },
    {
      title: 'Mock Behavioral Interview Practice',
      category: 'Soft Skills',
      progress: 40,
      estimatedHours: '5 hrs left',
      status: 'Recommended'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7FAFF] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#071D3A] text-white flex flex-col justify-between shrink-0 p-5 border-r border-[#0B2A52]">
        <div>
          {/* Logo */}
          <div className="pb-6 border-b border-white/10 flex items-center justify-between">
            <Logo size="md" variant="full" className="text-white" />
          </div>

          {/* User Profile Mini Badge */}
          <div className="mt-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18B7C9] text-white flex items-center justify-center font-bold text-sm shadow-md">
              JD
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">John Doe</h4>
              <p className="text-[10px] text-slate-400 truncate">CS Student • Batch '26</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#18B7C9] text-white shadow-md shadow-[#18B7C9]/20'
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
                  ? 'bg-[#18B7C9] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Student Profile (75%)</span>
            </button>

            <button
              onClick={() => setActiveTab('prediction')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'prediction'
                  ? 'bg-[#18B7C9] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Placement Prediction</span>
            </button>

            <button
              onClick={() => setActiveTab('gaps')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'gaps'
                  ? 'bg-[#18B7C9] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Skill Gap Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'jobs'
                  ? 'bg-[#18B7C9] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Drives</span>
            </button>
          </nav>
        </div>

        {/* Logout CTA */}
        <div className="pt-6 border-t border-white/10">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#18B7C9]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#EAF4FF]">
          <div>
            <span className="text-xs font-bold text-[#18B7C9] uppercase tracking-wider">Placement Platform</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B2A52] tracking-tight mt-0.5">
              {activeTab === 'overview' && 'Dashboard Overview 👋'}
              {activeTab === 'profile' && 'Student Profile (75% Complete) 👤'}
              {activeTab === 'prediction' && 'AI Placement Prediction Engine 🚀'}
              {activeTab === 'gaps' && 'Skill Gap Matrix & Benchmarks 🎯'}
              {activeTab === 'jobs' && 'Campus Placement Drives 💼'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-white border border-[#EAF4FF] text-[#0B2A52] hover:bg-[#EAF4FF] transition-colors relative cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#18B7C9]" />
            </button>

            <Button variant="primary" size="sm" onClick={() => navigate('/')}>
              View Portal Landing
            </Button>
          </div>
        </div>

        {/* DYNAMIC TAB CONTENT AREA */}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Top Metric Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Profile Completion Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Profile Status</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#EAF4FF] text-[#18B7C9]">
                      75% Complete
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0B2A52]">Profile Completion</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Upload your latest resume & certifications to reach 100% score.
                  </p>

                  <div className="mt-4 w-full h-2.5 bg-[#EAF4FF] rounded-full overflow-hidden">
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

              {/* Card 2: Placement Probability Score */}
              <div className="bg-gradient-to-br from-[#0B2A52] to-[#071D3A] text-white rounded-3xl p-6 shadow-md border border-[#0B2A52] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#18B7C9]/20 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#18B7C9] uppercase tracking-wider">ML Prediction Score</span>
                    <Sparkles className="w-4 h-4 text-[#18B7C9]" />
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">88%</span>
                    <span className="text-xs font-bold text-[#18B7C9]">Placement Chance</span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2">
                    Tier-1 Product & Software Engineering role likelihood based on model.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>Target CTC: 8-14 LPA</span>
                  <button onClick={() => setActiveTab('prediction')} className="text-[#18B7C9] font-bold hover:underline cursor-pointer">
                    Run Prediction Engine &rarr;
                  </button>
                </div>
              </div>

              {/* Card 3: Quick Action Stats */}
              <div className="bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Drive Readiness</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="grid grid-cols-2 gap-4 my-2">
                  <div className="bg-[#F7FAFF] p-3 rounded-2xl border border-[#EAF4FF]">
                    <p className="text-[10px] text-[#64748B] font-medium">Eligible Drives</p>
                    <p className="text-lg font-bold text-[#0B2A52] mt-0.5">14 Companies</p>
                  </div>
                  <div className="bg-[#F7FAFF] p-3 rounded-2xl border border-[#EAF4FF]">
                    <p className="text-[10px] text-[#64748B] font-medium">Skill Gaps Fixed</p>
                    <p className="text-lg font-bold text-[#18B7C9] mt-0.5">8 of 11</p>
                  </div>
                </div>

                <button onClick={() => setActiveTab('jobs')} className="text-xs text-[#18B7C9] font-bold hover:underline cursor-pointer">
                  Explore Campus Drives &rarr;
                </button>
              </div>

            </div>

            {/* Middle Section: Charts & Analytics */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Skill Radar Chart */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2A52]">Skill Matrix Radar</h3>
                    <p className="text-xs text-[#64748B]">Evaluation across 6 key competency domains</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EAF4FF] text-[#18B7C9]">
                    Radar Matrix
                  </span>
                </div>

                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarSkillData}>
                      <PolarGrid stroke="#EAF4FF" />
                      <PolarAngleAxis dataKey="subject" stroke="#0B2A52" tick={{ fontSize: 11, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748B" />
                      <Radar name="Student Score" dataKey="score" stroke="#18B7C9" fill="#18B7C9" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Placement Readiness Trend Bar Chart */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2A52]">Placement Readiness Trend</h3>
                    <p className="text-xs text-[#64748B]">Semester-wise placement score evolution</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EAF4FF] text-[#3B82D0]">
                    Growth Path
                  </span>
                </div>

                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={placementProbabilityTrend} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <XAxis dataKey="month" stroke="#64748B" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} stroke="#64748B" tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0B2A52', borderRadius: '12px', border: 'none', color: '#fff' }}
                        itemStyle={{ color: '#18B7C9' }}
                      />
                      <Bar dataKey="probability" fill="#0B2A52" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Bottom Section: Recommended Jobs & Career Modules */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recommended Jobs */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2A52]">Recommended Jobs & Campus Drives</h3>
                    <p className="text-xs text-[#64748B]">Matched specifically to your technical profile score</p>
                  </div>
                  <button onClick={() => setActiveTab('jobs')} className="text-xs font-bold text-[#18B7C9] hover:underline cursor-pointer">
                    View All (14)
                  </button>
                </div>

                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div
                      key={job.company}
                      className="p-4 rounded-2xl bg-[#F7FAFF] border border-[#EAF4FF] hover:border-[#18B7C9]/40 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-11 h-11 rounded-2xl ${job.logoBg} text-white flex items-center justify-center font-extrabold text-sm shadow-xs`}>
                          {job.company.substring(0, 2)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0B2A52]">{job.role}</h4>
                          <p className="text-xs text-[#64748B] mt-0.5">{job.company} • {job.location}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-[#EAF4FF] text-[#18B7C9] text-xs font-extrabold mb-1">
                          {job.matchScore}
                        </span>
                        <p className="text-xs font-bold text-[#0B2A52]">{job.ctc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Modules */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2A52]">Target Roadmap Actions</h3>
                    <p className="text-xs text-[#64748B]">Priority modules to elevate placement readiness</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {careerRoadmaps.map((road) => (
                    <div key={road.title} className="p-4 rounded-2xl bg-[#F7FAFF] border border-[#EAF4FF]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#18B7C9]">
                          {road.category}
                        </span>
                        <span className="text-xs text-[#64748B] font-medium">{road.estimatedHours}</span>
                      </div>

                      <h4 className="text-xs font-bold text-[#0B2A52] mb-3">{road.title}</h4>

                      <div className="w-full h-2 rounded-full bg-[#EAF4FF] overflow-hidden">
                        <div className="h-full bg-[#0B2A52] rounded-full" style={{ width: `${road.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: STUDENT PROFILE */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-[#EAF4FF] shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#EAF4FF]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#18B7C9] text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
                    JD
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0B2A52]">John Doe</h2>
                    <p className="text-xs text-slate-500 font-medium">B.Tech Computer Science & Engineering • Roll No: 21CS084</p>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      Verified Student Profile
                    </span>
                  </div>
                </div>

                <div className="bg-[#F7FAFF] p-4 rounded-2xl border border-[#EAF4FF] text-right">
                  <span className="text-xs font-bold text-slate-500">Overall CGPA</span>
                  <p className="text-2xl font-extrabold text-[#0B2A52]">8.6 / 10.0</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#0B2A52] mb-2">Institutional Email</label>
                  <input type="email" readOnly value="john.doe@xyzcollege.edu.in" className="w-full px-4 py-3 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-slate-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B2A52] mb-2">Phone Number</label>
                  <input type="text" readOnly value="+91 98765 43210" className="w-full px-4 py-3 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-slate-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B2A52] mb-2">Department / Branch</label>
                  <input type="text" readOnly value="Computer Science & Engineering" className="w-full px-4 py-3 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-slate-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B2A52] mb-2">Passing Year / Semester</label>
                  <input type="text" readOnly value="2026 Batch • Semester 7" className="w-full px-4 py-3 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-slate-600" />
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-8 pt-6 border-t border-[#EAF4FF]">
                <h3 className="text-sm font-bold text-[#0B2A52] mb-3">Technical Skill Inventory</h3>
                <div className="flex flex-wrap gap-2">
                  {['React 19', 'Node.js', 'Express', 'Python', 'Data Structures', 'PostgreSQL', 'System Design', 'Tailwind CSS', 'SQL', 'Git & GitHub'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-xl bg-[#EAF4FF] text-[#0B2A52] text-xs font-bold border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resume Upload Zone */}
              <div className="mt-8 p-6 rounded-2xl bg-[#F7FAFF] border-2 border-dashed border-[#18B7C9]/40 text-center">
                <FileText className="w-10 h-10 text-[#18B7C9] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-[#0B2A52]">John_Doe_Resume_v3.pdf</h4>
                <p className="text-xs text-slate-500 mt-1">Uploaded 2 days ago • ATS Compatibility Score: <span className="text-emerald-600 font-bold">88 / 100</span></p>
                <button className="mt-4 px-4 py-2 bg-[#071D3A] text-white text-xs font-bold rounded-xl hover:bg-[#0B2A52] transition-colors cursor-pointer">
                  Update Resume (PDF)
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: PLACEMENT PREDICTION ENGINE */}
        {activeTab === 'prediction' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8 space-y-8">
            <div className="bg-gradient-to-br from-[#0B2A52] to-[#071D3A] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#18B7C9]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-2 text-[#18B7C9] text-xs font-extrabold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>AI Machine Learning Predictor</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">Campus Placement Chance Predictor</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Calculates placement probability and expected CTC range based on academic CGPA, coding rating, aptitude test score, and project experience.
              </p>

              {/* Interactive Calculators */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Form Controls */}
                <div className="lg:col-span-7 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Academic CGPA</span>
                      <span className="text-[#18B7C9]">8.6 / 10.0</span>
                    </div>
                    <input type="range" min="6" max="10" step="0.1" defaultValue="8.6" className="w-full accent-[#18B7C9]" />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Data Structures & Coding Score</span>
                      <span className="text-[#18B7C9]">880 / 1000</span>
                    </div>
                    <input type="range" min="300" max="1000" step="10" defaultValue="880" className="w-full accent-[#18B7C9]" />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Aptitude & Logical Reasoning Score</span>
                      <span className="text-[#18B7C9]">82 / 100</span>
                    </div>
                    <input type="range" min="40" max="100" defaultValue="82" className="w-full accent-[#18B7C9]" />
                  </div>

                  <div className="pt-2">
                    <button className="w-full py-3 bg-[#18B7C9] text-white text-xs font-extrabold rounded-xl shadow-lg hover:bg-[#159FB0] transition-colors cursor-pointer">
                      Calculate Real-Time Prediction
                    </button>
                  </div>
                </div>

                {/* Live Prediction Output Card */}
                <div className="lg:col-span-5 bg-white text-[#0B2A52] p-7 rounded-2xl shadow-2xl border border-blue-100 text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Placement Probability</span>
                  <div className="my-4">
                    <span className="text-5xl font-extrabold text-[#18B7C9]">88.4%</span>
                  </div>

                  <div className="p-3 bg-[#F7FAFF] rounded-xl border border-[#EAF4FF] mb-4">
                    <p className="text-xs font-bold text-slate-600">Expected CTC Range</p>
                    <p className="text-lg font-extrabold text-[#0B2A52] mt-0.5">8.5 LPA – 15.0 LPA</p>
                  </div>

                  <div className="space-y-2 text-left text-xs font-semibold text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>Product Companies (Google, Amazon):</span>
                      <span className="text-emerald-600 font-bold">78% Chance</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tech Startups (Swiggy, Razorpay):</span>
                      <span className="text-emerald-600 font-bold">92% Chance</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>IT Services (TCS, Infosys):</span>
                      <span className="text-emerald-600 font-bold">98% Chance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: SKILL GAP MATRIX */}
        {activeTab === 'gaps' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-[#EAF4FF] shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EAF4FF]">
                <div>
                  <h2 className="text-xl font-extrabold text-[#0B2A52]">Skill Gap Matrix & Industry Benchmark</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Comparing your technical skills against Tier-1 SDE Hiring Benchmarks</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EAF4FF] text-[#18B7C9]">
                  Amazon SDE-1 Benchmark
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Radar Chart */}
                <div className="lg:col-span-6 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarSkillData}>
                      <PolarGrid stroke="#EAF4FF" />
                      <PolarAngleAxis dataKey="subject" stroke="#0B2A52" tick={{ fontSize: 11, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748B" />
                      <Radar name="Your Score" dataKey="score" stroke="#18B7C9" fill="#18B7C9" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Gap List */}
                <div className="lg:col-span-6 space-y-4">
                  {[
                    { domain: 'System Design (HLD/LLD)', yourScore: '60%', target: '80%', gap: '-20% Gap', color: 'text-amber-600 bg-amber-50 border-amber-200' },
                    { domain: 'Data Structures & Algorithms', yourScore: '88%', target: '90%', gap: '-2% Gap', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                    { domain: 'Web Dev (React & Node)', yourScore: '92%', target: '85%', gap: '+7% Ahead', color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
                    { domain: 'Database & SQL Queries', yourScore: '85%', target: '85%', gap: 'Matched', color: 'text-blue-600 bg-blue-50 border-blue-200' },
                    { domain: 'Behavioral & HR Prep', yourScore: '74%', target: '80%', gap: '-6% Gap', color: 'text-amber-600 bg-amber-50 border-amber-200' },
                  ].map((item) => (
                    <div key={item.domain} className="p-4 rounded-2xl bg-[#F7FAFF] border border-[#EAF4FF] flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#0B2A52]">{item.domain}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Your Score: {item.yourScore} • Benchmark: {item.target}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${item.color}`}>
                        {item.gap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: JOB DRIVES */}
        {activeTab === 'jobs' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-[#EAF4FF] shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EAF4FF]">
                <div>
                  <h2 className="text-xl font-extrabold text-[#0B2A52]">Campus Hiring Drives & Openings</h2>
                  <p className="text-xs text-slate-500 mt-0.5">14 Active Companies Recruiting CS/IT Batch of 2026</p>
                </div>

                <div className="flex items-center gap-2 bg-[#F7FAFF] px-3.5 py-2 rounded-xl border border-[#EAF4FF] w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search company or role..." className="bg-transparent text-xs font-semibold text-[#0B2A52] outline-none w-full" />
                </div>
              </div>

              {/* Drive Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { company: 'TechCorp Solutions', role: 'Associate Software Engineer', ctc: '12 LPA', type: 'On-Campus Drive', date: 'Sept 30, 2026', bg: 'bg-[#0B2A52]', applied: true },
                  { company: 'CloudMatrix Inc', role: 'Full-Stack Developer Intern', ctc: '10 LPA', type: 'Product Company', date: 'Oct 04, 2026', bg: 'bg-[#18B7C9]', applied: false },
                  { company: 'DataPulse Analytics', role: 'Junior Data Analyst', ctc: '8.5 LPA', type: 'Off-Campus Drive', date: 'Oct 08, 2026', bg: 'bg-[#3B82D0]', applied: false },
                  { company: 'NextGen Systems', role: 'Backend Engineer Intern', ctc: '6 LPA', type: 'Internship', date: 'Oct 12, 2026', bg: 'bg-indigo-700', applied: false },
                  { company: 'CyberVault Security', role: 'Security Engineer', ctc: '14 LPA', type: 'High CTC Drive', date: 'Oct 15, 2026', bg: 'bg-emerald-700', applied: false },
                  { company: 'Apex Global', role: 'Systems Engineer', ctc: '9 LPA', type: 'On-Campus Drive', date: 'Oct 18, 2026', bg: 'bg-purple-700', applied: false },
                ].map((drive) => (
                  <div key={drive.company} className="p-5 rounded-2xl bg-[#F7FAFF] border border-[#EAF4FF] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#EAF4FF] text-[#18B7C9] text-[10px] font-extrabold uppercase">
                          {drive.type}
                        </span>
                        <span className="text-xs font-extrabold text-[#0B2A52]">{drive.ctc}</span>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-2xl ${drive.bg} text-white flex items-center justify-center font-extrabold text-sm shadow-sm`}>
                          {drive.company.substring(0, 2)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0B2A52]">{drive.role}</h4>
                          <p className="text-xs text-slate-500">{drive.company}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-500">Drive Date: {drive.date}</span>
                      {drive.applied ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                        </span>
                      ) : (
                        <button className="px-4 py-1.5 rounded-xl bg-[#071D3A] text-white text-xs font-bold hover:bg-[#0B2A52] transition-colors cursor-pointer">
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
