import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FiMail, FiTrash2, FiClock, FiCornerUpLeft } from 'react-icons/fi';
import { API_BASE_URL } from '../../context/PortfolioContext';

const MessagesTab = ({ onUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('portfolio_token');
      if (!token) return;
      const res = await axios.get(`${API_BASE_URL}/api/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.data) {
        setMessages(res.data.data);
      }
    } catch {
      // Fallback empty
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const toggleRead = async (id, currentStatus) => {
    const token = localStorage.getItem('portfolio_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      await axios.patch(
        `${API_BASE_URL}/api/messages/${id}/read`,
        { isRead: !currentStatus },
        { headers }
      );
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead: !currentStatus } : m))
      );
      if (onUpdate) onUpdate();
    } catch {
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead: !currentStatus } : m))
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    const token = localStorage.getItem('portfolio_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      await axios.delete(`${API_BASE_URL}/api/messages/${id}`, { headers });
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (onUpdate) onUpdate();
    } catch {
      setMessages((prev) => prev.filter((m) => m._id !== id));
    }
  };

  const filtered =
    filter === 'unread' ? messages.filter((m) => !m.isRead) : messages;

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
            <FiMail className="text-blue-400" />
            <span>Client Dispatches &amp; Messages Inbox</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Direct transmissions sent through your portfolio contact portal
          </p>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'unread'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Unread ({messages.filter((m) => !m.isRead).length})
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      {isLoading ? (
        <div className="p-12 text-center text-xs font-mono text-slate-500">
          Loading dispatches...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/50 border border-white/10 text-center">
          <FiMail className="text-4xl text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-mono font-bold text-slate-300">No Dispatches Found</h3>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            New contact submissions will be stored here in real time.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((msg) => (
            <div
              key={msg._id}
              className={`rounded-2xl border p-6 backdrop-blur-xl transition-all ${
                msg.isRead
                  ? 'bg-slate-900/50 border-white/5 opacity-80'
                  : 'bg-slate-900/90 border-emerald-500/40 shadow-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs border border-emerald-500/20">
                    {msg.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">{msg.name}</h4>
                    <span className="text-xs text-cyan-400 font-mono">{msg.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <FiClock />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => toggleRead(msg._id, msg.isRead)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-colors ${
                      msg.isRead
                        ? 'bg-slate-800 text-slate-400 border-white/10 hover:text-white'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                  </button>

                  <a
                    href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry`}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-white/10"
                    title="Reply via Email"
                  >
                    <FiCornerUpLeft className="text-xs" />
                  </a>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10"
                    title="Delete Message"
                  >
                    <FiTrash2 className="text-xs" />
                  </button>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-white/5 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesTab;
