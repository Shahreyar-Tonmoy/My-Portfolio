import { useState } from "react";
import TiltCard from "../../UI/TiltCard";
import { usePortfolio } from "../../../context/PortfolioContext";

// Existing custom assets for marquee
import icon1 from "../../../assets/Icons/1.png";
import icon2 from "../../../assets/Icons/2.png";
import icon3 from "../../../assets/Icons/3.png";
import icon4 from "../../../assets/Icons/4.png";
import icon5 from "../../../assets/Icons/5.png";
import icon6 from "../../../assets/Icons/6.png";
import icon7 from "../../../assets/Icons/7.png";
import icon8 from "../../../assets/Icons/8.png";
import icon9 from "../../../assets/Icons/9.png";
import icon10 from "../../../assets/Icons/10.png";
import icon11 from "../../../assets/Icons/11.png";
import icon12 from "../../../assets/Icons/12.png";
import icon13 from "../../../assets/Icons/13.png";
import icon14 from "../../../assets/Icons/14.png";

const marqueeIcons = [
  icon1, icon2, icon3, icon4, icon5, icon6, icon7,
  icon8, icon9, icon10, icon11, icon12, icon13, icon14
];

const Skills = () => {
  const { skills, fallbackIcons } = usePortfolio();
  const [activeTab, setActiveTab] = useState("all");

  const filteredSkills =
    activeTab === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeTab);

  return (
    <section id="SkillsId" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-medium mb-3">
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Technical <span className="text-gradient-brand">Arsenal &amp; Stack</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-light">
            Modern technologies, libraries, and frameworks I leverage to design and deploy scalable web products.
          </p>
        </div>

        {/* Infinite Logo Marquee */}
        <div className="mb-14 relative rounded-2xl bg-zinc-900/30 border border-white/[0.08] p-5 backdrop-blur-md overflow-hidden">
          {/* Edge Gradient Masks for Smooth Fading */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-7 items-center animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused] w-max">
            {[...marqueeIcons, ...marqueeIcons].map((icon, idx) => (
              <div
                key={idx}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5 flex items-center justify-center hover:border-indigo-500/40 hover:bg-white/[0.06] transition-all hover:scale-105 shadow-sm flex-shrink-0"
              >
                <img
                  src={icon}
                  alt={`Technology icon ${idx}`}
                  className="max-w-full max-h-full object-contain filter drop-shadow"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full bg-zinc-900/80 border border-white/[0.08] backdrop-blur-md gap-1">
            {[
              { id: "all", label: "All Technologies" },
              { id: "frontend", label: "Frontend" },
              { id: "backend", label: "Backend & DB" },
              { id: "tools", label: "Tools & DevOps" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-zinc-950 shadow-sm font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Tilt Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skill, index) => {
            const displayIcon =
              skill.icon ||
              (fallbackIcons && fallbackIcons[index % fallbackIcons.length]) ||
              icon1;

            return (
              <TiltCard key={skill._id || skill.name || index} maxTilt={8} scale={1.02}>
                <div className="h-full rounded-2xl bg-zinc-900/40 border border-white/[0.08] p-5 backdrop-blur-xl hover:border-indigo-500/30 transition-all group flex flex-col justify-between shadow-subtle">
                  <div>
                    {/* Top row: Icon and Level Tag */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] p-2 flex items-center justify-center group-hover:border-indigo-500/30 transition-all overflow-hidden">
                        <img
                          src={displayIcon}
                          alt={skill.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                        {skill.level}
                      </span>
                    </div>

                    {/* Skill Title & Description */}
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-light">
                      {skill.desc}
                    </p>
                  </div>

                  {/* Bottom Proficiency Bar */}
                  <div className="mt-5 pt-3 border-t border-white/[0.06]">
                    <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1.5">
                      <span>Proficiency</span>
                      <span className="text-zinc-200 font-semibold">{skill.pct}</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-1000"
                        style={{ width: skill.pct }}
                      />
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
