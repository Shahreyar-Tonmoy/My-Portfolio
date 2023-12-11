/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
import { TypeAnimation } from "react-type-animation";
import codeImg from "../../../assets/code1.png"

import pdf from '../../../assets/Md-Mubtashim-Shahreyar-Tonmoy.pdf';

const Banner = () => {
    return (
        <div>
            <div className="lg:flex mx-5 lg:h-[85vh]  justify-between  items-center  ">

                <div data-aos="fade"
                    data-aos-easing="linear"
                    data-aos-duration="2500" className="flex-1  lg:ml-20">
                    <h1 className="lg:text-5xl text-2xl mt-10 lg:mt-0 text-white   font-bold">Crafting Outstanding <br /> Web Experiences <br /> With <span className="bg-gradient-to-r font-bold  from-green-700  to-[#1d419d] inline-block text-transparent bg-clip-text"><TypeAnimation
                        sequence={['Shahreyar Tonmoy', 2000, ""]}

                        repeat={Infinity}
                    /></span> </h1>
                    <p className="text-slate-400 lg:pr-28 mt-7"><TypeAnimation
                        sequence={[`←! I'm Shahreyar Tonmoy, a passionate front-end developer with an ability for turning imaginative  concepts into functional and attractive web applications.I venture on excursions to develop complete digital experiences using a combination of inspiration and technical expertise. →`, 2000, ""]}

                        repeat={Infinity}
                    />

                    </p>

                    <div className="mt-5">
                        <a href={pdf} download="Resume">

                            <button className="btn btn-success text-white">Download Resume
                                <svg xmlns="http://www.w3.org/2000/svg" height={16} width={16} viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>

                            </button>
                        </a>
                    </div>
                </div>



                <div data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="2000" className="lg:flex-1 lg:ml-20 ">


                    <div className="card mt-16 lg:mt-0 lg:w-[600px] bg-gradient-to-b from-[#0B1121] to-[#07472E] shadow-xl">
                        <figure className="px-20 py-5">
                            <h2 className=" lg:mb-52 text-slate-400 font-semibold">Introduce.js</h2>
                            <div className="divider bg-white lg:divider-horizontal"></div>
                            <img src={codeImg} alt="Shoes" className="rounded-xl bg-gradient-to-b to-[#0B1121] from-[#07472E]" />
                        </figure>


                    </div>



                </div>

            </div>
        </div>
    );
};

export default Banner;