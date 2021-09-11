import React, { useEffect } from 'react';
import "./Auth.css"
import firebase from "../../config/firebase.config"
import { FcGoogle } from "react-icons/fc"
import { useAuthState } from 'react-firebase-hooks/auth';
import { setUser } from "../../auth.slice"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const auth = firebase.auth();


function SignIn() {


  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);

  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}><FcGoogle style={{ marginRight: "10px", fontSize: "1.4rem" }} /> Sign in with Google</button>
      <p>Happy Writing 🤗</p>
    </>
  )

}

function Auth() {
  const dispatch = useDispatch()
  const [user,loading, error] = useAuthState(auth);

  console.log("loading; ",loading)

  useEffect(() => {
  console.log("loading2; ",loading)
    
    dispatch(setUser({ user,loading }))
  }, [user,loading])

  return (
    loading ?<div class="spinner"></div> : (
      <div className="auth-overlay">
    <div className="auth-card">
      <h1 style={{opacity: "0.3",fontSize: "1.6rem"}}>Create a account 👩‍🏫</h1>
      <SignIn />
    </div>
  </div>
    )
  );
}

export default Auth;