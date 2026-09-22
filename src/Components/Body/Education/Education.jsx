import { FiAward, FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi";
import TiltCard from "../../UI/TiltCard";
import { usePortfolio } from "../../../context/PortfolioContext";

const Education = () => {
  const { education } = usePortfolio();
  const list = education && education.length > 0 ? education : [];

  return (
    <section id="EducationId" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-medium mb-3">
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Education &amp; <span className="text-gradient-brand">Milestones</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-lg mx-auto text-sm sm:text-base font-light">
            Foundational studies fostering mathematical precision, scientific inquiry, and computational thinking.
          </p>
        </div>

        {/* Modern Roadmap Cards */}
        <div className="relative border-l border-white/[0.1] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {list.map((item, idx) => (
            <div key={item._id || item.id || idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-indigo-500 group-hover:border-violet-400 group-hover:scale-125 transition-all shadow-glow-indigo flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </div>

              <TiltCard maxTilt={5} scale={1.01}>
                <div className="rounded-3xl bg-zinc-900/40 border border-white/[0.08] p-6 sm:p-7 backdrop-blur-xl hover:border-indigo-500/30 transition-all shadow-subtle">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                      <FiCalendar className="text-xs text-indigo-400" />
                      <span>{item.period}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      <FiAward className="text-xs" />
                      <span>{item.grade}</span>
                    </span>
                  </div>

                  {/* Title & Institute */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                    {item.institution}
                  </h3>
                  
                  <div className="text-sm font-medium text-zinc-300 mt-1 flex items-center gap-2">
                    <FiBookOpen className="text-indigo-400 text-xs" />
                    <span>{item.level}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2.5">
                    <span className="flex items-center gap-1">
                      <FiMapPin className="text-zinc-500" />
                      {item.location}
                    </span>
                    <span className="text-indigo-400 font-mono">
                      {"//"} {item.department}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm text-zinc-400 leading-relaxed font-light border-t border-white/[0.06] pt-3">
                    {item.description}
                  </p>

                </div>
              </TiltCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;