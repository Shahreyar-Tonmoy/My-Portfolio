/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
import Profile from '../../../assets/Profile Photo.png';
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const About = () => {
    return (
        <div id='AboutId'>
            <h1 className="text-center my-16 text-4xl text-white font-semibold">_About</h1>
            <div className='lg:flex  lg:mt-16 lg:mx-20 justify-around  gap-20'>

                <div data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-sine">
                    <div className=" flex flex-col mx-auto text-gray-700 bg-[#0B1121] shadow-md bg-clip-border rounded-xl w-80 lg:w-96">
                        <div className=" mt-3">
                            <h1 className="text-center text-xl text-white font-bold">Hey, I'm <span className="bg-gradient-to-r font-bold  from-green-700  to-[#1d419d] inline-block text-transparent bg-clip-text ">Shahreyar Tonmoy</span></h1>
                            <h1 className="text-center pt-2 text-lg text-slate-400">Front-end Developer</h1>
                        </div>
                        <div className=" mx-4 mt-4 overflow-hidden text-gray-700  shadow-lg bg-clip-border  rounded-b-xl lg:h-80">




                            <img className="rounded-r-xl" src={Profile} alt="profile-picture" />
                        </div>
                        <div className="p-6 text-center">

                            <p className="block  text-gray-400  ">
                                Shahreyartonmoy001@gmail.com
                            </p>
                            <p className="block text-gray-400  ">
                                Joypurhat, Bangladesh
                            </p>
                            <div className='text-2xl mt-3 flex gap-2 justify-center'>
                                <a href="https://github.com/Shahreyar-Tonmoy" target='_blank'><FaGithub /> </a>

                                <a href="https://www.facebook.com/profile.php?id=100019141502263" target='_blank'><FaFacebook /></a>

                                <a href="https://www.instagram.com/shahreyar.tonmoy/" target='_blank'><FaInstagram /></a>

                                <a href="https://twitter.com/ShahreyarT38896" target='_blank'><FaTwitter /></a>

                                <a href="" target='_blank'><FaLinkedin /></a>
                            </div>
                        </div>

                    </div>

                </div>

                <div data-aos="fade"
                    data-aos-easing="linear"
                    data-aos-duration="2000" className='mx-5 mt-16 lg:mt-0 flex-1'>
                    <Link activeClass="active"
                        to="BannerId"
                        spy={true}
                        smooth={true}
                        offset={50}
                        duration={500}
                    >
                        <button className='btn rounded-t-3xl rounded-b-3xl bg-transparent text-white hover:bg-transparent'><FaHome />_Home</button>
                    </Link>


                    <h1 className='text-2xl mt-8  font-semibold text-slate-400'>→ Hi There I'm</h1>

                    <h1 className='text-5xl mt-3 font-bold text-white'>Front-End Developer !</h1>

                    <p className='text-slate-400 lg:mr-32 mt-3'>
                        ←! I am a experienced front-End Developer with a solid programming background and a genuine desire to create clean, efficient solutions.
                        My interest in technology and my journey with coding. I am devoted to remain current with evolving technologies
                        and processes in order to consistently enhance my abilities and produce high-quality solutions that suit user
                        demands as well as the company's goals. →

                    </p>

                    <div className='flex mx-5 gap-20 mt-10'>
                        <div>
                            <h1 className='text-center text-5xl font-bold bg-gradient-to-r   from-green-700  to-[#1d419d]  text-transparent bg-clip-text'>01 </h1>
                            <p className='mt-1 text-xl text-slate-400'>_years-exprience</p>
                        </div>

                        <div>
                            <h1 className='text-center text-5xl font-bold bg-gradient-to-r   from-green-700  to-[#1d419d]  text-transparent bg-clip-text'>12 +</h1>
                            <p className='mt-1 text-xl text-slate-400'>_project-completed</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default About;