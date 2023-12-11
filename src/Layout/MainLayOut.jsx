import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";


const MainLayOut = () => {
    return (
        <div className=" bg-gradient-to-b from-[#0B1121] via-[#07472E] to-[#0B1120]">
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>

        </div>
        
    )
};

export default MainLayOut;