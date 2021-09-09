import React from 'react';
import {FiDownload} from "react-icons/fi"
import {AiFillGithub} from "react-icons/ai"
import Internet from "../assets/internet.svg"
import "./Navbar.css"

function Navbar({handleToogle}) {
    return (
        <div className="navbar">
            <div className="logo">
               LIGHT 👋
            </div>
            <div className="navigation">
                <button><FiDownload style={{color: "#fff",fontSize: "1.3rem"}} /></button>
                <div className="navigation-btns">
                <button>HOST</button>
                <button><a style={{textDecoration: "none",color: "#fff"}} target="_blank" href="https://daringfireball.net/projects/markdown/basics">GUIDE</a></button>
                <button onClick={handleToogle}>TOOGLE PREVIEW</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;