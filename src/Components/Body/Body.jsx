import Banner from "./Download Button/Banner";
import About from "./About/About";
import Skills from "./Skills/Skills";
import Project from "./Project/Project";
import Education from "./Education/Education";
import Contacet from "./Contact/Contacet";

const Body = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <Banner />
      <About />
      <Skills />
      <Project />
      <Education />
      <Contacet />
    </div>
  );
};

export default Body;