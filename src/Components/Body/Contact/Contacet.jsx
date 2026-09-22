import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from "react-toastify";
import confetti from 'canvas-confetti';
import 'react-toastify/dist/ReactToastify.css';
import { FiMail, FiMapPin, FiSend, FiCopy, FiCheck, FiMessageSquare } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import TiltCard from '../../UI/TiltCard';
import { usePortfolio } from '../../../context/PortfolioContext';

const Contacet = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const { profile, submitMessage } = usePortfolio();

  const emailAddress = profile?.email || "Shahreyartonmoy001@gmail.com";
  const locationText = profile?.location || "Joypurhat, Bangladesh";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#8b5cf6', '#38bdf8'],
    });

    toast.info("Email copied to clipboard!", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark",
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(form.current);
    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const message = formData.get("message");

    // Dual-dispatch: save directly to MongoDB for Admin Inbox
    let dbSuccess = false;
    if (submitMessage) {
      try {
        const res = await submitMessage({ name, email, message });
        if (res && res.success) {
          dbSuccess = true;
        }
      } catch (err) {
        console.warn("Backend database save notice:", err);
      }
    }

    try {
      const result = await emailjs.sendForm(
        'service_18kdnie',
        'template_bgdj52b',
        form.current,
        'KqlZhLOzX3bDSGTGy'
      );

      if (result.text === "OK" || result.status === 200) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#8b5cf6', '#38bdf8'],
        });

        toast.success("Thank you! Your message was transmitted successfully.", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
        e.target.reset();
      }
    } catch (error) {
      console.warn("EmailJS Service Notice:", error.text || error.message);

      if (dbSuccess) {
        // Message safely received and stored in database Admin Inbox
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#8b5cf6', '#38bdf8'],
        });

        toast.success("Message received! Your message is safely stored in the portfolio Admin Inbox.", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
        e.target.reset();
      } else {
        toast.error("Transmission failed. Please email directly to: " + emailAddress, {
          position: "top-right",
          autoClose: 6000,
          theme: "dark",
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="ContactId" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-medium mb-3">
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Initiate <span className="text-gradient-brand">Collaboration</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-lg mx-auto text-sm sm:text-base font-light">
            Have a project, engineering role, or idea you&apos;d like to discuss? Drop a message and let&apos;s build it together.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <TiltCard maxTilt={5} scale={1.01}>
              <div className="rounded-3xl bg-zinc-900/40 border border-white/[0.08] p-7 sm:p-8 backdrop-blur-xl shadow-subtle">
                
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <FiMessageSquare className="text-indigo-400" />
                  <span>Let&apos;s Connect</span>
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                  Available for full-time engineering positions, freelance software contracts, and innovative web application builds.
                </p>

                {/* Email Copy Card */}
                <div className="mt-6 p-3.5 rounded-2xl bg-zinc-950/60 border border-white/[0.06] flex items-center justify-between gap-3 group hover:border-indigo-500/30 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                      <FiMail className="text-base" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Email Address</div>
                      <div className="text-xs sm:text-sm font-mono text-zinc-200 truncate">{emailAddress}</div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-indigo-500/20 text-zinc-300 hover:text-indigo-300 border border-white/[0.06] transition-all flex-shrink-0"
                    title="Copy Email"
                  >
                    {copied ? <FiCheck className="text-indigo-400 text-sm" /> : <FiCopy className="text-sm" />}
                  </button>
                </div>

                {/* Location Card */}
                <div className="mt-3.5 p-3.5 rounded-2xl bg-zinc-950/60 border border-white/[0.06] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-base" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Location</div>
                    <div className="text-xs sm:text-sm font-medium text-zinc-200">{locationText}</div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="mt-7 pt-5 border-t border-white/[0.08]">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                    {"//"} Online Channels
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { icon: <FaGithub />, link: profile?.socials?.github || "https://github.com/Shahreyar-Tonmoy", name: "GitHub" },
                      { icon: <FaLinkedin />, link: profile?.socials?.linkedin || "https://www.linkedin.com/in/shahreyar-tonmoy", name: "LinkedIn" },
                      { icon: <FaFacebook />, link: profile?.socials?.facebook || "https://www.facebook.com/profile.php?id=100019141502263", name: "Facebook" },
                      { icon: <FaInstagram />, link: profile?.socials?.instagram || "https://www.instagram.com/shahreyar.tonmoy/", name: "Instagram" },
                      { icon: <FaTwitter />, link: profile?.socials?.twitter || "https://twitter.com/ShahreyarT38896", name: "Twitter" },
                    ].map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.06] hover:border-indigo-500/30 text-xs flex items-center gap-1.5 transition-all hover:scale-105"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </TiltCard>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <TiltCard maxTilt={5} scale={1.01}>
              <div className="rounded-3xl bg-zinc-900/40 border border-white/[0.08] p-7 sm:p-9 backdrop-blur-xl shadow-subtle">
                
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-light">
                  Please provide your contact details and message below.
                </p>

                <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Your Name <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        required
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/70 text-white placeholder-zinc-500 border border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Your Email <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/70 text-white placeholder-zinc-500 border border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Your Message <span className="text-indigo-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="Hi Shahreyar, I'd like to discuss an opportunity..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/70 text-white placeholder-zinc-500 border border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm outline-none resize-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-glow-indigo disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Transmission...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <FiSend className="text-sm" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

              </div>
            </TiltCard>
          </div>

        </div>

      </div>

      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </section>
  );
};

export default Contacet;