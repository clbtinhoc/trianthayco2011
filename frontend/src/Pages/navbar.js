import React from 'react';
import { Link } from 'react-router-dom';
import "./Stylesheets/navbar.css"
import { AiFillHome, AiOutlinePlusCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
export default function Navbar() {
    // Write a navbar component that renders a navbar with links to the / with the name home, /start-getwish with the name Find wishes. /new-wish with the name Create a wish.
    return (
        <nav className="navbar">
            <Link className="navbar-brand" to="/">
                <AiFillHome className="navbar-icon" />
                &nbsp;Home

            </Link>
            <Link className="navbar-brand" to="/start-getwish">
                <FaSearch className="navbar-icon" />
                &nbsp;Tổng hợp lời chúc

            </Link>
            <Link className="navbar-brand" to="/new-wish">
                <AiOutlinePlusCircle className="navbar-icon" />
                &nbsp;Tạo lời chúc

            </Link>
        </nav>
    );

}
// Nơi 
// lưu giữ, trao gửi 
// lời tri ân và lòng biết ơn thầy cô 