import { useState } from "react";
import { FiExternalLink, FiGithub, FiLayers } from "react-icons/fi";
import TiltCard from "../../UI/TiltCard";
import Slider1 from "./Slider/Slider1";
import Slider2 from "./Slider/Slider2";
import Slider3 from "./Slider/Slider3";
import ProjectImageSlider from "./ProjectImageSlider";
import { usePortfolio } from "../../../context/PortfolioContext";

const Project = () => {
  const { projects } = usePortfolio();
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const renderProjectMedia = (project, index) => {
    // 1. If project has uploaded images (single or multiple)
    if (project.images && project.images.length > 0) {
      return <ProjectImageSlider images={project.images} title={project.title} />;
    }

    // 2. Default bundled sliders
    if (project.title?.toLowerCase().includes("buildsync") || index === 0) {
      return (
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-zinc-950">
          <Slider1 />
        </div>
      );
    }
    if (project.title?.toLowerCase().includes("group study") || index === 1) {
      return (
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-zinc-950">
          <Slider2 />
        </div>
      );
    }
    if (project.title?.toLowerCase().includes("fashion") || index === 2) {
      return (
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-zinc-950">
          <Slider3 />
        </div>
      );
    }

    // 3. Fallback placeholder
    return (
      <div className="aspect-video w-full flex flex-col items-center justify-center bg-zinc-950/80 rounded-2xl text-zinc-500 font-mono text-xs border border-white/[0.06]">
        <FiLayers className="text-3xl mb-2 text-indigo-400/60" />
        <span>Web Application</span>
      </div>
    );
  };

  return (
    <section id="ProjectsId" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-medium mb-3">
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient-brand">Works &amp; Case Studies</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-light">
            Production web applications engineered with clean architectures, robust backend APIs, and responsive design.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full bg-zinc-900/80 border border-white/[0.08] backdrop-blur-md gap-1 flex-wrap justify-center">
            {[
              { id: "all", label: "All Projects" },
              { id: "fullstack", label: "Full-Stack Web Apps" },
              { id: "frontend", label: "Frontend & E-Commerce" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  filter === tab.id
                    ? "bg-white text-zinc-950 shadow-sm font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, index) => (
            <TiltCard key={project._id || project.id || index} maxTilt={6} scale={1.01} className="h-full">
              <div className="h-full rounded-3xl bg-zinc-900/40 border border-white/[0.08] p-5 backdrop-blur-xl flex flex-col justify-between hover:border-indigo-500/30 transition-all shadow-subtle group">
                
                <div>
                  {/* Media Preview Container */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-950">
                    {renderProjectMedia(project, index)}
                    
                    {/* Floating Category Tag */}
                    <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-[11px] font-medium text-zinc-200 flex items-center gap-1.5 shadow-sm">
                      <FiLayers className="text-indigo-400 text-xs" />
                      <span>{project.type || "Web Application"}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-5">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.technologies?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.06] hover:border-indigo-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-7 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-glow-indigo transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Live Preview</span>
                      <FiExternalLink className="text-xs" />
                    </a>
                  ) : (
                    <span className="flex-1 py-2 text-center text-xs text-zinc-500 font-mono">Private Preview</span>
                  )}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <FiGithub className="text-xs" />
                      <span>Code</span>
                    </a>
                  ) : (
                    <span className="flex-1 py-2 text-center text-xs text-zinc-500 font-mono">Private Repo</span>
                  )}
                </div>

              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Project;