import React, { useEffect } from 'react';
import "./Auth.css"
import firebase from "../../config/firebase.config"
// import { FcGithu } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useAuthState } from 'react-firebase-hooks/auth';
import { setUser } from "../../auth.slice"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const auth = firebase.auth();


function SignIn() {


  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    await auth.signInWithPopup(provider);

  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}><FaGithub style={{ marginRight: "10px", fontSize: "1.4rem" }} /> Sign in with Github</button>
      <p className="signInMessage">If you don't have an account on github, I know where to start just go through this 🤗</p>
    </>
  )

}

function Auth() {
  const dispatch = useDispatch()
  const [user,loading, error] = useAuthState(auth);

  useEffect(() => {
    dispatch(setUser({ user,loading }))
  }, [user,loading])

  return (
    loading ?<div class="spinner"></div> : (
      <div className="auth-overlay">
    <div className="auth-card">
      <h1 style={{opacity: "0.6",fontSize: "1.6rem"}}>Create a account 👩‍🏫</h1>
      <SignIn />
    </div>
  </div>
    )
  );
}

export default Auth;