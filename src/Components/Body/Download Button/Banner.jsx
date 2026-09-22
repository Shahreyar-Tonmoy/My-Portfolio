import { useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import { FiDownload, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-scroll";
import pdf from '../../../assets/Md-Mubtashim-Shahreyar-Tonmoy.pdf';
import Hero3DCanvas from "../../Three/Hero3DCanvas";
import { usePortfolio, API_BASE_URL } from "../../../context/PortfolioContext";

const Banner = () => {
  const { profile } = usePortfolio();

  const typeSequence = useMemo(() => {
    const roles = profile?.typewriterRoles?.length
      ? profile.typewriterRoles
      : [
          "Front-End Developer",
          "React.js Specialist",
          "Full-Stack Developer",
          "MERN Stack Engineer",
        ];
    return roles.flatMap((role) => [role, 2400]);
  }, [profile?.typewriterRoles]);

  const resumeHref = profile?.resumeUrl
    ? profile.resumeUrl.startsWith('http')
      ? profile.resumeUrl
      : `${API_BASE_URL}${profile.resumeUrl}`
    : pdf;

  return (
    <section
      id="BannerId"
      className="relative min-h-[calc(100vh-60px)] flex items-center justify-center pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden"
    >
      {/* Background Ambient Radial Glow */}
      

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Introduction, Headline, Typist, Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 mb-6 backdrop-blur-xl shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-medium tracking-wide">
                Available for Full-Stack Opportunities
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Engineering Modern <br />
              <span className="text-gradient-brand">
                Web Experiences
              </span>
            </h1>

            {/* Typewriter Role Line */}
            <div className="mt-4 text-lg sm:text-xl font-medium text-zinc-300 flex items-center gap-2 flex-wrap">
              <span className="text-indigo-400 font-mono font-bold">&gt;</span>
              <span className="text-zinc-400">Specializing as a</span>
              <span className="text-white font-semibold underline decoration-indigo-500/60 decoration-2 underline-offset-4">
                {typeSequence.length > 0 && (
                  <TypeAnimation
                    key={typeSequence.join('-')}
                    sequence={typeSequence}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                )}
              </span>
            </div>

            {/* Concise Bio */}
            <p className="mt-5 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed font-light">
              Hi, I&apos;m <strong className="text-zinc-100 font-medium">{profile?.name || "Shahreyar Tonmoy"}</strong>. {profile?.bio || "I build high-performance React frontends, scalable Node.js/Express APIs, and robust MongoDB architectures with pixel-perfect design and modern web standards."}
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <Link
                to="ProjectsId"
                smooth={true}
                offset={-90}
                duration={600}
                className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-glow-indigo transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Work</span>
                <FiArrowRight className="text-sm transition-transform group-hover:translate-x-0.5" />
              </Link>

              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                download="Md-Mubtashim-Shahreyar-Tonmoy-Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <FiDownload className="text-sm" />
                <span>Resume</span>
              </a>

              <Link
                to="ContactId"
                smooth={true}
                offset={-90}
                duration={600}
                className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <span>Get In Touch</span>
              </Link>
            </div>

            {/* Clean Live Metrics Strip */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {profile?.experienceYears || "01+"}
                </div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">
                  Years Exp.
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {profile?.projectsCount || "12+"}
                </div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">
                  Projects Built
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-indigo-400 font-mono flex items-center gap-1">
                  <span>{profile?.dedicationPct || "100%"}</span>
                  <FiCheckCircle className="text-indigo-400 text-base hidden sm:inline" />
                </div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">
                  Satisfaction
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Animated Developer Portrait Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <Hero3DCanvas />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;