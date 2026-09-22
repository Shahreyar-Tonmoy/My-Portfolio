import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import ThreeBackground from "../Components/Three/ThreeBackground";

const MainLayOut = () => {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Interactive 3D WebGL Ambient Cosmic Canvas */}
      <ThreeBackground />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-600/[0.08] blur-[150px] pointer-events-none z-0 animate-pulse-glow" />
      <div className="fixed top-[35%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/[0.08] blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[10%] w-[550px] h-[550px] rounded-full bg-cyan-600/[0.05] blur-[160px] pointer-events-none z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayOut;