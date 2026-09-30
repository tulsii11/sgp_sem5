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
  LogOut,
  Bell,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Sparkles,
  FileText,
  Search,
  ShieldCheck,
  Users,
  Plus,
  Filter,
  Building2,
  Download,
  BarChart3,
  User
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const getInitials = (nameStr) => {
    if (!nameStr) return 'JD';
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase();
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: 'John Doe',
      email: 'john.doe@xyzcollege.edu.in',
      department: 'Computer Science & Engineering',
      phone: '+91 98765 43210',
      rollNo: '21CS084',
      batch: '2026 Batch',
      role: 'student'
    };
  });

  // Role Mode state ('student' | 'admin') initialized based on user login, but toggleable for preview
  const [roleMode, setRoleMode] = useState(user.role || 'student');
  const [activeTab, setActiveTab] = useState(user.role === 'admin' ? 'admin_overview' : 'overview');

  // Admin Roster Search & Filter state
  const [rosterSearch, setRosterSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');

  // Admin New Drive Modal State
  const [showAddDriveModal, setShowAddDriveModal] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCtc, setNewCtc] = useState('');
  const [newDriveType, setNewDriveType] = useState('On-Campus Drive');
  const [newDriveDate, setNewDriveDate] = useState('');

  // Admin Roster Data
  const [studentRoster, setStudentRoster] = useState([
    { id: '1', name: 'John Doe', rollNo: '21CS084', branch: 'CSE', cgpa: 8.6, status: 'Placed', company: 'TechCorp Solutions', ctc: '12 LPA' },
    { id: '2', name: 'Ananya Sharma', rollNo: '21IT042', branch: 'IT', cgpa: 9.2, status: 'Placed', company: 'CloudMatrix Inc', ctc: '18 LPA' },
    { id: '3', name: 'Rohan Verma', rollNo: '21EC019', branch: 'ECE', cgpa: 7.9, status: 'Shortlisted', company: 'DataPulse Analytics', ctc: '8.5 LPA' },
    { id: '4', name: 'Priya Patel', rollNo: '21CS112', branch: 'CSE', cgpa: 8.8, status: 'Placed', company: 'Microsoft', ctc: '42 LPA' },
    { id: '5', name: 'Aarav Mehta', rollNo: '21AI008', branch: 'AI & DS', cgpa: 8.4, status: 'Eligible', company: 'In Process', ctc: '—' },
    { id: '6', name: 'Sneha Gupta', rollNo: '21IT091', branch: 'IT', cgpa: 8.1, status: 'Eligible', company: 'In Process', ctc: '—' },
  ]);

  // Admin Drives Data
  const [adminDrives, setAdminDrives] = useState([
    { id: 1, company: 'TechCorp Solutions', role: 'Associate Software Engineer', ctc: '12 LPA', type: 'On-Campus Drive', date: 'Sept 30, 2026', applicants: 142, bg: 'bg-[#0B2A52]' },
    { id: 2, company: 'CloudMatrix Inc', role: 'Full-Stack Developer Intern', ctc: '10 LPA', type: 'Product Company', date: 'Oct 04, 2026', applicants: 98, bg: 'bg-[#18B7C9]' },
    { id: 3, company: 'DataPulse Analytics', role: 'Junior Data Analyst', ctc: '8.5 LPA', type: 'Off-Campus Drive', date: 'Oct 08, 2026', applicants: 76, bg: 'bg-[#3B82D0]' },
  ]);

  // Handle Post New Drive
  const handleAddDriveSubmit = (e) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;

    const newDriveObj = {
      id: Date.now(),
      company: newCompany,
      role: newRole,
      ctc: newCtc || '8 LPA',
      type: newDriveType,
      date: newDriveDate || 'Oct 20, 2026',
      applicants: 0,
      bg: 'bg-emerald-700'
    };

    setAdminDrives([newDriveObj, ...adminDrives]);
    setNewCompany('');
    setNewRole('');
    setNewCtc('');
    setShowAddDriveModal(false);
  };

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

  const filteredRoster = studentRoster.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(rosterSearch.toLowerCase()) || s.rollNo.toLowerCase().includes(rosterSearch.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || s.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="min-h-screen bg-[#F7FAFF] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#071D3A] text-white flex flex-col justify-between shrink-0 p-5 border-r border-[#0B2A52]">
        <div>
          {/* Logo */}
          <div className="pb-5 border-b border-white/10 flex items-center justify-between">
            <Logo size="md" variant="full" className="text-white" />
          </div>

          {/* User Profile Mini Badge */}
          <div className="mt-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-sm shadow-md ${
              roleMode === 'admin' ? 'bg-[#18B7C9]' : 'bg-[#3B82D0]'
            }`}>
              {roleMode === 'admin' ? <ShieldCheck className="w-5 h-5" /> : getInitials(user.name)}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
              <p className="text-[10px] text-slate-300 truncate">
                {roleMode === 'admin' ? 'Placement Officer • Admin' : `${user.department || 'Student'} • Batch '26`}
              </p>
            </div>
          </div>

          {/* Role Switcher Pill in Sidebar */}
          <div className="mt-4 p-1 bg-white/10 rounded-xl flex items-center justify-between border border-white/10">
            <button
              onClick={() => {
                setRoleMode('student');
                setActiveTab('overview');
              }}
              className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                roleMode === 'student' ? 'bg-[#18B7C9] text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Student</span>
            </button>
            <button
              onClick={() => {
                setRoleMode('admin');
                setActiveTab('admin_overview');
              }}
              className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                roleMode === 'admin' ? 'bg-[#18B7C9] text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Panel</span>
            </button>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1">
            {roleMode === 'admin' ? (
              /* ADMIN PANEL NAV ITEMS */
              <>
                <button
                  onClick={() => setActiveTab('admin_overview')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'admin_overview'
                      ? 'bg-[#18B7C9] text-white shadow-md shadow-[#18B7C9]/20'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin_students')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'admin_students'
                      ? 'bg-[#18B7C9] text-white shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Student Roster</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin_drives')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'admin_drives'
                      ? 'bg-[#18B7C9] text-white shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Drive Manager</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin_analytics')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'admin_analytics'
                      ? 'bg-[#18B7C9] text-white shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Branch Analytics</span>
                </button>
              </>
            ) : (
              /* STUDENT PORTAL NAV ITEMS */
              <>
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
                  <span>Student Profile</span>
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
              </>
            )}
          </nav>
        </div>

        {/* Logout CTA */}
        <div className="pt-6 border-t border-white/10">
          <button
            onClick={() => {
              localStorage.removeItem('user');
              navigate('/');
            }}
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#18B7C9] uppercase tracking-wider">
                {roleMode === 'admin' ? 'University Placement Control Center' : 'Placement Platform'}
              </span>
              {roleMode === 'admin' && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#0B2A52] text-white">
                  ADMIN MODE
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B2A52] tracking-tight mt-0.5">
              {roleMode === 'admin' ? (
                <>
                  {activeTab === 'admin_overview' && 'TPO Admin Overview 🛡️'}
                  {activeTab === 'admin_students' && 'Student Roster & Verification 👥'}
                  {activeTab === 'admin_drives' && 'Campus Drive Management 🏢'}
                  {activeTab === 'admin_analytics' && 'Branch-wise Placement Analytics 📈'}
                </>
              ) : (
                <>
                  {activeTab === 'overview' && `Welcome back, ${user.name} 👋`}
                  {activeTab === 'profile' && 'Student Profile (75% Complete) 👤'}
                  {activeTab === 'prediction' && 'AI Placement Prediction Engine 🚀'}
                  {activeTab === 'gaps' && 'Skill Gap Matrix & Benchmarks 🎯'}
                  {activeTab === 'jobs' && 'Campus Placement Drives 💼'}
                </>
              )}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {roleMode === 'admin' && (
              <button
                onClick={() => setShowAddDriveModal(true)}
                className="px-4 py-2 bg-[#18B7C9] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#159FB0] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Drive</span>
              </button>
            )}

            <button className="p-2.5 rounded-xl bg-white border border-[#EAF4FF] text-[#0B2A52] hover:bg-[#EAF4FF] transition-colors relative cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#18B7C9]" />
            </button>
          </div>
        </div>

        {/* ADMIN MODE VIEWS */}
        {roleMode === 'admin' && (
          <div className="mt-8 space-y-8">
            
            {/* ADMIN TAB 1: ADMIN OVERVIEW */}
            {activeTab === 'admin_overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
                
                {/* 4 Admin Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Eligible</span>
                      <Users className="w-5 h-5 text-[#0B2A52]" />
                    </div>
                    <p className="text-3xl font-extrabold text-[#0B2A52]">1,240</p>
                    <p className="text-xs text-emerald-600 font-bold mt-1">Batch 2026 Students</p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Placement Rate</span>
                      <TrendingUp className="w-5 h-5 text-[#18B7C9]" />
                    </div>
                    <p className="text-3xl font-extrabold text-[#18B7C9]">84.5%</p>
                    <p className="text-xs text-slate-500 font-semibold mt-1">1,048 Students Placed</p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Drives</span>
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-extrabold text-[#0B2A52]">14</p>
                    <p className="text-xs text-blue-600 font-bold mt-1">4 Product • 10 Service</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#0B2A52] to-[#071D3A] text-white rounded-3xl p-6 shadow-md border border-[#0B2A52]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#18B7C9] uppercase tracking-wider">Avg Package</span>
                      <Sparkles className="w-4 h-4 text-[#18B7C9]" />
                    </div>
                    <p className="text-3xl font-extrabold text-white">₹11.2 LPA</p>
                    <p className="text-xs text-slate-300 mt-1">Highest: ₹42 LPA (Microsoft)</p>
                  </div>

                </div>

                {/* Quick Roster Overview Table */}
                <div className="bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2A52]">Recent Student Registrations & Status</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Manage and verify batch 2026 student profiles</p>
                    </div>

                    <button onClick={() => setActiveTab('admin_students')} className="text-xs font-bold text-[#18B7C9] hover:underline cursor-pointer">
                      View Full Roster &rarr;
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#EAF4FF] text-slate-500 uppercase text-[10px] font-extrabold">
                          <th className="py-3 px-4">Student Name</th>
                          <th className="py-3 px-4">Roll No</th>
                          <th className="py-3 px-4">Branch</th>
                          <th className="py-3 px-4">CGPA</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Company</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAF4FF]">
                        {studentRoster.map((s) => (
                          <tr key={s.id} className="hover:bg-[#F7FAFF] transition-colors">
                            <td className="py-3.5 px-4 font-bold text-[#0B2A52]">{s.name}</td>
                            <td className="py-3.5 px-4 text-slate-500 font-medium">{s.rollNo}</td>
                            <td className="py-3.5 px-4 font-semibold text-[#0B2A52]">{s.branch}</td>
                            <td className="py-3.5 px-4 font-bold text-[#18B7C9]">{s.cgpa}</td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                s.status === 'Placed' ? 'bg-emerald-100 text-emerald-700' :
                                s.status === 'Shortlisted' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {s.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-[#0B2A52]">{s.company}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </motion.div>
            )}

            {/* ADMIN TAB 2: STUDENT ROSTER */}
            {activeTab === 'admin_students' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                  
                  {/* Filters Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EAF4FF]">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="flex items-center gap-2 bg-[#F7FAFF] px-3.5 py-2 rounded-xl border border-[#EAF4FF] w-full sm:w-72">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={rosterSearch}
                          onChange={(e) => setRosterSearch(e.target.value)}
                          placeholder="Search student or roll no..."
                          className="bg-transparent text-xs font-semibold text-[#0B2A52] outline-none w-full"
                        />
                      </div>

                      {/* Branch Dropdown */}
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="px-3.5 py-2 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-[#0B2A52] outline-none cursor-pointer"
                      >
                        <option value="All">All Branches</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="AI & DS">AI & DS</option>
                      </select>
                    </div>

                    <button className="px-4 py-2 bg-[#071D3A] text-white text-xs font-bold rounded-xl hover:bg-[#0B2A52] transition-colors flex items-center gap-1.5 cursor-pointer">
                      <Download className="w-4 h-4" />
                      <span>Export CSV Report</span>
                    </button>
                  </div>

                  {/* Roster Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#EAF4FF] text-slate-500 uppercase text-[10px] font-extrabold">
                          <th className="py-3 px-4">Student</th>
                          <th className="py-3 px-4">Roll No</th>
                          <th className="py-3 px-4">Branch</th>
                          <th className="py-3 px-4">CGPA</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Company & Package</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAF4FF]">
                        {filteredRoster.map((s) => (
                          <tr key={s.id} className="hover:bg-[#F7FAFF] transition-colors">
                            <td className="py-3.5 px-4 font-bold text-[#0B2A52]">{s.name}</td>
                            <td className="py-3.5 px-4 text-slate-500 font-medium">{s.rollNo}</td>
                            <td className="py-3.5 px-4 font-semibold text-[#0B2A52]">{s.branch}</td>
                            <td className="py-3.5 px-4 font-bold text-[#18B7C9]">{s.cgpa}</td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                s.status === 'Placed' ? 'bg-emerald-100 text-emerald-700' :
                                s.status === 'Shortlisted' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {s.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-[#0B2A52]">
                              {s.company} {s.ctc !== '—' && `(${s.ctc})`}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button className="px-3 py-1 bg-[#EAF4FF] text-[#18B7C9] text-xs font-bold rounded-lg hover:bg-[#18B7C9] hover:text-white transition-colors cursor-pointer">
                                Verify Profile
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ADMIN TAB 3: CAMPUS DRIVE MANAGER */}
            {activeTab === 'admin_drives' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EAF4FF]">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2A52]">Scheduled & Active Recruitment Drives</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Manage job postings, eligibility, and applicant rosters</p>
                    </div>

                    <button
                      onClick={() => setShowAddDriveModal(true)}
                      className="px-4 py-2 bg-[#18B7C9] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#159FB0] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Post Drive</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adminDrives.map((d) => (
                      <div key={d.id} className="p-5 rounded-2xl bg-[#F7FAFF] border border-[#EAF4FF] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2.5 py-1 rounded-full bg-[#EAF4FF] text-[#18B7C9] text-[10px] font-extrabold uppercase">
                              {d.type}
                            </span>
                            <span className="text-xs font-extrabold text-[#0B2A52]">{d.ctc}</span>
                          </div>

                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-12 h-12 rounded-2xl ${d.bg} text-white flex items-center justify-center font-extrabold text-sm shadow-sm`}>
                              {d.company.substring(0, 2)}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-[#0B2A52]">{d.role}</h4>
                              <p className="text-xs text-slate-500">{d.company}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-600">{d.applicants} Applicants</span>
                          <span className="font-bold text-[#18B7C9]">Drive: {d.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ADMIN TAB 4: BRANCH ANALYTICS */}
            {activeTab === 'admin_analytics' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-[#EAF4FF] shadow-sm">
                  <h3 className="text-lg font-bold text-[#0B2A52] mb-4">Branch-wise Placement Performance</h3>
                  <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { branch: 'CSE', placed: 94, total: 100 },
                          { branch: 'IT', placed: 88, total: 100 },
                          { branch: 'AI & DS', placed: 86, total: 100 },
                          { branch: 'ECE', placed: 76, total: 100 },
                          { branch: 'Mechanical', placed: 65, total: 100 },
                        ]}
                      >
                        <XAxis dataKey="branch" stroke="#64748B" />
                        <YAxis domain={[0, 100]} stroke="#64748B" />
                        <Tooltip />
                        <Bar dataKey="placed" fill="#18B7C9" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* STUDENT MODE VIEWS */}
        {roleMode === 'student' && (
          <div className="mt-8">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
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
              </motion.div>
            )}

            {/* TAB 2: STUDENT PROFILE */}
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-[#EAF4FF] shadow-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#EAF4FF]">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#18B7C9] text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-[#0B2A52]">{user.name}</h2>
                        <p className="text-xs text-slate-500 font-medium">B.Tech {user.department || 'Computer Science & Engineering'} • Roll No: {user.rollNo || '21CS084'}</p>
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

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-2">Institutional Email</label>
                      <input type="email" readOnly value={user.email} className="w-full px-4 py-3 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-2">Phone Number</label>
                      <input type="text" readOnly value={user.phone || '+91 98765 43210'} className="w-full px-4 py-3 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-2">Department / Branch</label>
                      <input type="text" readOnly value={user.department || 'Computer Science & Engineering'} className="w-full px-4 py-3 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-2">Passing Year / Semester</label>
                      <input type="text" readOnly value={`${user.batch || '2026 Batch'} • Semester 7`} className="w-full px-4 py-3 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-slate-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: PLACEMENT PREDICTION ENGINE */}
            {activeTab === 'prediction' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
                <div className="bg-gradient-to-br from-[#0B2A52] to-[#071D3A] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                  <h2 className="text-2xl font-extrabold text-white">Campus Placement Chance Predictor</h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                    Calculates placement probability based on academic CGPA, coding rating, aptitude test score, and project experience.
                  </p>
                </div>
              </motion.div>
            )}

            {/* TAB 4: SKILL GAP MATRIX */}
            {activeTab === 'gaps' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="bg-white rounded-3xl p-8 border border-[#EAF4FF] shadow-sm">
                  <h2 className="text-xl font-extrabold text-[#0B2A52]">Skill Gap Matrix & Industry Benchmark</h2>
                </div>
              </motion.div>
            )}

            {/* TAB 5: JOB DRIVES */}
            {activeTab === 'jobs' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="bg-white rounded-3xl p-8 border border-[#EAF4FF] shadow-sm">
                  <h2 className="text-xl font-extrabold text-[#0B2A52]">Campus Hiring Drives & Openings</h2>
                </div>
              </motion.div>
            )}
          </div>
        )}

      </main>

      {/* POST NEW DRIVE MODAL (ADMIN MODE) */}
      {showAddDriveModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#0B2A52]">Post New Campus Hiring Drive</h3>
              <button onClick={() => setShowAddDriveModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleAddDriveSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-bold text-[#0B2A52] mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Google / Swiggy / Infosys"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B2A52] mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Software Engineer / Data Analyst"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B2A52] mb-1">Package CTC</label>
                <input
                  type="text"
                  value={newCtc}
                  onChange={(e) => setNewCtc(e.target.value)}
                  placeholder="12 LPA"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B2A52] mb-1">Drive Category</label>
                <select
                  value={newDriveType}
                  onChange={(e) => setNewDriveType(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                >
                  <option value="On-Campus Drive">On-Campus Drive</option>
                  <option value="Off-Campus Drive">Off-Campus Drive</option>
                  <option value="Product Company">Product Company</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDriveModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#18B7C9] text-white rounded-xl text-xs font-bold hover:bg-[#159FB0] shadow-md"
                >
                  Publish Drive
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
