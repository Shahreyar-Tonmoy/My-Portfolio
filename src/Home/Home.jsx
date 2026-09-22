import Body from "../Components/Body/Body";
import SEO from "../Components/SEO";

const Home = () => {
    return (
        <div>
            <SEO 
              title="Shahreyar Tonmoy | Front-End & Full-Stack Web Developer"
              description="Portfolio of Shahreyar Tonmoy, a passionate Front-End & Full-Stack Web Developer specializing in React.js, Node.js, Express, MongoDB, modern UI design, and scalable web applications."
              type="website"
              name="Shahreyar Tonmoy Portfolio"
              url="https://shahreyartonmoy.com/"
              image="https://shahreyartonmoy.com/og-image.png"
            />
            <Body className="max-w-screen-xl mx-auto"></Body>
        </div>
    )
};

export default Home;