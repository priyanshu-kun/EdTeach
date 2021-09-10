import './App.css';
import { useState, useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Auth from "./Pages/Auth/Auth"
import Host from "./Pages/Host/Host"
import { useSelector } from "react-redux"


function App() {

  const {user,loading} = useSelector((state) => state.auth)
  console.log("home: ",loading)

  return (
    <>
      {
        !user ? <Auth /> : <Home />
      }
    </>
  );
}


export default App;
