import { Link } from "react-scroll";



const NavBar = () => {






    return (
        <div  id="BannerId" className="navbar border-slate-600 border-b ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm  font-semibold dropdown-content mt-3 z-[1] p-2 shadow bg-gradient-to-b from-[#0B1121] via-[#07472E] to-[#0B1120] text-white rounded-box w-52">
                        <Link activeClass="active"
                            to="BannerId"
                            spy={true}
                            smooth={true}
                            offset={50}
                            duration={500}
                             >
                            <li><a>|_Home|</a></li>
                        </Link>
                        <Link to='AboutId' spy={true}
                            smooth={true}
                            offset={50}
                            duration={500} >
                            <li><a>|_About|</a></li>
                        </Link>
                        <Link to='SkillsId' spy={true}
                            smooth={true}
                            offset={50}
                            duration={500} >
                            <li className=""><a>|_Skills|</a></li>
                        </Link>
                        <Link to='EducationId' spy={true}
                            smooth={true}
                            offset={50}
                            duration={500} >
                            <li className=""><a>|_Education|</a></li>
                        </Link>
                        <Link to='ProjectsId' spy={true} smooth={true} offset={50} duration={500} >
                            <li><a>|_Projects|</a></li>
                        </Link>
                        <Link to='ContactId' spy={true} smooth={true} offset={50} duration={500} >
                            <li><a>|_Contact|</a></li>
                        </Link>



                    </ul>
                </div>
                <a className=" px-5 text-xl bg-gradient-to-r font-bold  from-green-700  to-[#1d419d] inline-block text-transparent bg-clip-text ">_Shahreyar-Tonmoy</a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu text-white font-medium menu-horizontal px-2">
                <Link activeClass="active"
                            to="BannerId"
                            spy={true}
                            smooth={true}
                            offset={50}
                            duration={500}
                             >
                            <li className="block p-2 font-sans cursor-pointer  leading-normal text-inherit antialiased">|_Home|</li>
                        </Link>
                        <Link to='AboutId' spy={true}
                            smooth={true}
                            offset={50}
                            duration={500} >
                            <li className="block cursor-pointer p-2 font-sans leading-normal text-inherit antialiased">|_About|</li>
                        </Link>
                        <Link to='SkillsId' spy={true}
                            smooth={true}
                            offset={50}
                            duration={500} >
                            <li className="block cursor-pointer p-2 font-sans leading-normal text-inherit antialiased">|_Skills|</li>
                        </Link>
                        <Link to='EducationId' spy={true}
                            smooth={true}
                            offset={50}
                            duration={500} >
                            <li className="block cursor-pointer p-2 font-sans leading-normal text-inherit antialiased">|_Education|</li>
                        </Link>
                        <Link to='ProjectsId' spy={true} smooth={true} offset={50} duration={500} >
                            <li className="block cursor-pointer p-2 font-sans  leading-normal text-inherit antialiased">|_Projects|</li>
                        </Link>
                        <Link to='ContactId' spy={true} smooth={true} offset={50} duration={500} >
                            <li className="block p-2 font-sans cursor-pointer  leading-normal text-inherit antialiased">|_Contact|</li>
                        </Link>
                </ul>
            </div>

        </div>
    );
};

export default NavBar;