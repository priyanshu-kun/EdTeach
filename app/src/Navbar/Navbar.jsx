import React, { useState } from 'react';
import { FiDownload,FiLogOut } from "react-icons/fi"
import { AiFillCloud } from "react-icons/ai"
import { FaChevronDown,FaCloudversify } from "react-icons/fa"
import { GiTorch } from "react-icons/gi"
import { Link } from "react-router-dom"
import "./Navbar.css"
import firebase from "../config/firebase.config";

const auth = firebase.auth();
function Navbar({ handleToogle, handleDownloadCode, userData: { displayName, photoURL },saveStuff }) {

  const [dropDown,setDropDown] = useState(false)

  function SignOut() {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => {
        auth.signOut()
        window.location.reload()
      }}><FiLogOut style={{fontSize: "1.2rem",marginRight: "3px"}} />Sign Out</button>
    )
  }

  function handleDropDown(e) {
    setDropDown(!dropDown)
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
        <button onClick={handleDownloadCode}><FiDownload style={{ color: "#fff", fontSize: "1.3rem" }} /></button>
        <button onClick={() => {
          saveStuff()
        }} ><AiFillCloud className="unstoredData" style={{ color: "#fff", fontSize: "1.5rem" }} /></button>
        <div className="navigation-btns">
          <button onClick={handleToogle}>TOOGLE PREVIEW</button>
          <div className="dropdown-background">
          <FaChevronDown onClick={handleDropDown} style={{ fontSize: "1.2rem",color: "#fff", cursor: "pointer" }} />
          <div className={`dropdown ${!dropDown && "hideDropdown"}`}>
          <a style={{textDecoration: "none",color: "#fff"}} target="_blank" href="https://daringfireball.net/projects/markdown/basics"><GiTorch style={{fontSize: "1.2rem", marginRight: "5px"}} /> GUIDE</a>
          <Link style={{textDecoration: "none",color: "#fff"}} target="_blank" to="/Host"><FaCloudversify style={{fontSize: "1.2rem", marginRight: "5px"}} /> HOST</Link>
          <SignOut />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* <button></button>
<button></button>
 */}

export default Navbar;