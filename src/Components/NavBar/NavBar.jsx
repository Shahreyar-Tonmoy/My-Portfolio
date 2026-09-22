import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSend, FiLock } from "react-icons/fi";

const navLinks = [
  { name: "Home", to: "BannerId" },
  { name: "About", to: "AboutId" },
  { name: "Skills", to: "SkillsId" },
  { name: "Projects", to: "ProjectsId" },
  { name: "Education", to: "EducationId" },
  { name: "Contact", to: "ContactId" },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Floating Capsule Bar Container */}
        <div className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/60">
          
          {/* Brand Monogram */}
          <Link
            to="BannerId"
            smooth={true}
            duration={600}
            className="cursor-pointer flex items-center gap-2 group select-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 p-[1px] shadow-glow-indigo">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white tracking-wider">ST</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                Shahreyar<span className="text-indigo-400">.</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-90}
                duration={600}
                activeClass="!text-white !bg-white/10 !border-white/15 shadow-sm"
                className="px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white rounded-full transition-all cursor-pointer border border-transparent hover:bg-white/[0.04]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs & Admin Shortcut */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="ContactId"
              smooth={true}
              offset={-90}
              duration={600}
              className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-all shadow-sm active:scale-95"
            >
              <span>Let&apos;s Talk</span>
              <FiSend className="text-[11px]" />
            </Link>

            <RouterLink
              to="/admin"
              className="p-2 rounded-full text-zinc-400 hover:text-indigo-400 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
              title="Admin Control Panel"
            >
              <FiLock className="text-xs" />
            </RouterLink>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <RouterLink
              to="/admin"
              className="p-2 rounded-full text-zinc-400 hover:text-indigo-400 bg-white/[0.04] border border-white/[0.06]"
              title="Admin Control Panel"
            >
              <FiLock className="text-xs" />
            </RouterLink>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-1.5 text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              {mobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenuAlt3 className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto px-5 py-4 rounded-3xl bg-zinc-950/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl transition-all">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-90}
                duration={600}
                onClick={() => setMobileMenuOpen(false)}
                activeClass="!text-white !bg-white/10"
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/[0.08] mt-1">
              <Link
                to="ContactId"
                smooth={true}
                offset={-90}
                duration={600}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-all cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
                <FiSend />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;