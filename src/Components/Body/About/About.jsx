import { FaGithub, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FiMail, FiMapPin, FiLayers, FiZap, FiServer } from "react-icons/fi";
import { usePortfolio, resolveAssetUrl } from '../../../context/PortfolioContext';

const About = () => {
  const { profile } = usePortfolio();

  const profileImg = resolveAssetUrl(profile?.profileImage,);
  const focusList = profile?.focusAreas?.length
    ? profile.focusAreas
    : [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "REST APIs",
        "JWT Auth",
        "Firebase",
      ];

  const socials = [
    { icon: <FaGithub />, link: profile?.socials?.github || profile?.socialLinks?.github || "https://github.com/Shahreyar-Tonmoy", label: "GitHub" },
    { icon: <FaLinkedin />, link: profile?.socials?.linkedin || profile?.socialLinks?.linkedin || "https://www.linkedin.com/in/shahreyar-tonmoy", label: "LinkedIn" },
    { icon: <FaFacebook />, link: profile?.socials?.facebook || profile?.socialLinks?.facebook || "https://www.facebook.com/profile.php?id=100019141502263", label: "Facebook" },
    { icon: <FaInstagram />, link: profile?.socials?.instagram || profile?.socialLinks?.instagram || "https://www.instagram.com/shahreyar.tonmoy/", label: "Instagram" },
    { icon: <FaTwitter />, link: profile?.socials?.twitter || profile?.socialLinks?.twitter || "https://twitter.com/ShahreyarT38896", label: "Twitter" },
  ];

  return (
    <section id="AboutId" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-medium mb-3">
            <span>{profile?.aboutBadge || "About Me"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {profile?.aboutHeading ? (
              profile.aboutHeading
            ) : (
              <>
                Engineering with <span className="text-gradient-brand">Purpose &amp; Precision</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-light">
            {profile?.aboutSubheading ||
              "Bridging front-end artistry with robust full-stack architecture to build seamless digital applications."}
          </p>
        </div>

        {/* Modern Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Bento Tile 1: Profile Story & Identity (7 cols) */}
          <div className="md:col-span-7 rounded-3xl bg-zinc-900/40 backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between hover:border-white/15 transition-all shadow-subtle group">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 bg-zinc-950">
                <img
                  src={profileImg}
                  alt={profile?.name || "Shahreyar Tonmoy"}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-1.5">
                  {profile?.aboutRoleBadge || "Front-End & Full-Stack"}
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {profile?.name || "Shahreyar Tonmoy"}
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  {profile?.title || "React.js & Node.js Developer"}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-zinc-300 leading-relaxed font-light">
              {profile?.aboutStory ||
                profile?.bio ||
                "I'm a dedicated Full-Stack developer with a passion for designing fast, responsive, and intuitive web solutions. With expertise across React.js, modern JavaScript, Node.js, and MongoDB, I engineer end-to-end web products that prioritize clean code, performance, and user satisfaction."}
            </p>

            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <FiMapPin className="text-indigo-400 text-sm" />
                <span>{profile?.location || "Joypurhat, Bangladesh"}</span>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-2">
                {socials.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.06] flex items-center justify-center text-xs transition-all hover:scale-105"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Tile 2: Engineering Strengths (5 cols) */}
          <div className="md:col-span-5 rounded-3xl bg-zinc-900/40 backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between hover:border-white/15 transition-all shadow-subtle">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-3">
                {"//"} Core Philosophy
              </div>
              <h4 className="text-xl font-bold text-white tracking-tight mb-4">
                Architectural Standards
              </h4>

              <div className="space-y-4">
                {(profile?.philosophyPillars && profile.philosophyPillars.length > 0
                  ? profile.philosophyPillars
                  : [
                      {
                        title: 'Component Architecture',
                        description:
                          'Composable, reusable React components with optimized render cycles and clean state flow.',
                        icon: 'layers',
                      },
                      {
                        title: 'Scalable REST APIs',
                        description:
                          'Structured Node.js & Express routing, JWT security, and MongoDB schema design.',
                        icon: 'server',
                      },
                      {
                        title: 'Performance & A11y',
                        description:
                          'Fluid responsive designs, high Core Web Vitals, and accessible semantic markup.',
                        icon: 'zap',
                      },
                    ]
                ).map((pillar, pIdx) => {
                  const icons = [
                    <FiLayers key="l" className="text-sm" />,
                    <FiServer key="s" className="text-sm" />,
                    <FiZap key="z" className="text-sm" />,
                  ];
                  const colors = [
                    'bg-indigo-500/10 text-indigo-400',
                    'bg-violet-500/10 text-violet-400',
                    'bg-cyan-500/10 text-cyan-400',
                  ];
                  return (
                    <div key={pIdx} className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl ${colors[pIdx % colors.length]} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        {icons[pIdx % icons.length]}
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-zinc-200">{pillar.title}</h5>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bento Tile 3: Key Metrics (4 cols) */}
          <div className="md:col-span-4 rounded-3xl bg-zinc-900/40 backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between hover:border-white/15 transition-all shadow-subtle">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
              Track Record
            </div>
            
            <div className="grid grid-cols-2 gap-4 my-auto py-2">
              <div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  {profile?.experienceYears || "01+"}
                </div>
                <div className="text-xs text-zinc-400 mt-1">Years Active</div>
              </div>

              <div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  {profile?.projectsCount || "12+"}
                </div>
                <div className="text-xs text-zinc-400 mt-1">Shipped Apps</div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
              <span>Client Commitment</span>
              <span className="font-mono font-semibold text-emerald-400">
                {profile?.dedicationPct || '100% Dedicated'}
              </span>
            </div>
          </div>

          {/* Bento Tile 4: Active Toolchain & Direct Connect (8 cols) */}
          <div className="md:col-span-8 rounded-3xl bg-zinc-900/40 backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between hover:border-white/15 transition-all shadow-subtle">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Primary Toolchain &amp; Focus
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  Updated 2026
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {focusList.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08] hover:border-indigo-500/40 hover:text-white transition-all"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <FiMail className="text-indigo-400" />
                <span className="font-mono text-zinc-300">{profile?.email || "Shahreyartonmoy001@gmail.com"}</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">Timezone: UTC+6 (Bangladesh)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;