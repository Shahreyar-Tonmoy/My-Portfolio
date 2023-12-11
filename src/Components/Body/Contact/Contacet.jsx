/* eslint-disable react/jsx-no-comment-textnodes */
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import email from '../../../assets/email.png';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Contacet = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();


        emailjs.sendForm('service_18kdnie', 'template_bgdj52b', form.current, 'KqlZhLOzX3bDSGTGy')
            .then((result) => {
                console.log(result.text === "OK")
                if (result.text === "OK") {
                    toast.success('Thanks for messaging!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    e.target.reset()
                }
            }, (error) => {
                console.log(error.text);
            });
    };


    return (



        <section id='ContactId' className=" py-20 lg:py-[50px] overflow-hidden relative z-10">
            <h1 className="text-center text-4xl text-white mb-20 font-semibold">_Contact</h1>

            <div className="container">
                <div className="flex lg:mx-20 flex-wrap lg:justify-around ">
                    <div data-aos="fade-right"
                    data-aos-easing="linear"
                    data-aos-duration="1500" className="w-full lg:w-1/2 xl:w-6/12 px-4">
                        <div className="max-w-[570px] border-stone-400 bg-[#0B1121] rounded-xl py-10  mb-12 lg:mb-0">

                            <h2 className="
            text-stone-400
            mb-6 mx-10
            uppercase
            font-bold
            text-[22px]
            
            lg:text-[30px]
            
            ">
                               // GET IN TOUCH
                            </h2>
                            <p className="text-base text-stone-400 mx-10 leading-relaxed ">
                                ←! If you have any question, feel free to reach out to me . →
                            </p>
                            <div className='mx-10 mt-5 lg:flex items-center gap-2'>
                                <img className='w-20' src={email} alt="" />
                                <div>
                                    <h1 className='text-stone-400 font-semibold text-2xl'>_Email:</h1>
                                    <span className="bg-gradient-to-r font-bold  from-green-700  to-[#1d419d] inline-block text-transparent bg-clip-text ">Shahreyartonmoy001@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider divi lg:divider-horizontal"></div>
                    <div data-aos="fade-left"
                        data-aos-easing="linear"
                        data-aos-duration="1500" className="w-full lg:w-1/2 xl:w-5/12 px-4">
                        <div className="shadow-2xl border-stone-400 bg-[#0B1121] relative rounded-lg p-8 sm:p-12 ">
                            <h1 className='text-3xl font-semibold mb-3 text-slate-400'>// Send a message</h1>

                            <form ref={form} onSubmit={sendEmail}>
                                <div className="mb-6">
                                    <label className='text-xl text-slate-400'>_your-name</label>
                                    <input type="text" name="user_name" placeholder="Your Name" className=" mt-3
                  w-full
                  rounded
                  py-3
                  px-[14px]
                  text-white text-base
                  border border-stone-400 bg-[#0B1121]
                  outline-none 
                  focus-visible:shadow-none
                  
                  " />
                                </div>
                                <div className="mb-6">
                                    <label className='text-xl text-slate-400'>_your-email</label>
                                    <input type="email" name="user_email" placeholder="Your Email" className="mt-3
                  w-full
                  rounded
                  py-3
                  px-[14px]
                  text-white text-base
                  border border-stone-400 bg-[#0B1121]
                  outline-none
                  focus-visible:shadow-none
                  
                  " />
                                </div>

                                <div className="mb-6">
                                    <label className='text-xl text-slate-400'>_your-message</label>
                                    <textarea rows={6} name="message" placeholder="Your Message" className="mt-3
                  w-full
                  rounded
                  py-3
                  px-[14px]
                  text-white text-base
                  border border-stone-400 bg-[#0B1121]
                  resize-none
                  outline-none
                  focus-visible:shadow-none
                  
                  " defaultValue={""} />
                                </div>
                                <div>



                                    <button type="submit" value="Send" className="
                  w-full
                  text-white
                  bg-[#00935F]
                  rounded
                  
                  p-3
                  transition
                  hover:bg-opacity-90
                  ">
                                        Send Message
                                    </button>
                                </div>
                                <ToastContainer></ToastContainer>
                            </form>
                            <div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    );
};

export default Contacet;