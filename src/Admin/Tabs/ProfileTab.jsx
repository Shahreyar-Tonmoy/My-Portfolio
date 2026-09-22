import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSave, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { usePortfolio, API_BASE_URL, resolveAssetUrl } from '../../context/PortfolioContext';
import ImageUploader from '../Components/ImageUploader';
import PdfUploader from '../Components/PdfUploader';

const ProfileTab = () => {
  const { profile, setProfile } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    tagline: '',
    typewriterRoles: '',
    bio: '',
    email: '',
    location: '',
    profileImage: '',
    resumeUrl: '',
    experienceYears: '01+',
    projectsCount: '12+',
    dedicationPct: '100%',
    github: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    twitter: '',
    focusAreas: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        tagline: profile.tagline || '',
        typewriterRoles: Array.isArray(profile.typewriterRoles)
          ? profile.typewriterRoles.join(', ')
          : '',
        bio: profile.bio || '',
        email: profile.email || '',
        location: profile.location || '',
        profileImage: profile.profileImage || '',
        resumeUrl: profile.resumeUrl || '',
        experienceYears: profile.experienceYears || '01+',
        projectsCount: profile.projectsCount || '12+',
        dedicationPct: profile.dedicationPct || '100%',
        github: profile.socialLinks?.github || '',
        linkedin: profile.socialLinks?.linkedin || '',
        facebook: profile.socialLinks?.facebook || '',
        instagram: profile.socialLinks?.instagram || '',
        twitter: profile.socialLinks?.twitter || '',
        focusAreas: Array.isArray(profile.focusAreas) ? profile.focusAreas.join(', ') : '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg({ type: '', text: '' });

    const payload = {
      name: formData.name,
      title: formData.title,
      tagline: formData.tagline,
      typewriterRoles: formData.typewriterRoles
        .split(',')
        .map((r) => r.trim())
        .filter(Boolean),
      bio: formData.bio,
      email: formData.email,
      location: formData.location,
      profileImage: formData.profileImage,
      resumeUrl: formData.resumeUrl,
      experienceYears: formData.experienceYears,
      projectsCount: formData.projectsCount,
      dedicationPct: formData.dedicationPct,
      socialLinks: {
        github: formData.github,
        linkedin: formData.linkedin,
        facebook: formData.facebook,
        instagram: formData.instagram,
        twitter: formData.twitter,
      },
      focusAreas: formData.focusAreas
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
    };

    try {
      const token = localStorage.getItem('portfolio_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.put(`${API_BASE_URL}/api/profile`, payload, { headers });
      if (res.data?.success) {
        setProfile(res.data.data || payload);
        setStatusMsg({ type: 'success', text: 'Profile updated successfully in live database!' });
      } else {
        setProfile(payload);
        setStatusMsg({ type: 'success', text: 'Profile updated in local state.' });
      }
    } catch {
      setProfile(payload);
      setStatusMsg({ type: 'success', text: 'Profile updated locally (server in offline mode).' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#030712]/95 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
              Profile &amp; Hero Section Controller
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Modify personal details, hero typography, dynamic typewriter roles, and social media channels
            </p>
          </div>

          {statusMsg.text && (
            <div
              className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              }`}
            >
              {statusMsg.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>

        {/* Live Portrait Preview Card on Panel */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-white/10 flex flex-col sm:flex-row items-center gap-5">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-500/40 bg-zinc-950 flex-shrink-0 shadow-lg group">
            <img
              src={resolveAssetUrl(formData.profileImage,)}
              alt="Portrait Preview"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active Hero &amp; About Portrait</span>
            </div>
            <h3 className="text-base font-bold text-white font-mono">
              {formData.name || 'Shahreyar Tonmoy'}
            </h3>
            <p className="text-xs text-indigo-300 font-mono mt-0.5">
              {formData.title || 'Front-End &amp; Full-Stack Developer'}
            </p>
            <p className="text-[11px] font-mono text-slate-400 mt-1.5 max-w-lg">
              This photo displays in the interactive 3D hero showcase and about grid. Upload a new image below to update.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Identity & Headings */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-emerald-500 text-sm font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Primary Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-emerald-500 text-sm font-mono outline-none"
              />
            </div>
          </div>

          {/* Dynamic Typewriter Roles */}
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Typewriter Sequence Roles (comma-separated)
            </label>
            <input
              type="text"
              name="typewriterRoles"
              value={formData.typewriterRoles}
              onChange={handleChange}
              placeholder="Front-End Developer, React.js Specialist, Full-Stack Developer, MERN Stack Engineer"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-emerald-500 text-sm font-mono outline-none"
            />
            <p className="text-[11px] font-mono text-slate-500 mt-1">
              These roles dynamically animate on the homepage hero section.
            </p>
          </div>

          {/* Bio Description */}
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Hero &amp; About Bio Description
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-emerald-500 text-sm font-mono outline-none resize-none"
            />
          </div>

          {/* Contact Details */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-emerald-500 text-sm font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Physical Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-emerald-500 text-sm font-mono outline-none"
              />
            </div>
          </div>

          {/* Profile Photo Uploader (ImgBB) */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-3">
              {"//"} Profile Photo (Avatar)
            </h4>
            <ImageUploader
              label="Upload Portrait Image (ImgBB or Local):"
              currentImage={formData.profileImage }
              onUploadSuccess={(url) => {
                setFormData((prev) => ({ ...prev, profileImage: url }));
                setStatusMsg({
                  type: 'success',
                  text: 'Profile photo uploaded and linked to profile!',
                });
              }}
            />
          </div>

          {/* Resume & Curriculum Vitae (PDF Format) */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-3">
              {"//"} Resume &amp; Curriculum Vitae (PDF Format)
            </h4>
            <PdfUploader
              label="Upload Resume or CV Document (PDF):"
              currentPdf={formData.resumeUrl}
              onUploadSuccess={(url) => {
                setFormData((prev) => ({ ...prev, resumeUrl: url }));
                setStatusMsg({
                  type: 'success',
                  text: 'Resume/CV PDF uploaded and linked to profile!',
                });
              }}
            />

            <div className="mt-3">
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Or enter an external PDF link (Google Drive / Dropbox / Cloud link):
              </label>
              <input
                type="text"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                placeholder="https://... or upload PDF file above"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-indigo-500 text-xs font-mono outline-none"
              />
              <p className="text-[10px] font-mono text-slate-500 mt-1">
                This PDF link will be dynamically served whenever visitors click &ldquo;Download Resume&rdquo; on the homepage.
              </p>
            </div>
          </div>

          {/* Key Stat Badges */}
          <div className="grid sm:grid-cols-3 gap-5 pt-2 border-t border-white/10">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Years Experience Text
              </label>
              <input
                type="text"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-emerald-500 text-sm font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Projects Completed Text
              </label>
              <input
                type="text"
                name="projectsCount"
                value={formData.projectsCount}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-emerald-500 text-sm font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Dedication Percentage
              </label>
              <input
                type="text"
                name="dedicationPct"
                value={formData.dedicationPct}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-emerald-500 text-sm font-mono outline-none"
              />
            </div>
          </div>

          {/* Primary Focus Areas / Toolchains */}
          <div className="pt-2 border-t border-white/10">
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Primary Focus Areas / Toolchain Badges (comma-separated)
            </label>
            <input
              type="text"
              name="focusAreas"
              value={formData.focusAreas}
              onChange={handleChange}
              placeholder="React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), Tailwind CSS, REST APIs, Firebase"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-white/10 focus:border-emerald-500 text-sm font-mono outline-none"
            />
            <p className="text-[11px] font-mono text-slate-500 mt-1">
              You can also use the interactive tag manager inside the dedicated &ldquo;About Me&rdquo; tab!
            </p>
          </div>

          {/* Social Links */}
          <div className="pt-2 border-t border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-4">
              {"//"} Social Media Channels
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">GitHub URL</label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Facebook URL</label>
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Instagram URL</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Twitter URL</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={isSaving}
              className="py-3.5 px-8 rounded-xl font-mono text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-glow-emerald hover:shadow-glow-cyan disabled:opacity-50 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Transmitting Updates...</span>
                </>
              ) : (
                <>
                  <FiSave className="text-base" />
                  <span>Save Profile Changes</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ProfileTab;
