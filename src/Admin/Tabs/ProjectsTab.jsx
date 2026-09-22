import { useState } from 'react';
import axios from 'axios';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiGithub,
  FiCheck,
  FiX,
  FiLayers,
  FiImage,
  FiMaximize2,
} from 'react-icons/fi';
import { usePortfolio, API_BASE_URL, resolveAssetUrl } from '../../context/PortfolioContext';
import MultiImageUploader from '../Components/MultiImageUploader';

const ProjectsTab = () => {
  const { projects, setProjects, refreshData } = usePortfolio();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [cardActiveImg, setCardActiveImg] = useState({});
  const [panelLightbox, setPanelLightbox] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'fullstack',
    type: 'Web Application',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    images: [],
    featured: true,
  });

  const openAddModal = () => {
    setEditingProject(null);
    setForm({
      title: '',
      category: 'fullstack',
      type: 'Web Application',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      images: [],
      featured: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title || '',
      category: project.category || 'fullstack',
      type: project.type || 'Web Application',
      description: project.description || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      images: project.images || [],
      featured: project.featured !== undefined ? project.featured : true,
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
      title: form.title,
      category: form.category,
      type: form.type,
      description: form.description,
      technologies: form.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      liveUrl: form.liveUrl,
      githubUrl: form.githubUrl,
      images: form.images,
      featured: form.featured,
    };

    try {
      if (editingProject) {
        const id = editingProject._id || editingProject.id;
        const res = await axios.put(`${API_BASE_URL}/api/projects/${id}`, payload, { headers });
        if (res.data?.success) {
          setStatusMsg('Project updated successfully!');
        }
      } else {
        const res = await axios.post(`${API_BASE_URL}/api/projects`, payload, { headers });
        if (res.data?.success) {
          setStatusMsg('New project created and deployed to database!');
        }
      }
      await refreshData();
      setModalOpen(false);
    } catch {
      // Offline fallback state update
      if (editingProject) {
        setProjects((prev) =>
          prev.map((p) =>
            p._id === editingProject._id || p.id === editingProject.id
              ? { ...p, ...payload }
              : p
          )
        );
        setStatusMsg('Project updated locally.');
      } else {
        const newProj = {
          _id: Date.now().toString(),
          id: Date.now(),
          ...payload,
        };
        setProjects((prev) => [...prev, newProj]);
        setStatusMsg('Project added locally.');
      }
      setModalOpen(false);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this project?')) return;

    const token = localStorage.getItem('portfolio_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      await axios.delete(`${API_BASE_URL}/api/projects/${id}`, { headers });
      await refreshData();
      setStatusMsg('Project deleted successfully.');
    } catch {
      setProjects((prev) => prev.filter((p) => p._id !== id && p.id !== id));
      setStatusMsg('Project removed locally.');
    } finally {
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  return (
    <div className="max-w-6xl">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
            <FiLayers className="text-emerald-400" />
            <span>Projects Showcase Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Control showcase cards, technology tags, live demo URLs, and ImgBB screenshots
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
            className="px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-glow-emerald flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <FiPlus className="text-base" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const projectId = project._id || project.id;
          const projectImages = project.images || [];
          const activeImage = cardActiveImg[projectId] || projectImages[0];
          const hasImages = projectImages.length > 0;

          return (
            <div
              key={projectId}
              className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#030712]/95 border border-white/10 p-5 backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-xl group"
            >
              <div>
                {/* Header preview / Category & Actions */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(project)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 transition-colors cursor-pointer"
                      title="Edit Project"
                    >
                      <FiEdit2 className="text-xs" />
                    </button>
                    <button
                      onClick={() => handleDelete(projectId)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <FiTrash2 className="text-xs" />
                    </button>
                  </div>
                </div>

                {/* Visual Image Showcase on Panel */}
                {hasImages ? (
                  <div className="mb-4">
                    {/* Active Screenshot Preview */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 border border-white/10 group/media">
                      <img
                        src={resolveAssetUrl(activeImage)}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/media:scale-105"
                      />
                      {/* Image count badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-white/10 flex items-center gap-1">
                        <FiImage className="text-xs" />
                        <span>
                          {projectImages.length} {projectImages.length === 1 ? 'Screenshot' : 'Screenshots'}
                        </span>
                      </div>

                      {/* Expand Lightbox Button */}
                      <button
                        type="button"
                        onClick={() => setPanelLightbox(resolveAssetUrl(activeImage))}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/75 hover:bg-black text-white/80 hover:text-white opacity-0 group-hover/media:opacity-100 transition-opacity z-10 cursor-pointer"
                        title="View Full Resolution"
                      >
                        <FiMaximize2 className="text-xs" />
                      </button>
                    </div>

                    {/* All-Images Thumbnail Strip */}
                    {projectImages.length > 1 && (
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-2.5 scrollbar-thin">
                        {projectImages.map((img, imgIdx) => {
                          const isCurrent = img === activeImage;
                          const resolvedThumb = resolveAssetUrl(img);

                          return (
                            <button
                              key={imgIdx}
                              type="button"
                              onClick={() =>
                                setCardActiveImg((prev) => ({ ...prev, [projectId]: img }))
                              }
                              className={`relative flex-shrink-0 w-12 h-9 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                                isCurrent
                                  ? 'border-emerald-400 ring-2 ring-emerald-500/40 scale-105 shadow-sm'
                                  : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                              }`}
                              title={`Preview screenshot #${imgIdx + 1}${imgIdx === 0 ? ' (Cover)' : ''}`}
                            >
                              <img
                                src={resolvedThumb}
                                alt={`Thumbnail ${imgIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {imgIdx === 0 && (
                                <span className="absolute bottom-0 right-0 px-1 rounded-tl text-[8px] font-bold bg-emerald-500 text-black leading-tight">
                                  ★
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-950/60 border border-dashed border-white/10 mb-4 flex flex-col items-center justify-center text-slate-500 text-xs font-mono gap-1.5 group/placeholder">
                    <FiImage className="text-2xl text-slate-600 group-hover/placeholder:text-emerald-400 transition-colors" />
                    <span className="text-[11px]">No Screenshots Attached</span>
                    <button
                      onClick={() => openEditModal(project)}
                      className="mt-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 text-[10px] border border-white/10 transition-colors cursor-pointer"
                    >
                      + Add Screenshots
                    </button>
                  </div>
                )}

                {/* Title & Type */}
                <h3 className="text-lg font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5">{project.type}</div>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {project.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Live App</span>
                    <FiExternalLink />
                  </a>
                ) : (
                  <span className="text-slate-600">No Live URL</span>
                )}

                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <FiGithub />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <span className="text-slate-600">No GitHub</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-bold text-white font-mono">
                {editingProject ? 'Edit Project' : 'Create New Project'}
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
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. BuildSync Hub"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  >
                    <option value="fullstack">Full-Stack Web App</option>
                    <option value="frontend">Frontend &amp; E-Commerce</option>
                    <option value="mern">MERN Stack</option>
                    <option value="mobile">Mobile / Responsive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                  Application Type / Subtitle
                </label>
                <input
                  type="text"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  placeholder="e.g. Building Management System"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe architecture, features, problem solved..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                  Technologies Used (comma-separated)
                </label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  placeholder="React.js, Node.js, Express.js, MongoDB, Tailwind CSS, Stripe"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                    GitHub Repo URL
                  </label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Multi-Image Uploader & Gallery Manager Section */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-col gap-3">
                <MultiImageUploader
                  label="Project Screenshots &amp; Media Gallery"
                  images={form.images}
                  onChange={(newImages) => setForm((prev) => ({ ...prev, images: newImages }))}
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-mono text-xs text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 shadow-glow-emerald disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <FiCheck />
                      <span>{editingProject ? 'Save Changes' : 'Publish Project'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Panel Lightbox Modal for Screenshots */}
      {panelLightbox && (
        <div
          onClick={() => setPanelLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center">
            <button
              onClick={() => setPanelLightbox(null)}
              className="absolute -top-10 right-0 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
            <img
              src={panelLightbox}
              alt="Screenshot Full View"
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;
