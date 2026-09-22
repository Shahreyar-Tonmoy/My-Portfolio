import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss } from 'react-icons/si';
import { FiCode } from 'react-icons/fi';
import TiltCard from '../UI/TiltCard';
import { usePortfolio, resolveAssetUrl } from '../../context/PortfolioContext';

const Hero3DCanvas = () => {
  const { profile } = usePortfolio();
  const photoUrl = resolveAssetUrl(profile?.profileImage);

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[440px] mx-auto flex items-center justify-center select-none py-6">
      
      {/* Outer Rotating Conic Ambient Glow Halo */}
      <div className="absolute inset-0 m-auto w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-indigo-600/30 via-violet-600/25 to-cyan-500/20 blur-3xl animate-spin-slow pointer-events-none" />

      {/* Secondary Pulse Glow */}
      <div className="absolute inset-4 m-auto w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-indigo-500/15 blur-2xl animate-pulse-glow pointer-events-none" />

      {/* Interactive 3D Tilt Card Containing the Photo */}
      <TiltCard maxTilt={8} scale={1.02} className="relative z-10 w-full">
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-white/10 backdrop-blur-2xl shadow-2xl shadow-indigo-950/50 group">
          
          {/* Inner Photo Frame */}
          <div className="relative rounded-[22px] overflow-hidden bg-zinc-950 aspect-[4/4.5] sm:aspect-square flex items-center justify-center">
            
            {/* Subtle Gradient Shade on bottom of photo for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10 pointer-events-none" />
            
            <img
              src={photoUrl}
              alt={profile?.name || "Shahreyar Tonmoy"}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Bottom Status Ribbon */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between px-3.5 py-2 rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-white/10 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-zinc-200 tracking-tight">
                  {profile?.title || "Full-Stack Web Developer"}
                </span>
              </div>
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <FiCode className="text-xs" />
              </div>
            </div>

          </div>
        </div>
      </TiltCard>

      {/* Floating Animated Tech Badges */}
      {/* 1. React.js (Top Left) */}
      <div className="absolute -top-1 -left-2 sm:-top-2 sm:-left-3 animate-float z-20">
        <div className="px-3.5 py-1.5 sm:py-2 rounded-2xl bg-zinc-950/85 backdrop-blur-2xl border border-white/10 flex items-center gap-2 shadow-xl shadow-black/40 hover:border-cyan-500/40 transition-all">
          <FaReact className="text-cyan-400 text-sm sm:text-base animate-spin-slow" />
          <span className="text-xs font-semibold text-zinc-200">React.js</span>
        </div>
      </div>

      {/* 2. Node.js (Top Right) */}
      <div className="absolute top-6 -right-2 sm:top-5 sm:-right-3 animate-float-delayed z-20">
        <div className="px-3.5 py-1.5 sm:py-2 rounded-2xl bg-zinc-950/85 backdrop-blur-2xl border border-white/10 flex items-center gap-2 shadow-xl shadow-black/40 hover:border-emerald-500/40 transition-all">
          <FaNodeJs className="text-emerald-400 text-sm sm:text-base" />
          <span className="text-xs font-semibold text-zinc-200">Node.js</span>
        </div>
      </div>

      {/* 3. Tailwind CSS (Bottom Left) */}
      <div className="absolute -bottom-2 -left-2 sm:-bottom-2 sm:-left-3 animate-float-delayed z-20">
        <div className="px-3.5 py-1.5 sm:py-2 rounded-2xl bg-zinc-950/85 backdrop-blur-2xl border border-white/10 flex items-center gap-2 shadow-xl shadow-black/40 hover:border-sky-500/40 transition-all">
          <SiTailwindcss className="text-sky-400 text-sm sm:text-base" />
          <span className="text-xs font-semibold text-zinc-200">Tailwind CSS</span>
        </div>
      </div>

      {/* 4. MongoDB (Bottom Right) */}
      <div className="absolute -bottom-1 -right-2 sm:-bottom-1 sm:-right-3 animate-float z-20">
        <div className="px-3.5 py-1.5 sm:py-2 rounded-2xl bg-zinc-950/85 backdrop-blur-2xl border border-white/10 flex items-center gap-2 shadow-xl shadow-black/40 hover:border-green-500/40 transition-all">
          <SiMongodb className="text-green-500 text-sm sm:text-base" />
          <span className="text-xs font-semibold text-zinc-200">MongoDB</span>
        </div>
      </div>

    </div>
  );
};

export default Hero3DCanvas;
