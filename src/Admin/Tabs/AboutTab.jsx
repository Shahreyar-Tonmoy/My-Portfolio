import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiSave,
  FiCheck,
  FiAlertCircle,
  FiPlus,
  FiX,
  FiLayers,
  FiServer,
  FiZap,
  FiMapPin,
  FiMail,
  FiEye,
  FiTag,
  FiActivity,
} from 'react-icons/fi';
import { usePortfolio, API_BASE_URL, resolveAssetUrl } from '../../context/PortfolioContext';
import defaultPhoto from '../../assets/Profile Photo.png';
import ImageUploader from '../Components/ImageUploader';

const defaultPillars = [
  {
    title: 'Component Architecture',
    description:
      'Composable, reusable React components with optimized render cycles and clean state flow.',
    icon: 'layers',
  },
  {
    title: 'Scalable REST APIs',
    description:
      'Structured Node.js & Express routing, JWT security, and MongoDB schema design.',
    icon: 'server',
  },
  {
    title: 'Performance & A11y',
    description:
      'Fluid responsive designs, high Core Web Vitals, and accessible semantic markup.',
    icon: 'zap',
  },
];

const AboutTab = () => {
  const { profile, setProfile } = usePortfolio();

  const [formData, setFormData] = useState({
    aboutBadge: 'About Me',
    aboutHeading: 'Engineering with Purpose & Precision',
    aboutSubheading:
      'Bridging front-end artistry with robust full-stack architecture to build seamless digital applications.',
    aboutRoleBadge: 'Front-End & Full-Stack',
    aboutStory: '',
    name: 'Shahreyar Tonmoy',
    title: 'Front-End & Full-Stack Developer',
    location: 'Joypurhat, Bangladesh',
    email: 'Shahreyartonmoy001@gmail.com',
    profileImage: '',
    experienceYears: '01+',
    projectsCount: '12+',
    dedicationPct: '100% Dedicated',
    focusAreas: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'REST APIs',
      'Firebase',
    ],
    philosophyPillars: defaultPillars,
  });

  const [newTagInput, setNewTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    if (profile) {
      setFormData({
        aboutBadge: profile.aboutBadge || 'About Me',
        aboutHeading: profile.aboutHeading || 'Engineering with Purpose & Precision',
        aboutSubheading:
          profile.aboutSubheading ||
          'Bridging front-end artistry with robust full-stack architecture to build seamless digital applications.',
        aboutRoleBadge: profile.aboutRoleBadge || 'Front-End & Full-Stack',
        aboutStory: profile.aboutStory || profile.bio || '',
        name: profile.name || 'Shahreyar Tonmoy',
        title: profile.title || 'Front-End & Full-Stack Developer',
        location: profile.location || 'Joypurhat, Bangladesh',
        email: profile.email || 'Shahreyartonmoy001@gmail.com',
        profileImage: profile.profileImage || '',
        experienceYears: profile.experienceYears || '01+',
        projectsCount: profile.projectsCount || '12+',
        dedicationPct: profile.dedicationPct || '100% Dedicated',
        focusAreas:
          Array.isArray(profile.focusAreas) && profile.focusAreas.length > 0
            ? profile.focusAreas
            : [
                'React.js',
                'Node.js',
                'Express.js',
                'MongoDB',
                'JavaScript (ES6+)',
                'Tailwind CSS',
                'REST APIs',
                'Firebase',
              ],
        philosophyPillars:
          Array.isArray(profile.philosophyPillars) && profile.philosophyPillars.length > 0
            ? profile.philosophyPillars
            : defaultPillars,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePillarChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.philosophyPillars];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, philosophyPillars: updated };
    });
  };

  const handleAddTag = (e) => {
    e?.preventDefault();
    const tag = newTagInput.trim();
    if (!tag) return;
    if (formData.focusAreas.includes(tag)) {
      setNewTagInput('');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      focusAreas: [...prev.focusAreas, tag],
    }));
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.filter((t) => t !== tagToRemove),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg({ type: '', text: '' });

    const payload = {
      ...profile,
      aboutBadge: formData.aboutBadge,
      aboutHeading: formData.aboutHeading,
      aboutSubheading: formData.aboutSubheading,
      aboutRoleBadge: formData.aboutRoleBadge,
      aboutStory: formData.aboutStory,
      name: formData.name,
      title: formData.title,
      location: formData.location,
      email: formData.email,
      profileImage: formData.profileImage,
      experienceYears: formData.experienceYears,
      projectsCount: formData.projectsCount,
      dedicationPct: formData.dedicationPct,
      focusAreas: formData.focusAreas,
      philosophyPillars: formData.philosophyPillars,
    };

    try {
      const token = localStorage.getItem('portfolio_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.put(`${API_BASE_URL}/api/profile`, payload, { headers });
      if (res.data?.success) {
        setProfile(res.data.data || payload);
        setStatusMsg({ type: 'success', text: 'About Me section updated in live database!' });
      } else {
        setProfile(payload);
        setStatusMsg({ type: 'success', text: 'About Me updated in local state.' });
      }
    } catch {
      setProfile(payload);
      setStatusMsg({ type: 'success', text: 'About Me saved locally (server offline mode).' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
    }
  };

  const portraitSrc = resolveAssetUrl(formData.profileImage, defaultPhoto);

  return (
    <div className="max-w-6xl">
      <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#030712]/95 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Section Controller</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
              About Me Section Controller
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Customize the Bento grid narrative, architectural pillars, key metrics, and toolchain badges
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

        {/* Live Bento Mini-Preview */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-950/70 border border-indigo-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-300">
              <FiEye className="text-sm" />
              <span className="font-semibold uppercase tracking-wider">Live Bento Mini-Preview</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Real-time sync</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Tile 1 Preview */}
            <div className="md:col-span-7 rounded-2xl bg-zinc-900/60 border border-white/10 p-4 flex flex-col justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-zinc-950 flex-shrink-0">
                  <img
                    src={portraitSrc}
                    alt="Preview"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {formData.aboutRoleBadge || 'Front-End & Full-Stack'}
                  </span>
                  <h4 className="text-base font-bold text-white font-mono mt-1">
                    {formData.name || 'Shahreyar Tonmoy'}
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono">
                    {formData.title || 'Developer'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-300 mt-3 line-clamp-3 font-light leading-relaxed">
                {formData.aboutStory || 'Your developer story and bio narrative will appear here...'}
              </p>
              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <FiMapPin className="text-indigo-400" />
                  <span>{formData.location}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <FiMail className="text-indigo-400" />
                  <span>{formData.email}</span>
                </div>
              </div>
            </div>

            {/* Tile 2 Preview */}
            <div className="md:col-span-5 rounded-2xl bg-zinc-900/60 border border-white/10 p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                  Architectural Standards
                </span>
                <div className="space-y-2 mt-2">
                  {formData.philosophyPillars.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                        {idx === 0 ? <FiLayers /> : idx === 1 ? <FiServer /> : <FiZap />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-200">{p.title}</div>
                        <div className="text-[10px] text-zinc-400 line-clamp-1">{p.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-bold font-mono text-white">{formData.experienceYears}</div>
                  <div className="text-[9px] text-zinc-400">Experience</div>
                </div>
                <div>
                  <div className="text-sm font-bold font-mono text-white">{formData.projectsCount}</div>
                  <div className="text-[9px] text-zinc-400">Shipped</div>
                </div>
                <div>
                  <div className="text-sm font-bold font-mono text-emerald-400">{formData.dedicationPct}</div>
                  <div className="text-[9px] text-zinc-400">Dedication</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Form */}
        <form onSubmit={handleSave} className="flex flex-col gap-8">
          
          {/* Section 1: Section Headlines & Badges */}
          <div className="p-5 rounded-xl bg-slate-950/50 border border-white/5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-4 flex items-center gap-2">
              <FiTag />
              <span>Section Header &amp; Subtitle Typography</span>
            </h3>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Section Pill Badge Text
                </label>
                <input
                  type="text"
                  name="aboutBadge"
                  value={formData.aboutBadge}
                  onChange={handleChange}
                  placeholder="About Me"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Main Headline (e.g. Engineering with Purpose &amp; Precision)
                </label>
                <input
                  type="text"
                  name="aboutHeading"
                  value={formData.aboutHeading}
                  onChange={handleChange}
                  placeholder="Engineering with Purpose & Precision"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Section Subtitle Paragraph
              </label>
              <textarea
                name="aboutSubheading"
                rows={2}
                value={formData.aboutSubheading}
                onChange={handleChange}
                placeholder="Bridging front-end artistry with robust full-stack architecture..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-indigo-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* Section 2: Developer Identity & Story Narrative */}
          <div className="p-5 rounded-xl bg-slate-950/50 border border-white/5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-4 flex items-center gap-2">
              <FiActivity />
              <span>Developer Identity &amp; Bio Narrative (Bento Tile 1)</span>
            </h3>

            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Role Badge Text (e.g. Front-End &amp; Full-Stack)
                </label>
                <input
                  type="text"
                  name="aboutRoleBadge"
                  value={formData.aboutRoleBadge}
                  onChange={handleChange}
                  placeholder="Front-End & Full-Stack"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                About Story &amp; Detailed Bio Narrative
              </label>
              <textarea
                name="aboutStory"
                rows={4}
                value={formData.aboutStory}
                onChange={handleChange}
                placeholder="I'm a dedicated Full-Stack developer with a passion for designing fast, responsive, and intuitive web solutions..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-indigo-500 outline-none resize-none leading-relaxed"
              />
              <p className="text-[11px] font-mono text-slate-500 mt-1">
                This comprehensive story will be displayed on the About Me showcase card.
              </p>
            </div>

            {/* Portrait Uploader */}
            <div className="pt-3 border-t border-white/5">
              <ImageUploader
                label="Portrait Photo (ImgBB / Local Upload):"
                currentImage={formData.profileImage || defaultPhoto}
                onUploadSuccess={(url) => {
                  setFormData((prev) => ({ ...prev, profileImage: url }));
                  setStatusMsg({
                    type: 'success',
                    text: 'About portrait photo uploaded successfully!',
                  });
                }}
              />
            </div>
          </div>

          {/* Section 3: Core Philosophy & Architectural Standards */}
          <div className="p-5 rounded-xl bg-slate-950/50 border border-white/5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-4 flex items-center gap-2">
              <FiLayers />
              <span>Core Philosophy &amp; Architectural Pillars (Bento Tile 2)</span>
            </h3>

            <div className="space-y-4">
              {formData.philosophyPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/70 border border-white/5 flex flex-col sm:flex-row items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                    {idx === 0 ? <FiLayers /> : idx === 1 ? <FiServer /> : <FiZap />}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Pillar #{idx + 1} Title
                      </label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 text-white border border-white/10 text-xs font-mono focus:border-cyan-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Pillar #{idx + 1} Description
                      </label>
                      <input
                        type="text"
                        value={pillar.description}
                        onChange={(e) => handlePillarChange(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 text-white border border-white/10 text-xs font-mono focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Key Metrics & Track Record */}
          <div className="p-5 rounded-xl bg-slate-950/50 border border-white/5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold mb-4 flex items-center gap-2">
              <FiActivity />
              <span>Track Record &amp; Key Metrics (Bento Tile 3)</span>
            </h3>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Years Active (Experience)
                </label>
                <input
                  type="text"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  placeholder="01+"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Shipped Applications Count
                </label>
                <input
                  type="text"
                  name="projectsCount"
                  value={formData.projectsCount}
                  onChange={handleChange}
                  placeholder="12+"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Client Dedication Percentage
                </label>
                <input
                  type="text"
                  name="dedicationPct"
                  value={formData.dedicationPct}
                  onChange={handleChange}
                  placeholder="100% Dedicated"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Primary Toolchain & Focus Badges */}
          <div className="p-5 rounded-xl bg-slate-950/50 border border-white/5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-yellow-400 font-semibold mb-2 flex items-center gap-2">
              <FiTag />
              <span>Primary Toolchain &amp; Focus Badges (Bento Tile 4)</span>
            </h3>
            <p className="text-[11px] font-mono text-slate-400 mb-4">
              These skill chips appear dynamically in the bottom Bento tile on the About section.
            </p>

            {/* Current Tags Chips */}
            <div className="flex flex-wrap gap-2 mb-4 p-3 rounded-xl bg-slate-900/60 border border-white/5 min-h-[50px] items-center">
              {formData.focusAreas.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.06] text-white border border-white/10 hover:border-yellow-400/40 transition-colors"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-slate-400 hover:text-rose-400 text-xs transition-colors cursor-pointer"
                    title={`Remove ${tag}`}
                  >
                    <FiX />
                  </button>
                </span>
              ))}
              {formData.focusAreas.length === 0 && (
                <span className="text-xs font-mono text-slate-500">No focus tags added yet.</span>
              )}
            </div>

            {/* Add Tag Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Type technology name (e.g. Next.js, Redux, PostgreSQL) & press Enter"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-yellow-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-5 py-2.5 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FiPlus />
                <span>Add Tag</span>
              </button>
            </div>
          </div>

          {/* Section 6: Contact & Location */}
          <div className="p-5 rounded-xl bg-slate-950/50 border border-white/5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-4 flex items-center gap-2">
              <FiMapPin />
              <span>Contact &amp; Geographical Location</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Physical Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Joypurhat, Bangladesh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Direct Inquiries Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Shahreyartonmoy001@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white border border-white/10 text-xs font-mono focus:border-rose-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bottom Save Action */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="submit"
              disabled={isSaving}
              className="py-3.5 px-8 rounded-xl font-mono text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 hover:from-emerald-400 hover:to-cyan-400 shadow-glow-emerald disabled:opacity-50 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving About Me Changes...</span>
                </>
              ) : (
                <>
                  <FiSave className="text-base" />
                  <span>Save About Me Changes</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AboutTab;
