import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../Context/auth.context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './styles.css'

//const API_URL = "https://parcipe-backend.adaptable.app/parcipe"
const API_URL = "https://localhost:5005/parcipe"

function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const {storeToken, authenticateUser} = useContext(AuthContext)

  const login = (e) => {
    e.preventDefault();

    const requestBody ={email, password};
    axios
    .post(`${API_URL}/auth/login`, requestBody)
    .then((response)=>{
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/')

    })
    .catch((error)=>{
        const errorDescription = error.response.data.message;
        setErrorMsg(errorDescription)
        console.log("Login failed: ", errorDescription)
    })
  }
    
  return (

    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
      <div className="card" style={{backgroundColor: 'rgb(181, 223, 205)'}}>
        <div className="card-body">
          <h4 className="card-title">Login</h4>
          <form>
            <div className="form-group">
              <label htmlFor="email" style={{margin: '0.5em 0 0.2em 0'}}>Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter username" onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{margin: '0.5em 0 0.2em 0'}}>Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{marginTop: '1em', backgroundColor: 'rgb(76, 203, 148)'}} onClick={login}>Login</button>
          </form>
        </div>
        <p id="login_error">{errorMsg}</p>
      </div>
    </div>
  )
}

export default Login