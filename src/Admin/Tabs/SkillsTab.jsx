import { useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiCpu, FiCheck, FiX } from 'react-icons/fi';
import { usePortfolio, API_BASE_URL, resolveAssetUrl } from '../../context/PortfolioContext';
import ImageUploader from '../Components/ImageUploader';

const SkillsTab = () => {
  const { skills, setSkills, refreshData, fallbackIcons } = usePortfolio();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const [form, setForm] = useState({
    name: '',
    category: 'frontend',
    level: 'Advanced',
    pct: '85%',
    desc: '',
    icon: '',
    color: 'from-emerald-500 to-cyan-500',
  });

  const openAddModal = () => {
    setEditingSkill(null);
    setForm({
      name: '',
      category: 'frontend',
      level: 'Advanced',
      pct: '85%',
      desc: '',
      icon: '',
      color: 'from-emerald-500 to-cyan-500',
    });
    setModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name || '',
      category: skill.category || 'frontend',
      level: skill.level || 'Advanced',
      pct: skill.pct || '85%',
      desc: skill.desc || '',
      icon: typeof skill.icon === 'string' ? skill.icon : '',
      color: skill.color || 'from-emerald-500 to-cyan-500',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg('');

    const token = localStorage.getItem('portfolio_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const payload = {
      name: form.name,
      category: form.category,
      level: form.level,
      pct: form.pct.includes('%') ? form.pct : `${form.pct}%`,
      desc: form.desc,
      icon: form.icon,
      color: form.color,
    };

    try {
      if (editingSkill) {
        const id = editingSkill._id;
        await axios.put(`${API_BASE_URL}/api/skills/${id}`, payload, { headers });
        setStatusMsg('Skill updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/api/skills`, payload, { headers });
        setStatusMsg('New skill added to database!');
      }
      await refreshData();
      setModalOpen(false);
    } catch {
      if (editingSkill) {
        setSkills((prev) =>
          prev.map((s) => (s._id === editingSkill._id ? { ...s, ...payload } : s))
        );
        setStatusMsg('Skill updated locally.');
      } else {
        setSkills((prev) => [...prev, { _id: Date.now().toString(), ...payload }]);
        setStatusMsg('Skill added locally.');
      }
      setModalOpen(false);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    const token = localStorage.getItem('portfolio_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      await axios.delete(`${API_BASE_URL}/api/skills/${id}`, { headers });
      await refreshData();
      setStatusMsg('Skill deleted successfully.');
    } catch {
      setSkills((prev) => prev.filter((s) => s._id !== id));
      setStatusMsg('Skill removed locally.');
    } finally {
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
            <FiCpu className="text-cyan-400" />
            <span>Technical Skills Controller</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Manage technology competencies, category categorization, proficiency meters, and ImgBB icons
          </p>
        </div>

        <div className="flex items-center gap-3">
          {statusMsg && (
            <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              {statusMsg}
            </span>
          )}

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 shadow-glow-emerald flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <FiPlus className="text-base" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => {
          const skillIcon =
            resolveAssetUrl(skill.icon) ||
            (fallbackIcons && fallbackIcons[index % fallbackIcons.length]);

          return (
            <div
              key={skill._id || skill.name}
              className="rounded-xl bg-gradient-to-b from-slate-900/90 to-[#030712]/95 border border-white/10 p-5 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                    {skill.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(skill)}
                      className="p-1 rounded bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 cursor-pointer transition-colors"
                      title="Edit Skill"
                    >
                      <FiEdit2 className="text-xs" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="p-1 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10 cursor-pointer transition-colors"
                      title="Delete Skill"
                    >
                      <FiTrash2 className="text-xs" />
                    </button>
                  </div>
                </div>

                {/* Skill Icon & Name */}
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-950 border border-white/10 p-2 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/40 transition-colors overflow-hidden">
                    {skillIcon ? (
                      <img
                        src={skillIcon}
                        alt={skill.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <FiCpu className="text-cyan-400 text-lg" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white font-mono leading-snug">{skill.name}</h4>
                </div>

                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{skill.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{skill.level}</span>
                <span className="text-emerald-400 font-bold">{skill.pct}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Skill Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-base font-bold text-white font-mono">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                  Skill / Technology Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Next.js, Redux, Docker"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  >
                    <option value="frontend">Frontend &amp; 3D</option>
                    <option value="backend">Backend &amp; DB</option>
                    <option value="tools">Tools &amp; DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Proficiency Level
                  </label>
                  <select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  >
                    <option value="Expert">Expert (90-95%)</option>
                    <option value="Advanced">Advanced (80-89%)</option>
                    <option value="Proficient">Proficient (70-79%)</option>
                    <option value="Intermediate">Intermediate (60-69%)</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Percentage (%)
                  </label>
                  <input
                    type="text"
                    value={form.pct}
                    onChange={(e) => setForm({ ...form, pct: e.target.value })}
                    placeholder="90%"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Gradient Accent
                  </label>
                  <select
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  >
                    <option value="from-emerald-500 to-cyan-500">Emerald / Cyan</option>
                    <option value="from-cyan-500 to-blue-500">Cyan / Blue</option>
                    <option value="from-yellow-400 to-amber-500">Yellow / Amber</option>
                    <option value="from-purple-500 to-indigo-500">Purple / Indigo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                  Description / Subtext
                </label>
                <textarea
                  rows={2}
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Key concepts, libraries, or use cases..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10">
                <ImageUploader
                  label="Upload Skill Icon to ImgBB (optional)"
                  currentImage={form.icon}
                  onUploadSuccess={(url) => setForm((prev) => ({ ...prev, icon: url }))}
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-mono text-xs text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 shadow-glow-emerald disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  <FiCheck />
                  <span>{editingSkill ? 'Save Changes' : 'Add Skill'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsTab;
