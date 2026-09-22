import { useState, useRef } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiCheck, FiCopy, FiAlertCircle, FiLink } from 'react-icons/fi';
import { API_BASE_URL, resolveAssetUrl } from '../../context/PortfolioContext';

const ImageUploader = ({ onUploadSuccess, currentImage = '', label = 'Upload Image (ImgBB)' }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const [copied, setCopied] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WebP, GIF)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size exceeds 10MB limit.');
      return;
    }

    setError('');
    setIsUploading(true);

    // Create instant local preview while uploading
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    const token = localStorage.getItem('portfolio_token');
    const apiKey = localStorage.getItem('portfolio_imgbb_key') || '';

    // Step 1: Try uploading via backend server API
    try {
      const formData = new FormData();
      formData.append('image', file);

      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (apiKey) headers['x-imgbb-key'] = apiKey;

      const res = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers,
        timeout: 45000,
      });

      if (res.data?.success && res.data.data?.url) {
        const uploadedUrl = res.data.data.url;
        setPreview(uploadedUrl);
        if (onUploadSuccess) {
          onUploadSuccess(uploadedUrl);
        }
        setIsUploading(false);
        return;
      }
    } catch (backendErr) {
      console.warn('Backend upload attempt failed:', backendErr.message);

      // Step 2: If backend is offline or failed, attempt direct client upload to ImgBB
      if (apiKey) {
        try {
          const directForm = new FormData();
          directForm.append('image', file);

          const directRes = await axios.post(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            directForm,
            { timeout: 35000 }
          );

          if (directRes.data?.success && directRes.data.data?.url) {
            const imgbbUrl = directRes.data.data.url;
            setPreview(imgbbUrl);
            if (onUploadSuccess) {
              onUploadSuccess(imgbbUrl);
            }
            setIsUploading(false);
            return;
          }
        } catch (directErr) {
          console.error('Direct ImgBB upload error:', directErr);
        }
      }

      // Step 3: Provide friendly diagnostic message
      if (backendErr.code === 'ERR_NETWORK' || !backendErr.response) {
        setError(
          'Backend server is offline (connection refused to http://localhost:5000). Please ensure your backend is running with "npm run server" in a terminal, or set your ImgBB API key in Settings.'
        );
      } else {
        setError(
          backendErr.response?.data?.message ||
            'Upload failed. Please ensure the backend server is running or add your ImgBB API key in Settings.'
        );
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleManualApply = (e) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;
    const url = manualUrl.trim();
    setPreview(url);
    if (onUploadSuccess) {
      onUploadSuccess(url);
    }
    setManualUrl('');
    setError('');
  };

  const handleCopy = () => {
    if (!preview) return;
    navigator.clipboard.writeText(preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Upload Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 w-full border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[120px] ${
            isUploading
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-white/10 hover:border-emerald-500/50 bg-slate-900/60 hover:bg-slate-900/90'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-emerald-400">Uploading to ImgBB CDN...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-200">
              <FiUploadCloud className="text-3xl text-emerald-400" />
              <span className="text-xs font-semibold">Click or drag image to upload</span>
              <span className="text-[10px] font-mono text-slate-500">
                Directly hosted via ImgBB API (PNG, JPG, WebP up to 10MB)
              </span>
            </div>
          )}
        </div>

        {/* Preview & Direct URL */}
        {preview && (
          <div className="w-full sm:w-44 flex flex-col gap-2">
            <div className="relative w-full h-24 rounded-xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center">
              <img
                src={resolveAssetUrl(preview)}
                alt="Preview"
                className="w-full h-full object-contain p-1"
              />
            </div>

            <div className="flex items-center gap-1">
              <input
                type="text"
                readOnly
                value={preview}
                className="flex-1 px-2 py-1 text-[10px] font-mono bg-slate-950 text-slate-400 rounded border border-white/10 truncate"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-white/10 cursor-pointer"
                title="Copy Image URL"
              >
                {copied ? <FiCheck className="text-emerald-400 text-xs" /> : <FiCopy className="text-xs" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Direct URL Input Option */}
      <div className="mt-3 flex items-center gap-2">
        <div className="relative flex-1">
          <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          <input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="Or paste direct image link (e.g. https://i.ibb.co/...)"
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 text-white placeholder-slate-600 border border-white/10 focus:border-indigo-500 text-xs font-mono outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleManualApply}
          className="px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white font-mono text-xs transition-colors cursor-pointer"
        >
          Apply Link
        </button>
      </div>

      {error && (
        <div className="mt-2 text-xs font-mono text-rose-400 flex items-center gap-1">
          <FiAlertCircle className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
