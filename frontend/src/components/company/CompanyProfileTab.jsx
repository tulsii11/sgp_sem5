import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  RefreshCw,
  Info
} from 'lucide-react';
import { companyService } from '../../services/companyService';

export const CompanyProfileTab = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Identifiers
  const [profileId, setProfileId] = useState(null);
  const [companyProfileId, setCompanyProfileId] = useState(null);

  // profiles table fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userLocation, setUserLocation] = useState('');

  // company_profiles table fields
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companySize, setCompanySize] = useState('51-200');

  const loadProfile = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await companyService.getAuthenticatedCompany();
      if (data) {
        if (data.profile) {
          setProfileId(data.profile.id || null);
          setFullName(data.profile.full_name || '');
          setEmail(data.profile.email || '');
          setPhone(data.profile.phone || '');
          setUserLocation(data.profile.location || '');
        }
        if (data.companyProfile) {
          setCompanyProfileId(data.companyProfile.id || null);
          setCompanyName(data.companyProfile.company_name || '');
          setDescription(data.companyProfile.description || '');
          setWebsite(data.companyProfile.website || '');
          setIndustry(data.companyProfile.industry || '');
          setCompanyLocation(data.companyProfile.location || '');
          setCompanySize(data.companyProfile.company_size || '51-200');
        }
      }
    } catch (err) {
      console.error('Failed to load company profile:', err);
      setErrorMsg('Could not load company profile data from Supabase. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (!companyName.trim()) {
      setErrorMsg('Organization name is required.');
      setSaving(false);
      return;
    }

    try {
      await companyService.updateCompanyProfile({
        profileId,
        companyProfileId,
        profileData: {
          full_name: fullName,
          phone,
          location: userLocation
        },
        companyData: {
          company_name: companyName,
          description,
          website,
          industry,
          location: companyLocation,
          company_size: companySize
        }
      });

      // Update local storage representation if present
      const local = localStorage.getItem('user');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          parsed.name = fullName;
          parsed.company_name = companyName;
          localStorage.setItem('user', JSON.stringify(parsed));
        } catch (e) { console.error(e); }
      }

      setSuccessMsg('Company profile updated and saved to Supabase successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to update company profile:', err);
      setErrorMsg(err.message || 'Failed to save changes to Supabase.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-[#EAF2FB] shadow-xs flex flex-col items-center justify-center min-h-[360px]">
        <RefreshCw className="w-8 h-8 text-[#18B7C9] animate-spin mb-3" />
        <p className="text-xs font-semibold text-slate-500">Loading company profile from Supabase...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-6"
    >
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAF2FB] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#18B7C9]/15 text-[#0B2A52] text-[10px] font-extrabold uppercase tracking-wider">
              Recruiter Profile
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Supabase Connected</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2A52]">Company Profile & Branding</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure how your organization, hiring credentials, and active openings are presented to students.
          </p>
        </div>

        <button
          onClick={loadProfile}
          disabled={loading || saving}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#0B2A52] bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl hover:bg-[#EAF2FB] transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#18B7C9] ${loading ? 'animate-spin' : ''}`} />
          <span>Reload</span>
        </button>
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
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: ORGANIZATION DETAILS (company_profiles) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAF2FB] shadow-xs">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#EAF2FB]">
            <div className="w-10 h-10 rounded-xl bg-[#18B7C9]/15 text-[#0B2A52] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5 text-[#18B7C9]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0B2A52]">Organization Information</h3>
              <p className="text-[11px] text-slate-400 font-medium">Mapped to public.company_profiles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* company_name */}
            <div>
              <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Microsoft / TechCorp Global"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
                />
              </div>
            </div>

            {/* industry */}
            <div>
              <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Industry Sector</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Information Technology / Fintech / Edtech"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
                />
              </div>
            </div>

            {/* website */}
            <div>
              <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Company Website</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://company.example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
                />
              </div>
            </div>

            {/* company_size */}
            <div>
              <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Company Size</label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
                >
                  <option value="1-10">1 - 10 employees (Startup)</option>
                  <option value="11-50">11 - 50 employees (Early Stage)</option>
                  <option value="51-200">51 - 200 employees (Mid Size)</option>
                  <option value="201-500">201 - 500 employees (Scale-up)</option>
                  <option value="501-1000">501 - 1000 employees (Enterprise)</option>
                  <option value="1001-5000">1001 - 5000 employees (Large Corp)</option>
                  <option value="5000+">5000+ employees (MNC / Global)</option>
                </select>
              </div>
            </div>

            {/* location */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Headquarters / Office Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={companyLocation}
                  onChange={(e) => setCompanyLocation(e.target.value)}
                  placeholder="e.g. Bangalore, Karnataka (Hybrid / Pan-India)"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
                />
              </div>
            </div>

            {/* description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Company Overview / Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe your company's core mission, engineering culture, and work environment..."
                className="w-full p-3.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: RECRUITER CONTACT (profiles) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAF2FB] shadow-xs">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#EAF2FB]">
            <div className="w-10 h-10 rounded-xl bg-[#3B82D0]/15 text-[#3B82D0] flex items-center justify-center font-bold">
              <Mail className="w-5 h-5 text-[#3B82D0]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0B2A52]">Recruiter Representative Contact</h3>
              <p className="text-[11px] text-slate-400 font-medium">Mapped to public.profiles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* full_name */}
            <div>
              <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Contact Person Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Priya Nair (Lead Campus Recruiter)"
                className="w-full px-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
              />
            </div>

            {/* email (Read-only per auth architecture) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#0B2A52]">Official Login Email</label>
                <span className="text-[10px] text-slate-400 font-semibold inline-flex items-center gap-1">
                  <Info className="w-3 h-3" /> Read-only (Auth)
                </span>
              </div>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* phone */}
            <div>
              <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Contact Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
                />
              </div>
            </div>

            {/* user location */}
            <div>
              <label className="block text-xs font-bold text-[#0B2A52] mb-1.5">Representative Base City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  placeholder="e.g. Mumbai, India"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-[#EAF2FB] rounded-xl text-xs font-semibold text-[#0B2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18B7C9]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#18B7C9] text-white rounded-2xl text-xs font-extrabold hover:bg-[#159FB0] shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving to Supabase...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CompanyProfileTab;
