import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  FiPieChart,
  FiUser,
  FiFolder,
  FiCpu,
  FiBookOpen,
  FiMail,
  FiSettings,
  FiExternalLink,
  FiLogOut,
  FiMenu,
  FiX,
  FiRefreshCw,
  FiUserCheck,
} from 'react-icons/fi';
import { API_BASE_URL, usePortfolio } from '../context/PortfolioContext';

// Tab imports
import OverviewTab from './Tabs/OverviewTab';
import ProfileTab from './Tabs/ProfileTab';
import AboutTab from './Tabs/AboutTab';
import ProjectsTab from './Tabs/ProjectsTab';
import SkillsTab from './Tabs/SkillsTab';
import EducationTab from './Tabs/EducationTab';
import MessagesTab from './Tabs/MessagesTab';
import SettingsTab from './Tabs/SettingsTab';

const navItems = [
  { id: 'overview', label: 'Overview', icon: <FiPieChart /> },
  { id: 'profile', label: 'Profile & Hero', icon: <FiUser /> },
  { id: 'about', label: 'About Me', icon: <FiUserCheck /> },
  { id: 'projects', label: 'Projects Manager', icon: <FiFolder /> },
  { id: 'skills', label: 'Skills & Arsenal', icon: <FiCpu /> },
  { id: 'education', label: 'Education Milestones', icon: <FiBookOpen /> },
  { id: 'messages', label: 'Messages Inbox', icon: <FiMail /> },
  { id: 'settings', label: 'ImgBB & Settings', icon: <FiSettings /> },
];

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { serverStatus, refreshData } = usePortfolio();
  const navigate = useNavigate();

  // Auth Guard
  useEffect(() => {
    const token = localStorage.getItem('portfolio_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch unread messages badge count
  const checkMessages = async () => {
    try {
      const token = localStorage.getItem('portfolio_token');
      if (!token) return;
      const res = await axios.get(`${API_BASE_URL}/api/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.data) {
        const unread = res.data.data.filter((m) => !m.isRead).length;
        setUnreadCount(unread);
      }
    } catch {
      // Ignore if offline
    }
  };

  useEffect(() => {
    checkMessages();
    const interval = setInterval(checkMessages, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
    navigate('/admin/login');
  };

  const handleGlobalRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refreshData(), checkMessages()]);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col md:flex-row relative">
      {/* Sidebar Overlay on Mobile */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#060b17] border-r border-white/10 z-50 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-[1px] shadow-glow-emerald">
                <div className="w-full h-full bg-[#030712] rounded-[11px] flex items-center justify-center font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-sm">
                  CP
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-mono">Control Panel</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      serverStatus === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {serverStatus === 'online' ? 'API Online' : 'Local Mode'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white md:hidden"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-mono font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>

                  {item.id === 'messages' && unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-slate-950">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Actions */}
        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 transition-colors"
          >
            <span>View Live Site</span>
            <FiExternalLink className="text-xs text-emerald-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
          >
            <FiLogOut />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#030712]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/10 md:hidden"
            >
              <FiMenu className="text-lg" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white font-mono capitalize">
                {activeTab.replace('-', ' ')}
              </h1>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Master controller for portfolio content &amp; media assets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGlobalRefresh}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-white/10 transition-all flex items-center gap-2 text-xs font-mono cursor-pointer"
              title="Refresh Portfolio Data"
            >
              <FiRefreshCw className={`text-sm ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>

            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-emerald-400">
              admin@active
            </div>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'about' && <AboutTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'skills' && <SkillsTab />}
          {activeTab === 'education' && <EducationTab />}
          {activeTab === 'messages' && <MessagesTab onUpdate={checkMessages} />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
