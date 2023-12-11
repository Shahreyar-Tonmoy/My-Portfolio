
const Education = () => {
    return (

        <section id="EducationId">
            <h1 className="text-center mt-32 mb-16 text-4xl text-white font-semibold">_Education</h1>
            <div className=" text-white py-8">

                <div className="container mx-auto flex flex-col items-start md:flex-row  ">

                    <div className=" lg:w-2/3 mx-auto  sticky">
                        <div className="container mx-auto w-full h-full">
                            <div className="relative wrap overflow-hidden p-10 h-full">
                                <div className="border-2-2 border-yellow-555 absolute h-full border" style={{ right: '50%', border: '2px solid #FFC100', borderRadius: '1%' }} />
                                <div className="border-2-2 border-yellow-555 absolute h-full border" style={{ left: '50%', border: '2px solid #FFC100', borderRadius: '1%' }} />
                                
                                
                                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                                    <div className="order-1 w-5/12" />
                                    <div className="order-1 w-5/12 px-1 py-4 text-right">
                                        <p className="mb-3 text-base text-yellow-300">2018-2023 (SSC)</p>
                                        <h4 className="mb-3 font-bold text-lg md:text-2xl">Ramdeo Bazla Govt. High School, Joypurhat</h4>
                                        <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                                        GPA 5.00 (out of 5.00)
                                        </p>
                                        <p className="text-sm mt-2 md:text-base leading-snug text-gray-50 text-opacity-100">
                                        Science Department
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                                    <div className="order-1 w-5/12" />
                                    <div className="order-1  w-5/12 px-1 py-4">
                                        <p className="mb-3 text-base text-yellow-300">2023-Current (HSC)</p>
                                        <h4 className="mb-3 font-bold  text-lg md:text-2xl text-left">Karatoa multimedia school and college, Bogura</h4>
                                        <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                                        Science Department
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img className="mx-auto -mt-20 lg:-mt-32 " src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2pza3lwZGNoODhwZmc1dzFwNXNkcWx4eTB3d29xOXNrNXlhNmduMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/IhIDRwEVka6plLPC9z/giphy.gif" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Education;