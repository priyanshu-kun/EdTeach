import React,{useState} from 'react';
import {FiDownload} from "react-icons/fi"
import {Link} from "react-router-dom"
import "./Navbar.css"
import firebase from "../config/firebase.config";

const auth = firebase.auth();
function Navbar({handleToogle,handleDownloadCode,userData: {displayName,photoURL}}) {

    function SignOut() {
        return auth.currentUser && (
          <button className="sign-out" onClick={() => {
            auth.signOut()
            window.location.reload()
          }}>Sign Out</button>
        )
      }

    return (
        <div className="navbar">
            <div className="logo">
               <div className="profile-picture">
                   <img src={photoURL} alt="profile" />
                  
               </div>
              <p className="profile-name">{displayName}</p>
            </div>
            <div className="navigation">
                <button onClick={handleDownloadCode}><FiDownload style={{color: "#fff",fontSize: "1.3rem"}} /></button>
                <div className="navigation-btns">
                <button><Link style={{textDecoration: "none",color: "#fff"}} target="_blank" to="/Host">HOST</Link></button>
                <button><a style={{textDecoration: "none",color: "#fff"}} target="_blank" href="https://daringfireball.net/projects/markdown/basics">GUIDE</a></button>
                <SignOut />
                <button onClick={handleToogle}>TOOGLE PREVIEW</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;