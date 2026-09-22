import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSave, FiLock, FiUploadCloud, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { API_BASE_URL } from '../../context/PortfolioContext';
import ImageUploader from '../Components/ImageUploader';

const SettingsTab = () => {
  const [imgbbKey, setImgbbKey] = useState('');
  const [keySaved, setKeySaved] = useState(false);
  const [testImageUrl, setTestImageUrl] = useState('');

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    // Load existing key from localStorage or backend
    const localKey = localStorage.getItem('portfolio_imgbb_key');
    if (localKey) setImgbbKey(localKey);

    const fetchSetting = async () => {
      try {
        const token = localStorage.getItem('portfolio_token');
        if (!token) return;
        const res = await axios.get(`${API_BASE_URL}/api/settings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.data?.imgbb_api_key) {
          setImgbbKey(res.data.data.imgbb_api_key);
          localStorage.setItem('portfolio_imgbb_key', res.data.data.imgbb_api_key);
        }
      } catch {
        // Fallback ignore
      }
    };
    fetchSetting();
  }, []);

  const handleSaveImgbbKey = async (e) => {
    e.preventDefault();
    localStorage.setItem('portfolio_imgbb_key', imgbbKey.trim());

    try {
      const token = localStorage.getItem('portfolio_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.put(
        `${API_BASE_URL}/api/settings`,
        { key: 'imgbb_api_key', value: imgbbKey.trim() },
        { headers }
      );
    } catch {
      // Ignored if offline
    }

    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 3000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const token = localStorage.getItem('portfolio_token');
      const res = await axios.put(
        `${API_BASE_URL}/api/auth/password`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.success) {
        setPasswordMsg({ type: 'success', text: 'Admin password changed successfully!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPasswordMsg({ type: 'error', text: res.data?.message || 'Password change failed' });
      }
    } catch (err) {
      setPasswordMsg({
        type: 'error',
        text: err.response?.data?.message || 'Error updating password',
      });
    } finally {
      setIsUpdatingPassword(false);
      setTimeout(() => setPasswordMsg({ type: '', text: '' }), 5000);
    }
  };

  return (
    <div className="max-w-4xl flex flex-col gap-8">
      {/* ImgBB Configuration Card */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#030712]/95 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <FiUploadCloud className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-mono">
              ImgBB API Integration Settings
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Get a free API key from{' '}
              <a
                href="https://api.imgbb.com/"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 underline"
              >
                api.imgbb.com
              </a>{' '}
              to upload images to ImgBB CDN
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveImgbbKey} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              ImgBB API Key
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={imgbbKey}
                onChange={(e) => setImgbbKey(e.target.value)}
                placeholder="e.g. 7c9d09f6b92a2a01cb29837bf32d1e9f"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-950 text-white placeholder-slate-600 border border-white/10 text-xs font-mono outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 shadow-glow-cyan flex items-center justify-center gap-2 cursor-pointer transition-all flex-shrink-0"
              >
                {keySaved ? <FiCheck /> : <FiSave />}
                <span>{keySaved ? 'Key Saved' : 'Save ImgBB Key'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Live ImgBB Test Uploader Tool */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
            {"//"} Test ImgBB API Live Uploader
          </h4>
          <ImageUploader
            label="Upload an image to verify your ImgBB configuration:"
            currentImage={testImageUrl}
            onUploadSuccess={(url) => setTestImageUrl(url)}
          />
        </div>
      </div>

      {/* Admin Password Change Card */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#030712]/95 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <FiLock className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-mono">
              Admin Access &amp; Password
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Update credentials for accessing the control panel
            </p>
          </div>
        </div>

        {passwordMsg.text && (
          <div
            className={`mb-6 p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 ${
              passwordMsg.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}
          >
            {passwordMsg.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
            <span>{passwordMsg.text}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
              }
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 text-white border border-white/10 text-xs font-mono outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="px-6 py-3 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 shadow-glow-emerald disabled:opacity-50 flex items-center gap-2 cursor-pointer transition-all"
            >
              <FiLock />
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsTab;
