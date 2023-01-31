import React from "react";
import './footer.css'

import image1 from './Images/5279111_network_fb_social media_facebook_facebook logo_icon.png'
import image2 from './Images/104493_linkedin_icon (1).png'
import image3 from './Images/104501_twitter_bird_icon.png'
import image4 from './Images/299063_heart_icon.png'
import logo from './Images/maktabaty.jpg'




const footer = () => {


    return <>
        <footer className="mt-5">
            <div className="footer-container">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <div className="social">Maktabaty</div>
                <div className="links">
                    <a href="https://www.facebook.com/abi.mohamed.10" target="_blank">
                        <img
                            src={image1} alt="" />
                    </a>

                    <a href="https://twitter.com/home" target="_blank">
                        <img
                            src={image2} alt="" />
                    </a>
                    <a href="https://www.linkedin.com/in/mohamed-abi-976299237/" target="_blank">
                        <img
                            src={image3} alt="" />
                    </a>
                    <a to="/"><span className="material-symbols-outlined">
                        home
                    </span></a>
                </div>
                <div className="kasper">© 2023 <span>Maktabaty</span> All Right Reserved</div>
                <div className="Med">Made By <span><img src={image4} alt="" /></span> By Mohamed ABI & DALI Walid</div>
            </div>
        </footer>
    </>
}

export default footer;