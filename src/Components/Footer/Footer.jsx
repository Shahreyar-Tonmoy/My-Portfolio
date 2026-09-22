import { FaGithub, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FiArrowUp, FiHeart } from "react-icons/fi";
import { Link } from "react-scroll";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl py-12 text-zinc-400 text-xs overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight">
                Shahreyar<span className="text-indigo-400">.</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-mono border border-indigo-500/20">
                Full-Stack Engineer
              </span>
            </div>
            <p className="mt-1.5 text-zinc-500 flex items-center gap-1">
              Built with <FiHeart className="text-indigo-400 text-xs inline" /> using React, Node.js, Express &amp; MongoDB.
            </p>
            <p className="mt-0.5 text-zinc-600">
              © {currentYear} Shahreyar Tonmoy. All rights reserved.
            </p>
          </div>

          {/* Quick Links Navigation */}
          <div className="flex flex-wrap justify-center gap-5 text-xs font-medium text-zinc-400">
            {[
              { id: "BannerId", label: "Home" },
              { id: "AboutId", label: "About" },
              { id: "SkillsId", label: "Skills" },
              { id: "ProjectsId", label: "Projects" },
              { id: "EducationId", label: "Education" },
              { id: "ContactId", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                offset={-90}
                duration={600}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <a
                href="https://github.com/Shahreyar-Tonmoy"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.06] flex items-center justify-center transition-all"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/shahreyar-tonmoy"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.06] flex items-center justify-center transition-all"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100019141502263"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.06] flex items-center justify-center transition-all"
                title="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/shahreyar.tonmoy/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.06] flex items-center justify-center transition-all"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com/ShahreyarT38896"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.06] flex items-center justify-center transition-all"
                title="Twitter"
              >
                <FaTwitter />
              </a>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-indigo-500/20 text-zinc-300 hover:text-indigo-400 border border-white/[0.08] hover:border-indigo-500/30 flex items-center justify-center transition-all cursor-pointer"
              title="Back to Top"
            >
              <FiArrowUp className="text-xs" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;