import { FiFolder, FiCpu, FiBookOpen, FiMail, FiCheckCircle, FiUploadCloud, FiEdit3 } from 'react-icons/fi';
import { usePortfolio } from '../../context/PortfolioContext';

const OverviewTab = ({ setActiveTab }) => {
  const { profile, projects, skills, education, serverStatus } = usePortfolio();

  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-900/40 via-slate-900 to-cyan-900/40 border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            System Control Center
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
            Welcome, {profile.name}
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-2 font-light leading-relaxed">
            This dashboard grants you complete A-to-Z control over all data on your portfolio. Add, edit, or delete projects, update skills, upload media via ImgBB, manage education records, and inspect client messages in real time.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => setActiveTab('projects')}
          className="glass-panel p-5 rounded-xl border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Projects</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <FiFolder />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-white mt-3">{projects.length}</div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1">Active Showcases</div>
        </div>

        <div
          onClick={() => setActiveTab('skills')}
          className="glass-panel p-5 rounded-xl border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Skills</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <FiCpu />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-white mt-3">{skills.length}</div>
          <div className="text-[11px] font-mono text-cyan-400 mt-1">Technologies Listed</div>
        </div>

        <div
          onClick={() => setActiveTab('education')}
          className="glass-panel p-5 rounded-xl border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Education</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <FiBookOpen />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-white mt-3">{education.length}</div>
          <div className="text-[11px] font-mono text-purple-400 mt-1">Milestones Recorded</div>
        </div>

        <div
          onClick={() => setActiveTab('messages')}
          className="glass-panel p-5 rounded-xl border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Client Inbox</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <FiMail />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-white mt-3">Live</div>
          <div className="text-[11px] font-mono text-blue-400 mt-1">Inquiries Stream</div>
        </div>
      </div>

      {/* Quick Action Buttons & Status */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Quick Launchpad */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-mono mb-4 flex items-center gap-2">
              <FiEdit3 className="text-emerald-400" />
              <span>Quick Launchpad</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={() => setActiveTab('projects')}
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-emerald-500/40 transition-all text-left group"
              >
                <div className="text-xs font-mono font-semibold text-white group-hover:text-emerald-400">
                  + Add New Project
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Upload project screenshots via ImgBB &amp; update links
                </div>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 transition-all text-left group"
              >
                <div className="text-xs font-mono font-semibold text-white group-hover:text-cyan-400">
                  + Add New Skill
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Insert technology name, category, and proficiency level
                </div>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-indigo-500/40 transition-all text-left group"
              >
                <div className="text-xs font-mono font-semibold text-white group-hover:text-indigo-400">
                  Edit About Me Section
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Customize Bento narrative, toolchain badges, architectural pillars &amp; stats
                </div>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-purple-500/40 transition-all text-left group"
              >
                <div className="text-xs font-mono font-semibold text-white group-hover:text-purple-400">
                  Edit Hero &amp; Resume PDF
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Modify hero typing roles, PDF CV downloads, and social media URLs
                </div>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-emerald-500/40 transition-all text-left group"
              >
                <div className="text-xs font-mono font-semibold text-white group-hover:text-emerald-400 flex items-center gap-1">
                  <FiUploadCloud />
                  <span>Configure ImgBB API</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Manage image CDN upload key &amp; security credentials
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Server & DB Status */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-mono mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-emerald-400" />
              <span>System Telemetry</span>
            </h3>

            <div className="flex flex-col gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">API Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {serverStatus === 'online' ? 'Connected' : 'Local Standby'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Database Engine</span>
                <span className="text-cyan-400 font-bold">MongoDB &amp; Mongoose</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Image CDN</span>
                <span className="text-yellow-400 font-bold">ImgBB API v1</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Role</span>
                <span className="text-purple-400 font-bold">Full Administrator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
