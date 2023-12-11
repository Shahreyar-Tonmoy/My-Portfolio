/* eslint-disable react/jsx-no-target-blank */
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
    return (
        <div>
            <footer className="footer flex items-center justify-between text-green-700 p-4 border-slate-700 border-t ">
                <aside>
                    <p>Copyright © 2023 Shahreyar Tonmoy - All right reserved.</p>
                </aside>
                <div className='text-2xl  mt-3 flex gap-2 justify-center'>
                                <a href="https://github.com/Shahreyar-Tonmoy" target='_blank'><FaGithub /> </a>

                                <a href="https://www.facebook.com/profile.php?id=100019141502263" target='_blank'><FaFacebook /></a>

                                <a href="https://www.instagram.com/shahreyar.tonmoy/" target='_blank'><FaInstagram /></a>

                                <a href="https://twitter.com/ShahreyarT38896" target='_blank'><FaTwitter /></a>

                                <a href="" target='_blank'><FaLinkedin /></a>
                            </div>
            </footer>
        </div>
    );
};

export default Footer;