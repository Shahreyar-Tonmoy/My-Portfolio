import { useState, useRef } from 'react';
import axios from 'axios';
import {
  FiUploadCloud,
  FiTrash2,
  FiStar,
  FiArrowLeft,
  FiArrowRight,
  FiLink,
  FiCopy,
  FiCheck,
  FiAlertCircle,
  FiMaximize2,
  FiX,
} from 'react-icons/fi';
import { API_BASE_URL, resolveAssetUrl } from '../../context/PortfolioContext';

const MultiImageUploader = ({
  images = [],
  onChange,
  label = 'Project Screenshots & Media Gallery',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0, currentName: '' });
  const [urlInput, setUrlInput] = useState('');
  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Helper to trigger onChange safely
  const updateImages = (newImages) => {
    if (onChange) {
      onChange(newImages);
    }
  };

  // Upload a single file either via backend server or direct ImgBB fallback
  const uploadSingleImage = async (file, token, apiKey) => {
    const formData = new FormData();
    formData.append('image', file);

    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (apiKey) headers['x-imgbb-key'] = apiKey;

    // 1. Try Backend API
    try {
      const res = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers,
        timeout: 45000,
      });

      if (res.data?.success && res.data.data?.url) {
        return res.data.data.url;
      }
    } catch (backendErr) {
      console.warn(`Backend upload failed for ${file.name}:`, backendErr.message);

      // 2. Direct ImgBB fallback if API key exists
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
            return directRes.data.data.url;
          }
        } catch (directErr) {
          console.error(`Direct ImgBB upload failed for ${file.name}:`, directErr);
        }
      }

      throw backendErr;
    }
    throw new Error(`Upload failed for ${file.name}`);
  };

  // Handle multiple file selection (batch upload)
  const handleFilesSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    // Validate files
    const validImageFiles = [];
    for (const file of selectedFiles) {
      if (!file.type.startsWith('image/')) {
        setError(`"${file.name}" is not a valid image file. Skipped.`);
        continue;
      }
      if (file.size > 15 * 1024 * 1024) {
        setError(`"${file.name}" exceeds the 15MB size limit. Skipped.`);
        continue;
      }
      validImageFiles.push(file);
    }

    if (validImageFiles.length === 0) return;

    setError('');
    setIsUploading(true);
    setUploadProgress({ current: 0, total: validImageFiles.length, currentName: '' });

    const token = localStorage.getItem('portfolio_token');
    const apiKey = localStorage.getItem('portfolio_imgbb_key') || '';

    const uploadedUrls = [];
    let failureCount = 0;

    for (let i = 0; i < validImageFiles.length; i++) {
      const file = validImageFiles[i];
      setUploadProgress({
        current: i + 1,
        total: validImageFiles.length,
        currentName: file.name,
      });

      try {
        const url = await uploadSingleImage(file, token, apiKey);
        if (url) {
          uploadedUrls.push(url);
        }
      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err);
        failureCount++;
      }
    }

    if (uploadedUrls.length > 0) {
      updateImages([...images, ...uploadedUrls]);
    }

    if (failureCount > 0) {
      setError(
        `${failureCount} of ${validImageFiles.length} images failed to upload. Check your connection or backend server.`
      );
    }

    setIsUploading(false);
    setUploadProgress({ current: 0, total: 0, currentName: '' });

    // Reset input so same files can be re-selected if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add multiple image URLs (comma-separated or newline-separated)
  const handleAddUrls = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const urls = urlInput
      .split(/[\n,]+/)
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    if (urls.length > 0) {
      updateImages([...images, ...urls]);
      setUrlInput('');
      setUrlInputOpen(false);
      setError('');
    }
  };

  // Remove an image at specific index
  const handleRemoveImage = (indexToRemove) => {
    updateImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  // Set an image as cover (move to index 0)
  const handleSetCover = (index) => {
    if (index === 0) return;
    const target = images[index];
    const remaining = images.filter((_, idx) => idx !== index);
    updateImages([target, ...remaining]);
  };

  // Move image position
  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    updateImages(newImages);
  };

  // Copy image URL
  const handleCopyUrl = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Label and Actions Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {images.length} {images.length === 1 ? 'Image' : 'Images'} Attached
          </span>
          <button
            type="button"
            onClick={() => setUrlInputOpen(!urlInputOpen)}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <FiLink className="text-xs" />
            <span>{urlInputOpen ? 'Hide URL Input' : 'Paste URLs'}</span>
          </button>
        </div>
      </div>

      {/* Paste URLs Bar */}
      {urlInputOpen && (
        <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-500/30 flex flex-col gap-2">
          <label className="text-[11px] font-mono text-slate-400">
            Paste one or multiple image URLs (separated by comma or new line):
          </label>
          <textarea
            rows={2}
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://i.ibb.co/example1.png&#10;https://i.ibb.co/example2.png"
            className="w-full px-3 py-2 rounded-lg bg-slate-900 text-white placeholder-slate-600 border border-white/10 focus:border-indigo-500 text-xs font-mono outline-none resize-none"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setUrlInputOpen(false)}
              className="px-3 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddUrls}
              disabled={!urlInput.trim()}
              className="px-3.5 py-1 rounded-lg text-xs font-mono font-medium text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 transition-colors cursor-pointer"
            >
              Add Images
            </button>
          </div>
        </div>
      )}

      {/* Multi-File Upload Dropzone */}
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[130px] ${
          isUploading
            ? 'border-indigo-500 bg-indigo-500/10 cursor-wait'
            : 'border-white/15 hover:border-emerald-400/60 bg-slate-950/60 hover:bg-slate-900/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFilesSelect}
          disabled={isUploading}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-3 max-w-sm w-full">
            <div className="w-9 h-9 border-3 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            <div className="w-full text-center">
              <div className="text-xs font-mono font-semibold text-indigo-300">
                Uploading {uploadProgress.current} of {uploadProgress.total}...
              </div>
              <div className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                {uploadProgress.currentName}
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
                  style={{
                    width: `${
                      uploadProgress.total > 0
                        ? (uploadProgress.current / uploadProgress.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-200">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1">
              <FiUploadCloud className="text-2xl" />
            </div>
            <span className="text-xs font-semibold text-white">
              Click or drag multiple screenshots to upload
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Select multiple files simultaneously (PNG, JPG, WebP up to 15MB each)
            </span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-xs font-mono text-rose-400 flex items-center gap-1.5 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
          <FiAlertCircle className="flex-shrink-0 text-sm" />
          <span>{error}</span>
        </div>
      )}

      {/* Gallery of Attached Images */}
      {images.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span>Attached Screenshots (drag or use arrows to reorder, star for cover):</span>
            <button
              type="button"
              onClick={() => updateImages([])}
              className="text-rose-400 hover:text-rose-300 hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((imgUrl, idx) => {
              const isCover = idx === 0;
              const resolvedSrc = resolveAssetUrl(imgUrl);

              return (
                <div
                  key={idx}
                  className={`relative rounded-xl overflow-hidden border transition-all flex flex-col bg-slate-950 ${
                    isCover
                      ? 'border-emerald-500 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 group">
                    <img
                      src={resolvedSrc}
                      alt={`Screenshot #${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 z-10">
                      {isCover ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500 text-black flex items-center gap-0.5 shadow-sm">
                          <FiStar className="text-[10px] fill-black" />
                          <span>COVER</span>
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/75 backdrop-blur-md text-slate-300 border border-white/10">
                          #{idx + 1}
                        </span>
                      )}
                    </div>

                    {/* Quick Lightbox / Fullscreen Button */}
                    <button
                      type="button"
                      onClick={() => setLightboxImg(resolvedSrc)}
                      className="absolute top-1.5 right-1.5 p-1 rounded bg-black/70 hover:bg-black text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                      title="View Full Size"
                    >
                      <FiMaximize2 className="text-xs" />
                    </button>
                  </div>

                  {/* Action Bar Beneath Thumbnail */}
                  <div className="p-1.5 bg-slate-900/90 border-t border-white/10 flex items-center justify-between text-xs">
                    {/* Left & Right Reorder */}
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, -1)}
                        className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Move Left"
                      >
                        <FiArrowLeft className="text-[11px]" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === images.length - 1}
                        onClick={() => handleMove(idx, 1)}
                        className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Move Right"
                      >
                        <FiArrowRight className="text-[11px]" />
                      </button>
                    </div>

                    {/* Star / Set Cover */}
                    {!isCover && (
                      <button
                        type="button"
                        onClick={() => handleSetCover(idx)}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-0.5 cursor-pointer transition-colors"
                        title="Set as Cover Image"
                      >
                        <FiStar className="text-[10px]" />
                        <span>Set Cover</span>
                      </button>
                    )}

                    {/* Copy & Delete */}
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(imgUrl, idx)}
                        className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Copy Image URL"
                      >
                        {copiedIndex === idx ? (
                          <FiCheck className="text-[11px] text-emerald-400" />
                        ) : (
                          <FiCopy className="text-[11px]" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Remove Image"
                      >
                        <FiTrash2 className="text-[11px]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-10 right-0 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <FiX className="text-xl" />
            </button>
            <img
              src={lightboxImg}
              alt="Full Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiImageUploader;
