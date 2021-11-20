import React from 'react';
import Logo from '../Assets/logov4.png'

import './Stylesheets/footer.css'

export default function Footer() {
    // Write a navbar component that renders a navbar with links to the / with the name home, /start-getwish with the name Find wishes. /new-wish with the name Create a wish.
    return (
        <div className="footer" style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="footer-author">
                <p>Dự án 20/11 của câu lạc bộ Tin Học Trần Đại Nghĩa</p>
                <img src={Logo} className="clubLogo" alt="logo CLB" />
            </div>
            <div className="footer-source">
                <p>Mã nguồn</p>
                <a href="https://github.com/clbtinhoc/trianthayco2011/tree/production" target="_blank" rel="noreferrer">
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"}
                        className="githubLogo" alt="logo github" style={{ maxHeight: "80px" }} />
                </a>
            </div>
        </div>
    );

}