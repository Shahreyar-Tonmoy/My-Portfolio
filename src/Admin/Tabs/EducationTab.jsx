import { useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiCheck, FiX, FiAward, FiCalendar, FiMapPin } from 'react-icons/fi';
import { usePortfolio, API_BASE_URL } from '../../context/PortfolioContext';

const EducationTab = () => {
  const { education, setEducation, refreshData } = usePortfolio();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const [form, setForm] = useState({
    period: '',
    level: '',
    institution: '',
    location: '',
    department: 'Science Division',
    grade: 'GPA 5.00',
    description: '',
    highlight: '',
  });

  const openAddModal = () => {
    setEditingItem(null);
    setForm({
      period: '',
      level: '',
      institution: '',
      location: '',
      department: 'Science Division',
      grade: 'GPA 5.00',
      description: '',
      highlight: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({
      period: item.period || '',
      level: item.level || '',
      institution: item.institution || '',
      location: item.location || '',
      department: item.department || 'Science Division',
      grade: item.grade || '',
      description: item.description || '',
      highlight: item.highlight || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg('');

    const token = localStorage.getItem('portfolio_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      if (editingItem) {
        const id = editingItem._id;
        await axios.put(`${API_BASE_URL}/api/education/${id}`, form, { headers });
        setStatusMsg('Education milestone updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/api/education`, form, { headers });
        setStatusMsg('Milestone added to timeline database!');
      }
      await refreshData();
      setModalOpen(false);
    } catch {
      if (editingItem) {
        setEducation((prev) =>
          prev.map((e) => (e._id === editingItem._id ? { ...e, ...form } : e))
        );
        setStatusMsg('Milestone updated locally.');
      } else {
        setEducation((prev) => [...prev, { _id: Date.now().toString(), ...form }]);
        setStatusMsg('Milestone added locally.');
      }
      setModalOpen(false);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this milestone from the timeline?')) return;
    const token = localStorage.getItem('portfolio_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      await axios.delete(`${API_BASE_URL}/api/education/${id}`, { headers });
      await refreshData();
      setStatusMsg('Milestone deleted successfully.');
    } catch {
      setEducation((prev) => prev.filter((e) => e._id !== id));
      setStatusMsg('Milestone removed locally.');
    } finally {
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
            <FiBookOpen className="text-purple-400" />
            <span>Academic Milestones Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Control the academic timeline entries, grades, institutions, and descriptions
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
            <span>Add Milestone</span>
          </button>
        </div>
      </div>

      {/* Milestones List */}
      <div className="flex flex-col gap-5">
        {education.map((item) => (
          <div
            key={item._id || item.institution}
            className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#030712]/95 border border-white/10 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-500/40 transition-all shadow-md group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <FiCalendar className="text-xs" />
                  <span>{item.period}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  <FiAward className="text-xs" />
                  <span>{item.grade}</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                {item.institution}
              </h3>
              <p className="text-sm text-slate-300 font-semibold mt-0.5">{item.level}</p>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <FiMapPin className="text-slate-500" />
                  {item.location}
                </span>
                <span className="text-emerald-400">{"//"} {item.department}</span>
              </div>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-light">{item.description}</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => openEditModal(item)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 transition-colors"
                title="Edit Milestone"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10 transition-colors"
                title="Delete Milestone"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-base font-bold text-white font-mono">
                {editingItem ? 'Edit Milestone' : 'Add Academic Milestone'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Academic Period *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.period}
                    onChange={(e) => setForm({ ...form, period: e.target.value })}
                    placeholder="e.g. 2023 - Present"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Degree / Certificate Level *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    placeholder="e.g. Higher Secondary Certificate (HSC)"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                  Institution Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  placeholder="School or College name"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="City, Country"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="Science Division"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Grade / GPA
                  </label>
                  <input
                    type="text"
                    value={form.grade}
                    onChange={(e) => setForm({ ...form, grade: e.target.value })}
                    placeholder="GPA 5.00"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Key studies, academic focus, highlights..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500 resize-none"
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
                  <span>{editingItem ? 'Save Changes' : 'Add Milestone'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationTab;
