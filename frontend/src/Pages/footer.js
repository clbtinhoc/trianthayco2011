import React from 'react';
import Logo from '../Assets/logov4.png'

import './Stylesheets/footer.css'

export default function Footer() {
    // Write a navbar component that renders a navbar with links to the / with the name home, /start-getwish with the name Find wishes. /new-wish with the name Create a wish.
    return (
        <div className="footer">
            <p>Dự án 20/11 của câu lạc bộ Tin Học Trần Đại Nghĩa</p>
            <img src={Logo} className="clubLogo"/> 
        </div>
    );

}