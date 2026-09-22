import { useState, useRef } from 'react';
import axios from 'axios';
import { FiCheck, FiCopy, FiAlertCircle, FiFileText, FiExternalLink, FiDownload } from 'react-icons/fi';
import { API_BASE_URL } from '../../context/PortfolioContext';

const PdfUploader = ({ onUploadSuccess, currentPdf = '', label = 'Upload Resume / CV (PDF Format)' }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(currentPdf);
  const [filename, setFilename] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate PDF format
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setError('Invalid file format. Please select a valid PDF document (.pdf).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError('File size exceeds 25MB limit.');
      return;
    }

    setError('');
    setIsUploading(true);
    setFilename(file.name);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const token = localStorage.getItem('portfolio_token');
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await axios.post(`${API_BASE_URL}/api/upload/pdf`, formData, {
        headers,
        timeout: 45000,
      });

      if (res.data?.success && res.data.data?.url) {
        const uploadedUrl = res.data.data.url;
        setPdfUrl(uploadedUrl);
        setFilename(res.data.data.filename || file.name);
        if (onUploadSuccess) {
          onUploadSuccess(uploadedUrl);
        }
      } else {
        throw new Error(res.data?.message || 'PDF upload failed');
      }
    } catch (err) {
      console.error('PDF Upload Error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to upload PDF file to server.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = () => {
    if (!pdfUrl) return;
    navigator.clipboard.writeText(pdfUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
        {label}
      </label>

      <div className="flex flex-col gap-3">
        {/* Upload Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`w-full border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[120px] ${
            isUploading
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-white/10 hover:border-indigo-500/50 bg-slate-900/60 hover:bg-slate-900/90'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-indigo-300">Uploading PDF Document to server...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-200">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-2xl">
                <FiFileText />
              </div>
              <div>
                <span className="text-xs font-semibold text-white">Click or drag &amp; drop your Resume / CV PDF</span>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                  Accepts PDF documents up to 25MB (automatically served to download buttons)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Current Uploaded PDF Information Card */}
        {pdfUrl && (
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0">
                <FiFileText className="text-base" />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
                    {filename || 'Active Resume / CV (PDF)'}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 truncate max-w-[240px] sm:max-w-md">
                  {pdfUrl}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center gap-1.5 transition-colors"
                title="Preview PDF"
              >
                <FiExternalLink className="text-xs" />
                <span>Preview</span>
              </a>

              <a
                href={pdfUrl}
                download
                className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-400 border border-white/10"
                title="Download PDF"
              >
                <FiDownload className="text-xs" />
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-white/10"
                title="Copy PDF URL"
              >
                {copied ? <FiCheck className="text-emerald-400 text-xs" /> : <FiCopy className="text-xs" />}
              </button>
            </div>
          </div>
        )}
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

export default PdfUploader;
