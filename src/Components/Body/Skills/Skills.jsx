import  { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import icon1 from "../../../assets/Icons/1.png";
import icon2 from "../../../assets/Icons/2.png";
import icon3 from "../../../assets/Icons/3.png";
import icon4 from "../../../assets/Icons/4.png";
import icon5 from "../../../assets/Icons/5.png";
import icon6 from "../../../assets/Icons/6.png";
import icon7 from "../../../assets/Icons/7.png";
import icon8 from "../../../assets/Icons/8.png";
import icon9 from "../../../assets/Icons/9.png";
import icon10 from "../../../assets/Icons/10.png";
import icon11 from "../../../assets/Icons/11.png";
import icon12 from "../../../assets/Icons/12.png";
import icon13 from "../../../assets/Icons/13.png";
import icon14 from "../../../assets/Icons/14.png";





export default class Skills extends Component {
  render() {
    const settings = {
      
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: -20,
      cssEase: "linear",
      
    };
    return (
      <div  id="SkillsId" className="mt-32">
         <h1 className="text-center text-4xl mb-32 text-white font-semibold">_Skills</h1>
        <div  data-aos="fade"
                    data-aos-easing="linear"
                    data-aos-duration="2000" className="lg:mx-60 mx-8 overflow-hidden rounded-2xl mt-16">
        
        
        <Slider {...settings}>
          
          <div>
          <img  className="w-32" src={icon1} alt="" />
          </div>
          
          
          <div>
          <img className="w-32" src={icon2} alt="" />
          </div>
         
          
          <div>
          <img className="w-32" src={icon3} alt="" />
          </div>
          
          <div>
          <img className="w-32" src={icon4} alt="" />
          </div>
          
          <div>
          <img className="w-32" src={icon5} alt="" />
          </div>
          
          <div>
          <img className="w-32" src={icon6} alt="" />
          </div>
          <div>
          <img className="w-32" src={icon7} alt="" />
          </div>
          <div>
          <img className="w-32" src={icon8} alt="" />
          </div>
          <div>
          <img className="w-32" src={icon9} alt="" />
          </div>
          <div>
          <img className="w-32" src={icon10} alt="" />
          </div>
          <div>
          <img className="w-32" src={icon11} alt="" />
          </div>
          <div>
          <img className="w-32" src={icon12} alt="" />
          </div>
          <div>
          <img className="w-32" src={icon13} alt="" />
          </div>
          <div>
          <img className="w-32" src={icon14} alt="" />
          </div>
          
          
        </Slider>
      </div>
      </div>
    );
  }
}

