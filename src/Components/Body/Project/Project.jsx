/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
import Slider1 from "./Slider/Slider1";
import Slider2 from "./Slider/Slider2";
import Slider3 from "./Slider/Slider3";


const Project = () => {
    return (
        <div id="ProjectsId">
            <h1 className="text-center text-4xl mb-32 text-white  font-semibold">_Projects</h1>
            <div className="grid lg:grid-cols-3 gap-5 lg:gap-0 lg:mx-40 mt-16 mb-16 ">
                {/* project01 */}
                <div  data-aos="fade"
                    data-aos-easing="linear"
                    data-aos-duration="2000" className="card mx-auto w-80 lg:w-96 rounded-md bg-gradient-to-t from-[#0B1121] to-[#07472E] shadow-2xl">
                    <figure className="px-3 pt-5">

                        <Slider1></Slider1>
                    </figure>
                    <div className="mt-2 ml-3 pb-5">
                        <h1 className="text-white">Const <span className="text-green-500">_title</span> = <span className="text-yellow-500">'BuildSync Hub';</span></h1>

                        <h1 className="text-white">Const <span className="text-green-500">_desc</span> = <span className="text-yellow-500">'A Building Management Application...';</span></h1>

                        <h1 className="text-white">Const <span className="text-green-500">_technology</span> = <span className="text-yellow-500">'Rect.js, Node.js, Express.js, Mongodb, Tailwind Css, Firebase,Strip';</span></h1>

                        <div className="flex gap-5">
                            <p className="text-blue-500 mt-5"><a href="https://comfy-eclair-fabcdd.netlify.app/" target="_blank">Visit()</a></p>
                            <p className="text-blue-500 mt-5"><a href="https://github.com/Shahreyar-Tonmoy/Building--Menagement-Client" target="_blank">Github()</a></p>
                        </div>

                    </div>

                </div>
                {/* project02 */}
                <div data-aos="fade"
                    data-aos-easing="linear"
                    data-aos-duration="2000" className="card w-80 lg:w-96 mx-auto rounded-md  bg-gradient-to-t from-[#0B1121] to-[#07472E] shadow-2xl">
                    <figure className="px-3 pt-5">

                        <Slider2></Slider2>
                    </figure>
                    <div className="mt-2 ml-3 pb-5">
                        <h1 className="text-white">Const <span className="text-green-500">_title</span> = <span className="text-yellow-500">'Group Study';</span></h1>

                        <h1 className="text-white">Const <span className="text-green-500">_desc</span> = <span className="text-yellow-500">'Online Group Study Application...';</span></h1>

                        <h1 className="text-white">Const <span className="text-green-500">_technology</span> = <span className="text-yellow-500">'Rect.js, Node.js, Express.js, Mongodb, Tailwind Css, Firebase';</span></h1>

                        <div className="flex gap-5">
                            <p className="text-blue-500 mt-5"><a href="https://bucolic-blini-9bf008.netlify.app/" target="_blank">Visit()</a></p>
                            <p className="text-blue-500 mt-5"><a href="https://github.com/Shahreyar-Tonmoy/Group-Study-Client" target="_blank">Github()</a></p>
                        </div>

                    </div>
                </div>
                {/* project03 */}
                <div data-aos="fade"
                    data-aos-easing="linear"
                    data-aos-duration="2000" className="card w-80 lg:w-96 mx-auto rounded-md  bg-gradient-to-t from-[#0B1121] to-[#07472E] shadow-2xl">
                    <figure className="px-3 pt-5">

                        <Slider3></Slider3>
                    </figure>
                    <div className="mt-2 ml-3 pb-5">
                        <h1 className="text-white">Const <span className="text-green-500">_title</span> = <span className="text-yellow-500">'Fashion Store';</span></h1>

                        <h1 className="text-white">Const <span className="text-green-500">_desc</span> = <span className="text-yellow-500">'Fashion store is a online Brand-shop ....';</span></h1>

                        <h1 className="text-white">Const <span className="text-green-500">_technology</span> = <span className="text-yellow-500">'Rect.js, Node.js, Express.js, Mongodb, Tailwind Css, Firebase';</span></h1>

                        <div className="flex gap-5">
                            <p className="text-blue-500 mt-5"><a href="https://bucolic-genie-cb2e42.netlify.app/" target="_blank" >Visit()</a></p>
                            <p className="text-blue-500 mt-5"><a href="https://github.com/Shahreyar-Tonmoy/Brand-Shop-Client" target="_blank">Github()</a></p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;