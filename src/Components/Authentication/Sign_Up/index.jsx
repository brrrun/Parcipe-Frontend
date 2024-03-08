import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./styles.css"

//const API_URL = "https://parcipe-backend.adaptable.app/parcipe"
const API_URL = "https://localhost:5005/parcipe"

function Sign_Up() {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [emailCheck, setEmailCheck] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();

    if (!username){
      setErrorMsg("Must provide a valid Username")
    } else if (!email){
      setErrorMsg("Must provide a valid E-mail")
    } else if (!password){
      setErrorMsg("Must provide a valid Password")
    }  else if (passwordCheck !== password){
      setErrorMsg("Passwords do not match")
    } else if (emailCheck != email){
      setErrorMsg("Emails do not match")
    } else if (username.length <= 3){
      setErrorMsg("Username but be at least 4 characters")
    } else {
      const requestBody = {email, password, username};

      axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(()=> navigate("/login"))
      .catch((error)=>{
          const errorDescription = error.response.data.message;
          setErrorMsg("Sorry, sign up failed")
          console.log("Sign Up failed: ", errorDescription)
      })
    }
  }

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
      <div className="card"  style={{backgroundColor: 'rgb(181, 223, 205)', width: '20em'}}>
        <div className="card-body">
          <h4 className="card-title">Sign Up</h4>
          <form>
            <div className="form-group">
              <label htmlFor="username"  style={{margin: '0.5em 0 0.2em 0'}}>Username</label>
              <input type="text" className="form-control" id="username" placeholder="Choose a username" onChange={(e)=> setUsername(e.target.value)}/>
              <label htmlFor="email"  style={{margin: '0.5em 0 0.2em 0'}}>Email</label>
              <input type="text" className="form-control" id="email" placeholder="Enter your email"  onChange={(e)=> setEmail(e.target.value)}/>
              <input type="text" className="form-control" id="email" placeholder="Rewrite your email"  onChange={(e)=> setEmailCheck(e.target.value)} style={{margin: '0.5em 0 0.2em 0'}}/>
            </div>
            <div className="form-group">
              <label htmlFor="password"  style={{margin: '0.5em 0 0.2em 0'}}>Password</label>
              <input type="password" className="form-control" id="password" placeholder="Choose a password"  onChange={(e)=> setPassword(e.target.value)}/>
              <input type="password" className="form-control" id="password" placeholder="Rewrite password"   onChange={(e)=> setPasswordCheck(e.target.value)} style={{margin: '0.5em 0 0.2em 0'}}/>
            </div>
            <p id="signup_error">{errorMsg}</p>
            <button type="submit" className="btn btn-primary btn-block" style={{marginTop: '1em', backgroundColor: 'rgb(76, 203, 148)'}} onClick={signUp}>Sign In</button>
          </form>
        </div>
        <Link to="/login" id="already_acc"> Already have an account? </Link>
      </div>
    </div>
  )
}

export default Sign_Up