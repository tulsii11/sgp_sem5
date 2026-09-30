import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import Button from '../components/Button';
import adminMascotImg from '../assets/admin-mascot.png';
import Stage1Profile from '../components/ScrollStory/Stage1Profile';
import Stage2Potential from '../components/ScrollStory/Stage2Potential';
import Stage3Probability from '../components/ScrollStory/Stage3Probability';
import Stage4Gaps from '../components/ScrollStory/Stage4Gaps';
import Stage5Guided from '../components/ScrollStory/Stage5Guided';

import {
  ResponsiveContainer,
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
  User,
  Megaphone,
  Settings,
  X,
  Check,
  Clock,
  Eye,
  Award,
  Send,
  Trash2,
  Upload,
  UploadCloud,
  GraduationCap,
  Cpu,
  Compass
} from 'lucide-react';

const Dashboard = ({ defaultRole }) => {
  const navigate = useNavigate();

  const getInitials = (nameStr) => {
    if (!nameStr) return 'TPO';
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
      name: defaultRole === 'admin' ? 'Dr. Rajesh Kumar (TPO Head)' : 'John Doe',
      email: defaultRole === 'admin' ? 'tpo@xyzcollege.edu.in' : 'john.doe@xyzcollege.edu.in',
      department: defaultRole === 'admin' ? 'Training & Placement Cell' : 'Computer Science & Engineering',
      phone: '+91 98765 43210',
      rollNo: defaultRole === 'admin' ? 'ADM-2026-TPO' : '21CS084',
      batch: '2026 Batch',
      role: defaultRole || 'student'
    };
  });

  // Active Role Mode ('student' | 'admin')
  const [roleMode, setRoleMode] = useState(defaultRole || user.role || 'student');
  const [activeTab, setActiveTab] = useState(defaultRole === 'admin' || user.role === 'admin' ? 'admin_overview' : 'overview');

  // Admin Roster Search & Filter state
  const [rosterSearch, setRosterSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Admin Modals State
  const [showAddDriveModal, setShowAddDriveModal] = useState(false);
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [selectedStudentForModal, setSelectedStudentForModal] = useState(null);

  // New Drive Form State
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCtc, setNewCtc] = useState('');
  const [newDriveType, setNewDriveType] = useState('On-Campus Drive');
  const [newMinCgpa, setNewMinCgpa] = useState('7.0');
  const [newDriveDate, setNewDriveDate] = useState('');
  const [newDriveDesc, setNewDriveDesc] = useState('');

  // New Notice Form State
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeTarget, setNewNoticeTarget] = useState('All Students');
  const [newNoticeCategory, setNewNoticeCategory] = useState('Drive Alert');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  // Admin Roster Data
  const [studentRoster, setStudentRoster] = useState([
    { id: '1', name: 'John Doe', rollNo: '21CS084', branch: 'CSE', cgpa: 8.6, status: 'Placed', company: 'TechCorp Solutions', ctc: '12 LPA', verified: true, email: 'john.doe@xyzcollege.edu.in', phone: '+91 98765 43210' },
    { id: '2', name: 'Ananya Sharma', rollNo: '21IT042', branch: 'IT', cgpa: 9.2, status: 'Placed', company: 'CloudMatrix Inc', ctc: '18 LPA', verified: true, email: 'ananya.s@xyzcollege.edu.in', phone: '+91 98765 12345' },
    { id: '3', name: 'Rohan Verma', rollNo: '21EC019', branch: 'ECE', cgpa: 7.9, status: 'Shortlisted', company: 'DataPulse Analytics', ctc: '8.5 LPA', verified: true, email: 'rohan.v@xyzcollege.edu.in', phone: '+91 98111 22334' },
    { id: '4', name: 'Priya Patel', rollNo: '21CS112', branch: 'CSE', cgpa: 8.8, status: 'Placed', company: 'Microsoft', ctc: '42 LPA', verified: true, email: 'priya.p@xyzcollege.edu.in', phone: '+91 98222 33445' },
    { id: '5', name: 'Aarav Mehta', rollNo: '21AI008', branch: 'AI & DS', cgpa: 8.4, status: 'Eligible', company: 'In Process', ctc: '—', verified: false, email: 'aarav.m@xyzcollege.edu.in', phone: '+91 98333 44556' },
    { id: '6', name: 'Sneha Gupta', rollNo: '21IT091', branch: 'IT', cgpa: 8.1, status: 'Eligible', company: 'In Process', ctc: '—', verified: true, email: 'sneha.g@xyzcollege.edu.in', phone: '+91 98444 55667' },
    { id: '7', name: 'Vikram Singh', rollNo: '21ME033', branch: 'Mechanical', cgpa: 7.4, status: 'Eligible', company: 'In Process', ctc: '—', verified: false, email: 'vikram.s@xyzcollege.edu.in', phone: '+91 98555 66778' },
  ]);

  // Admin Drives Data
  const [adminDrives, setAdminDrives] = useState([
    { id: 1, company: 'Microsoft', role: 'Software Development Engineer', ctc: '42 LPA', type: 'Product Company', date: 'Sept 28, 2026', minCgpa: '8.5', applicants: 184, bg: 'bg-[#0B2A52]', desc: 'Full-time campus placement for 2026 graduating batch in core engineering teams.' },
    { id: 2, company: 'TechCorp Solutions', role: 'Associate Software Engineer', ctc: '12 LPA', type: 'On-Campus Drive', date: 'Sept 30, 2026', minCgpa: '7.5', applicants: 142, bg: 'bg-[#18B7C9]', desc: 'Campus drive for Backend, Frontend, and Cloud DevOps engineer roles.' },
    { id: 3, company: 'CloudMatrix Inc', role: 'Full-Stack Developer Intern', ctc: '10 LPA', type: 'Product Company', date: 'Oct 04, 2026', minCgpa: '7.0', applicants: 98, bg: 'bg-[#3B82D0]', desc: '6-month Internship cum PPO offer for CSE, IT & ECE students.' },
    { id: 4, company: 'DataPulse Analytics', role: 'Junior Data Analyst', ctc: '8.5 LPA', type: 'Off-Campus Drive', date: 'Oct 08, 2026', minCgpa: '6.5', applicants: 76, bg: 'bg-[#071D3A]', desc: 'Data engineering & predictive modeling consultant position.' },
  ]);

  // Admin Notices Data
  const [adminNotices, setAdminNotices] = useState([
    { id: 1, title: 'Microsoft Online Assessment Guidelines', date: 'Today at 10:30 AM', category: 'Urgent Alert', target: 'CSE, IT & AI-DS', text: 'All shortlisted candidates for Microsoft must log in 15 mins prior to test start with official ID card ready.' },
    { id: 2, title: 'Resume Verification Deadline Extended', date: 'Yesterday at 4:15 PM', category: 'General Announcement', target: 'All Students', text: 'The TPO portal resume verification deadline is extended till Oct 05, 2026. Verify your CGPA marks.' },
    { id: 3, title: 'TechCorp Solutions Interview Schedule Released', date: 'Sept 28, 2026', category: 'Drive Alert', target: 'Batch 2026', text: 'Technical round 1 starts tomorrow at TPO Seminar Hall A from 9:00 AM onwards.' },
  ]);

  // TPO Cell Config Settings State
  const [tpoCollegeName, setTpoCollegeName] = useState('SGP Placement & Career Development Cell');
  const [tpoDirector, setTpoDirector] = useState('Dr. Rajesh Kumar');
  const [minPlacementCgpa, setMinPlacementCgpa] = useState('6.5');
  const [maxOffersAllowed, setMaxOffersAllowed] = useState('2 Offers');

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
      minCgpa: newMinCgpa || '7.0',
      applicants: 0,
      bg: 'bg-emerald-700',
      desc: newDriveDesc || 'Campus placement hiring drive organized by TPO Cell.'
    };

    setAdminDrives([newDriveObj, ...adminDrives]);
    setNewCompany('');
    setNewRole('');
    setNewCtc('');
    setNewDriveDesc('');
    setShowAddDriveModal(false);
  };

  // Handle Post New Notice
  const handleAddNoticeSubmit = (e) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;

    const newNoticeObj = {
      id: Date.now(),
      title: newNoticeTitle,
      date: 'Just now',
      category: newNoticeCategory,
      target: newNoticeTarget,
      text: newNoticeContent
    };

    setAdminNotices([newNoticeObj, ...adminNotices]);
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setShowAddNoticeModal(false);
  };

  // Handle Update Student Verification Status
  const handleToggleVerification = (studentId) => {
    setStudentRoster(prev => prev.map(s => s.id === studentId ? { ...s, verified: !s.verified } : s));
    if (selectedStudentForModal && selectedStudentForModal.id === studentId) {
      setSelectedStudentForModal(prev => ({ ...prev, verified: !prev.verified }));
    }
  };

  // Filtered Roster
  const filteredRoster = studentRoster.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(rosterSearch.toLowerCase()) || s.rollNo.toLowerCase().includes(rosterSearch.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || s.branch === selectedBranch;
    const matchesStatus = selectedStatusFilter === 'All' || s.status === selectedStatusFilter;
    return matchesSearch && matchesBranch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col md:flex-row select-none">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#071D3A] text-white flex flex-col justify-between shrink-0 p-5 border-r border-[#0B2A52]">
        <div>
          {/* Logo */}
          <div className="pb-5 border-b border-white/10 flex items-center justify-between">
            <Logo size="md" variant="full" light={true} />
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
                {roleMode === 'admin' ? 'Placement Director • Admin' : `${user.department || 'Student'} • Batch '26`}
              </p>
            </div>
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
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
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
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
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
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
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
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Placement Analytics</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin_notices')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'admin_notices'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Megaphone className="w-4 h-4" />
                  <span>Broadcast Notices</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin_settings')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'admin_settings'
                      ? 'bg-[#18B7C9] text-[#0B2A52] font-extrabold shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Cell Settings</span>
                </button>
              </>
            ) : (
              /* STUDENT PORTAL NAV ITEMS - MATCHING LANDING PAGE STAGES & RESUME UPLOAD */
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#EAF2FB]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#18B7C9] uppercase tracking-wider">
                {roleMode === 'admin' ? 'University Placement Control Center' : 'Placement Platform'}
              </span>
              {roleMode === 'admin' && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0B2A52] text-white flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#18B7C9]" />
                  <span>ADMIN PANEL</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B2A52] tracking-tight mt-0.5">
              {roleMode === 'admin' ? (
                <>
                  {activeTab === 'admin_overview' && 'TPO Admin Overview 🛡️'}
                  {activeTab === 'admin_students' && 'Student Roster & Verification 👥'}
                  {activeTab === 'admin_drives' && 'Campus Drive Management 🏢'}
                  {activeTab === 'admin_analytics' && 'Placement Performance Analytics 📈'}
                  {activeTab === 'admin_notices' && 'Broadcast Announcement Board 📢'}
                  {activeTab === 'admin_settings' && 'Placement Cell Settings ⚙️'}
                </>
              ) : (
                <>
                  {activeTab === 'overview' && `Welcome back, ${user.name} 👋`}
                  {activeTab === 'profile' && 'Student Placement Profile 👤'}
                  {activeTab === 'jobs' && 'Campus Placement Drives 💼'}
                </>
              )}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {roleMode === 'admin' && (
              <>
                {activeTab === 'admin_notices' ? (
                  <button
                    onClick={() => setShowAddNoticeModal(true)}
                    className="px-4 py-2 bg-[#18B7C9] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#159FB0] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Megaphone className="w-4 h-4" />
                    <span>Publish Notice</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAddDriveModal(true)}
                    className="px-4 py-2 bg-[#18B7C9] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#159FB0] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Post New Drive</span>
                  </button>
                )}
              </>
            )}

            <button className="p-2.5 rounded-xl bg-white border border-[#EAF2FB] text-[#0B2A52] hover:bg-[#EAF2FB] transition-colors relative cursor-pointer shadow-xs">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#18B7C9]" />
            </button>
          </div>
        </div>

        {/* ADMIN PANEL VIEWS */}
        {roleMode === 'admin' && (
          <div className="mt-8 space-y-8">
            
            {/* ADMIN TAB 1: OVERVIEW */}
            {activeTab === 'admin_overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
                
                {/* 4 Admin Stat KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Eligible Students</span>
                      <Users className="w-5 h-5 text-[#0B2A52]" />
                    </div>
                    <p className="text-3xl font-extrabold text-[#0B2A52]">1,240</p>
                    <p className="text-xs text-emerald-600 font-bold mt-1">Batch 2026 Graduating</p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Placement Rate</span>
                      <TrendingUp className="w-5 h-5 text-[#18B7C9]" />
                    </div>
                    <p className="text-3xl font-extrabold text-[#18B7C9]">84.5%</p>
                    <p className="text-xs text-slate-500 font-semibold mt-1">1,048 Offers Released</p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs">
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

                {/* Quick Student Roster & Verification Widget */}
                <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2A52]">Recent Registrations & Verification Queue</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Click any student row to view details, verify documents, or mark placement</p>
                    </div>

                    <button onClick={() => setActiveTab('admin_students')} className="text-xs font-bold text-[#18B7C9] hover:underline cursor-pointer">
                      View Full Student Roster &rarr;
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#EAF2FB] text-slate-500 uppercase text-[10px] font-extrabold">
                          <th className="py-3 px-4">Student Name</th>
                          <th className="py-3 px-4">Roll No</th>
                          <th className="py-3 px-4">Branch</th>
                          <th className="py-3 px-4">CGPA</th>
                          <th className="py-3 px-4">Doc Verification</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Company</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAF2FB]">
                        {studentRoster.slice(0, 5).map((s) => (
                          <tr
                            key={s.id}
                            onClick={() => setSelectedStudentForModal(s)}
                            className="hover:bg-[#F5F8FC] cursor-pointer transition-colors"
                          >
                            <td className="py-3.5 px-4 font-bold text-[#0B2A52]">{s.name}</td>
                            <td className="py-3.5 px-4 text-slate-500 font-medium">{s.rollNo}</td>
                            <td className="py-3.5 px-4 font-semibold text-[#0B2A52]">{s.branch}</td>
                            <td className="py-3.5 px-4 font-bold text-[#18B7C9]">{s.cgpa}</td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                s.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                              }`}>
                                {s.verified ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                <span>{s.verified ? 'Verified' : 'Pending'}</span>
                              </span>
                            </td>
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
                <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs">
                  
                  {/* Filters Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EAF2FB]">
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      
                      {/* Search */}
                      <div className="flex items-center gap-2 bg-[#F5F8FC] px-3.5 py-2 rounded-xl border border-[#EAF2FB] w-full sm:w-64">
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
                        className="px-3 py-2 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] outline-none cursor-pointer"
                      >
                        <option value="All">All Branches</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="AI & DS">AI & DS</option>
                        <option value="Mechanical">Mechanical</option>
                      </select>

                      {/* Status Dropdown */}
                      <select
                        value={selectedStatusFilter}
                        onChange={(e) => setSelectedStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] outline-none cursor-pointer"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Placed">Placed</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Eligible">Eligible</option>
                      </select>
                    </div>

                    <button
                      onClick={() => alert('Student roster exported to CSV file successfully!')}
                      className="px-4 py-2 bg-[#071D3A] text-white text-xs font-bold rounded-xl hover:bg-[#0B2A52] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4 text-[#18B7C9]" />
                      <span>Export Roster (CSV)</span>
                    </button>
                  </div>

                  {/* Student Roster Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#EAF2FB] text-slate-500 uppercase text-[10px] font-extrabold">
                          <th className="py-3 px-4">Student</th>
                          <th className="py-3 px-4">Roll No</th>
                          <th className="py-3 px-4">Branch</th>
                          <th className="py-3 px-4">CGPA</th>
                          <th className="py-3 px-4">Verification</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Company & CTC</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAF2FB]">
                        {filteredRoster.map((s) => (
                          <tr key={s.id} className="hover:bg-[#F5F8FC] transition-colors">
                            <td className="py-3.5 px-4 font-bold text-[#0B2A52]">{s.name}</td>
                            <td className="py-3.5 px-4 text-slate-500 font-medium">{s.rollNo}</td>
                            <td className="py-3.5 px-4 font-semibold text-[#0B2A52]">{s.branch}</td>
                            <td className="py-3.5 px-4 font-bold text-[#18B7C9]">{s.cgpa}</td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                s.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                              }`}>
                                {s.verified ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                <span>{s.verified ? 'Verified' : 'Pending'}</span>
                              </span>
                            </td>
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
                              <button
                                onClick={() => setSelectedStudentForModal(s)}
                                className="px-3 py-1 bg-[#EAF2FB] text-[#18B7C9] text-xs font-bold rounded-lg hover:bg-[#18B7C9] hover:text-white transition-colors cursor-pointer"
                              >
                                View Profile
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

            {/* ADMIN TAB 3: DRIVE MANAGER */}
            {activeTab === 'admin_drives' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EAF2FB]">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2A52]">Campus Recruitment Drive Manager</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Post new hiring opportunities, check CGPA eligibility cutoffs, and track candidate applications</p>
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
                      <div key={d.id} className="p-6 rounded-3xl bg-[#F5F8FC] border border-[#EAF2FB] flex flex-col justify-between hover:shadow-md transition-all">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-3 py-1 rounded-full bg-[#EAF2FB] text-[#18B7C9] text-[10px] font-extrabold uppercase tracking-wider">
                              {d.type}
                            </span>
                            <span className="text-sm font-extrabold text-[#0B2A52]">{d.ctc}</span>
                          </div>

                          <div className="flex items-center gap-3.5 mb-3">
                            <div className={`w-12 h-12 rounded-2xl ${d.bg} text-white flex items-center justify-center font-extrabold text-sm shadow-md`}>
                              {d.company.substring(0, 2)}
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-[#0B2A52]">{d.role}</h4>
                              <p className="text-xs text-slate-500 font-semibold">{d.company}</p>
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-2 my-2 font-medium">
                            {d.desc}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs mt-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0B2A52]">{d.applicants} Applicants</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500">Min CGPA: {d.minCgpa}</span>
                          </div>
                          <span className="font-bold text-[#18B7C9]">{d.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ADMIN TAB 4: PLACEMENT ANALYTICS */}
            {activeTab === 'admin_analytics' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Branch Chart */}
                  <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs">
                    <h3 className="text-base font-bold text-[#0B2A52] mb-1">Branch-wise Placement Rate (%)</h3>
                    <p className="text-xs text-slate-500 mb-4">Percentage of eligible students placed per branch</p>

                    <div className="w-full h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { branch: 'CSE', rate: 94 },
                            { branch: 'IT', rate: 88 },
                            { branch: 'AI & DS', rate: 86 },
                            { branch: 'ECE', rate: 76 },
                            { branch: 'Mech', rate: 65 },
                          ]}
                        >
                          <XAxis dataKey="branch" stroke="#64748B" />
                          <YAxis domain={[0, 100]} stroke="#64748B" />
                          <Tooltip />
                          <Bar dataKey="rate" fill="#18B7C9" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* CTC Package Distribution */}
                  <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#0B2A52] mb-1">CTC Package Tier Breakdown</h3>
                      <p className="text-xs text-slate-500 mb-4">Salary bracket breakdown of batch 2026 offers</p>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-[#0B2A52]">Super Dream (&gt; 20 LPA)</span>
                            <span className="text-[#18B7C9]">12% (148 Students)</span>
                          </div>
                          <div className="w-full h-2.5 bg-[#F5F8FC] rounded-full overflow-hidden">
                            <div className="h-full bg-[#0B2A52] rounded-full w-[12%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-[#0B2A52]">Dream Package (10 - 20 LPA)</span>
                            <span className="text-[#18B7C9]">42% (520 Students)</span>
                          </div>
                          <div className="w-full h-2.5 bg-[#F5F8FC] rounded-full overflow-hidden">
                            <div className="h-full bg-[#18B7C9] rounded-full w-[42%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-[#0B2A52]">Core Package (5 - 10 LPA)</span>
                            <span className="text-[#18B7C9]">36% (446 Students)</span>
                          </div>
                          <div className="w-full h-2.5 bg-[#F5F8FC] rounded-full overflow-hidden">
                            <div className="h-full bg-[#3B82D0] rounded-full w-[36%]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#F5F8FC] rounded-2xl border border-[#EAF2FB] text-xs flex items-center justify-between mt-4">
                      <span className="font-semibold text-slate-600">Average Batch CTC</span>
                      <span className="font-extrabold text-[#0B2A52]">₹11.2 LPA</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ADMIN TAB 5: BROADCAST NOTICES */}
            {activeTab === 'admin_notices' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EAF2FB]">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2A52]">Placement Broadcast Announcements</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Publish alerts, interview schedules, and guidelines to student dashboards</p>
                    </div>

                    <button
                      onClick={() => setShowAddNoticeModal(true)}
                      className="px-4 py-2 bg-[#18B7C9] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#159FB0] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Megaphone className="w-4 h-4" />
                      <span>Publish Notice</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {adminNotices.map((n) => (
                      <div key={n.id} className="p-5 rounded-2xl bg-[#F5F8FC] border border-[#EAF2FB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex gap-3.5 items-start">
                          <div className="w-10 h-10 rounded-2xl bg-[#0B2A52] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                            <Megaphone className="w-5 h-5 text-[#18B7C9]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-extrabold">
                                {n.category}
                              </span>
                              <span className="text-xs text-slate-400 font-medium">• {n.date}</span>
                              <span className="text-xs font-bold text-[#18B7C9]">Target: {n.target}</span>
                            </div>
                            <h4 className="text-sm font-extrabold text-[#0B2A52]">{n.title}</h4>
                            <p className="text-xs text-slate-600 font-medium mt-1">{n.text}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setAdminNotices(adminNotices.filter(item => item.id !== n.id))}
                          className="text-slate-400 hover:text-red-500 p-2 rounded-xl transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ADMIN TAB 6: CELL SETTINGS */}
            {activeTab === 'admin_settings' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-[#EAF2FB] shadow-xs">
                  <h3 className="text-lg font-bold text-[#0B2A52] mb-1">Institutional Placement Cell Policy</h3>
                  <p className="text-xs text-slate-500 mb-6">Configure TPO guidelines, CGPA cutoff policies, and officer contact details</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-1">Placement Cell Name</label>
                      <input
                        type="text"
                        value={tpoCollegeName}
                        onChange={(e) => setTpoCollegeName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-1">Placement Director Name</label>
                      <input
                        type="text"
                        value={tpoDirector}
                        onChange={(e) => setTpoDirector(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-1">Default Minimum CGPA Cutoff</label>
                      <input
                        type="text"
                        value={minPlacementCgpa}
                        onChange={(e) => setMinPlacementCgpa(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-1">Max Offers Allowed Per Student</label>
                      <input
                        type="text"
                        value={maxOffersAllowed}
                        onChange={(e) => setMaxOffersAllowed(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52]"
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#EAF2FB] flex justify-end">
                    <button
                      onClick={() => alert('Placement Cell Configuration Settings Saved!')}
                      className="px-5 py-2.5 bg-[#0B2A52] text-white text-xs font-bold rounded-xl hover:bg-[#071D3A] transition-colors cursor-pointer shadow-md"
                    >
                      Save Policy Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* STUDENT MODE VIEWS */}
        {roleMode === 'student' && (
          <div className="mt-8">
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
                        Software engineering role readiness based on academic and project scores.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                      <span>Target CTC: 8-14 LPA</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-3xl p-6 border border-[#EAF2FB] shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Drive Readiness</span>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-2">
                      <div className="bg-[#F5F8FC] p-3 rounded-2xl border border-[#EAF2FB]">
                        <p className="text-[10px] text-slate-500 font-medium">Eligible Drives</p>
                        <p className="text-lg font-bold text-[#0B2A52] mt-0.5">14 Companies</p>
                      </div>
                      <div className="bg-[#F5F8FC] p-3 rounded-2xl border border-[#EAF2FB]">
                        <p className="text-[10px] text-slate-500 font-medium">Skill Gaps Fixed</p>
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

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-[#EAF2FB] shadow-xs">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#EAF2FB]">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#18B7C9] text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
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

                    <div className="bg-[#F5F8FC] p-4 rounded-2xl border border-[#EAF2FB] text-right">
                      <span className="text-xs font-bold text-slate-500">Overall CGPA</span>
                      <p className="text-2xl font-extrabold text-[#0B2A52]">8.6 / 10.0</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-2">Institutional Email</label>
                      <input type="email" readOnly value={user.email} className="w-full px-4 py-3 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-2">Phone Number</label>
                      <input type="text" readOnly value={user.phone || '+91 98765 43210'} className="w-full px-4 py-3 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-2">Department / Branch</label>
                      <input type="text" readOnly value={user.department || 'Computer Science & Engineering'} className="w-full px-4 py-3 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-2">Passing Year</label>
                      <input type="text" readOnly value={`${user.batch || '2026 Batch'} • Semester 7`} className="w-full px-4 py-3 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-slate-600" />
                    </div>
                  </div>

                  {/* INTERACTIVE RESUME UPLOAD DROPZONE & ATS SCANNER WIDGET */}
                  <div className="mt-8 pt-8 border-t border-[#EAF2FB]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-base font-extrabold text-[#0B2A52]">Resume Upload & ATS Optimization Engine</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Upload your PDF resume to parse technical keywords and calculate ATS match rating</p>
                      </div>
                      <span className="px-3 py-1 bg-[#EAF2FB] text-[#18B7C9] text-xs font-extrabold rounded-full border border-[#18B7C9]/20">
                        85 / 100 ATS Score
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Upload Drag & Drop Zone */}
                      <div className="p-6 rounded-3xl border-2 border-dashed border-[#18B7C9]/40 bg-[#F5F8FC] flex flex-col items-center justify-center text-center transition-colors hover:border-[#18B7C9]">
                        <div className="w-14 h-14 rounded-2xl bg-white text-[#18B7C9] shadow-sm flex items-center justify-center mb-3">
                          <UploadCloud className="w-7 h-7" />
                        </div>
                        <h4 className="text-sm font-bold text-[#0B2A52]">Drag & Drop your Resume PDF</h4>
                        <p className="text-xs text-slate-500 mt-1 mb-4">Supports PDF, DOCX (Max size 10MB)</p>

                        <label className="px-4 py-2.5 bg-[#0B2A52] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#071D3A] transition-colors cursor-pointer inline-flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#18B7C9]" />
                          <span>Select Resume File</span>
                          <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => alert(`Resume "${e.target.files[0]?.name}" uploaded successfully! ATS analysis updated.`)} />
                        </label>
                      </div>

                      {/* Parsed Resume Details & Keyword Chips */}
                      <div className="p-6 rounded-3xl border border-[#EAF2FB] bg-white flex flex-col justify-between shadow-xs">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-[#EAF2FB] mb-3">
                            <div className="flex items-center gap-2.5">
                              <FileText className="w-5 h-5 text-[#18B7C9]" />
                              <div>
                                <h4 className="text-xs font-bold text-[#0B2A52]">John_Doe_Resume_2026.pdf</h4>
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

            {/* TAB 5: JOBS */}
            {activeTab === 'jobs' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="bg-white rounded-3xl p-8 border border-[#EAF2FB] shadow-xs">
                  <h2 className="text-xl font-extrabold text-[#0B2A52] mb-4">Campus Hiring Drives & Openings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adminDrives.map((d) => (
                      <div key={d.id} className="p-5 rounded-2xl bg-[#F5F8FC] border border-[#EAF2FB]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold text-[#18B7C9] uppercase">{d.type}</span>
                          <span className="text-xs font-bold text-[#0B2A52]">{d.ctc}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#0B2A52]">{d.role}</h4>
                        <p className="text-xs text-slate-500">{d.company}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

      </main>

      {/* MODAL 1: POST NEW CAMPUS DRIVE (ADMIN MODE) */}
      {showAddDriveModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#0B2A52]">Post New Campus Hiring Drive</h3>
              <button onClick={() => setShowAddDriveModal(false)} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDriveSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-bold text-[#0B2A52] mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Microsoft / Google / TechCorp"
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
                  placeholder="Software Development Engineer"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                  <label className="block text-xs font-bold text-[#0B2A52] mb-1">Min CGPA Cutoff</label>
                  <input
                    type="text"
                    value={newMinCgpa}
                    onChange={(e) => setNewMinCgpa(e.target.value)}
                    placeholder="7.5"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                  />
                </div>
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

              <div>
                <label className="block text-xs font-bold text-[#0B2A52] mb-1">Drive Description / Criteria</label>
                <textarea
                  rows="2"
                  value={newDriveDesc}
                  onChange={(e) => setNewDriveDesc(e.target.value)}
                  placeholder="Role responsibilities and eligibility criteria..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDriveModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#18B7C9] text-white rounded-xl text-xs font-bold hover:bg-[#159FB0] shadow-md cursor-pointer"
                >
                  Publish Drive
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: PUBLISH BROADCAST NOTICE (ADMIN MODE) */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#0B2A52]">Publish Broadcast Notice</h3>
              <button onClick={() => setShowAddNoticeModal(false)} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNoticeSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-bold text-[#0B2A52] mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  placeholder="Assessment Guidelines / Campus Drive Date"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0B2A52] mb-1">Target Audience</label>
                  <select
                    value={newNoticeTarget}
                    onChange={(e) => setNewNoticeTarget(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                  >
                    <option value="All Students">All Students</option>
                    <option value="CSE & IT">CSE & IT</option>
                    <option value="ECE & Mechanical">ECE & Mechanical</option>
                    <option value="Batch 2026">Batch 2026</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B2A52] mb-1">Notice Category</label>
                  <select
                    value={newNoticeCategory}
                    onChange={(e) => setNewNoticeCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                  >
                    <option value="Urgent Alert">Urgent Alert</option>
                    <option value="Drive Alert">Drive Alert</option>
                    <option value="General Announcement">General Announcement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B2A52] mb-1">Notice Content</label>
                <textarea
                  rows="3"
                  required
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  placeholder="Enter detailed notice message for students..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0B2A52]"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddNoticeModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#18B7C9] text-white rounded-xl text-xs font-bold hover:bg-[#159FB0] shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 3: STUDENT DETAILS & VERIFICATION MODAL */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0B2A52] text-white flex items-center justify-center text-xs font-extrabold">
                  {getInitials(selectedStudentForModal.name)}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0B2A52]">{selectedStudentForModal.name}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">{selectedStudentForModal.rollNo} • {selectedStudentForModal.branch}</p>
                </div>
              </div>

              <button onClick={() => setSelectedStudentForModal(null)} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-left">
              <div className="p-3 bg-[#F5F8FC] rounded-2xl border border-[#EAF2FB] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-bold text-[#0B2A52]">{selectedStudentForModal.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-bold text-[#0B2A52]">{selectedStudentForModal.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Academic CGPA:</span>
                  <span className="font-extrabold text-[#18B7C9]">{selectedStudentForModal.cgpa} / 10.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Placement Status:</span>
                  <span className="font-bold text-[#0B2A52]">{selectedStudentForModal.status} {selectedStudentForModal.company !== 'In Process' && `at ${selectedStudentForModal.company}`}</span>
                </div>
              </div>

              <div className="p-3 bg-[#F5F8FC] rounded-2xl border border-[#EAF2FB] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#0B2A52]">Document Verification</h4>
                  <p className="text-[10px] text-slate-500">Academic transcripts and identity proof</p>
                </div>
                <button
                  onClick={() => handleToggleVerification(selectedStudentForModal.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedStudentForModal.verified
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{selectedStudentForModal.verified ? 'Verified' : 'Verify Credentials'}</span>
                </button>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    setStudentRoster(prev => prev.map(s => s.id === selectedStudentForModal.id ? { ...s, status: 'Placed', company: 'TechCorp Solutions', ctc: '12 LPA' } : s));
                    setSelectedStudentForModal(null);
                  }}
                  className="flex-1 py-2.5 bg-[#0B2A52] text-white rounded-xl text-xs font-bold hover:bg-[#071D3A] transition-colors cursor-pointer"
                >
                  Mark as Placed
                </button>
                <button
                  onClick={() => setSelectedStudentForModal(null)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
