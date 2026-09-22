import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiLock, FiUser, FiArrowLeft, FiAlertCircle, FiLogIn } from 'react-icons/fi';
import { API_BASE_URL } from '../context/PortfolioContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      if (res.data?.success && res.data.token) {
        localStorage.setItem('portfolio_token', res.data.token);
        localStorage.setItem('portfolio_user', JSON.stringify(res.data.user || { username }));
        navigate('/admin');
      } else {
        setError(res.data?.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || !err.response) {
        setError(
          'Cannot connect to backend server. Please ensure the backend is running on port 5000.'
        );
      } else {
        setError(
          err.response?.data?.message || 'Invalid username or password. Access denied.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 mb-6 transition-colors"
        >
          <FiArrowLeft />
          <span>Return to Portfolio</span>
        </Link>

        {/* Login Card */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#030712]/95 border border-white/10 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl relative">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-[1px] mx-auto mb-4 shadow-glow-emerald">
              <div className="w-full h-full bg-[#030712] rounded-[11px] flex items-center justify-center text-emerald-400 text-xl">
                <FiLock />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white font-mono">
              Control Panel Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Authenticate to manage portfolio content A to Z
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-2">
              <FiAlertCircle className="text-base flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Username or Email
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username or email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 text-white placeholder-slate-600 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-mono outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 text-white placeholder-slate-600 border border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm font-mono outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full py-3.5 px-6 rounded-xl font-mono text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:to-cyan-400 shadow-glow-emerald disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <FiLogIn className="text-base" />
                  <span>Access Control Panel</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
