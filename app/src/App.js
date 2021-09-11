import './App.css';
import { useState, useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Auth from "./Pages/Auth/Auth"
import Host from "./Pages/Host/Host"
import { useSelector } from "react-redux"


function App() {

  const {user} = useSelector((state) => state.auth)
  return (
    <>
      {
        !user ? <Auth /> : <Home />
      }
    </>
  );
}


export default App;
