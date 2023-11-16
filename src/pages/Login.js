import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { ReactSession }  from 'react-client-session';

export function Login(){
 
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
   
    const navigate = useNavigate();
     
    const logInUser = () => {
        if(username.length === 0){
          alert("username has left Blank!");
        }
        else if(password.length === 0){
          alert("password has left Blank!");
        }
        else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({'username':username, 'password':password})
              };
              // TODO fix hardcode
              fetch(`http://localhost:5000/login`, requestOptions).then(res => res.json())
                .then(rs => {
                    if ('error' in rs) alert(rs['error']); else 
                    {
                        console.log(rs);
                        ReactSession.set("username", username);
                        ReactSession.set("user_id", rs['results'][0]['user_id']);
                        if (username == 'admin') navigate('/adminstat'); else navigate('/userstat');
                    }
                })
        }
    }
 
    let imgs = [
      'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
    ];
     
  return (
    <div>
        <div className="container h-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src={imgs[0]} className="img-fluid"/>
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                  </div>
 
                  <div className="form-outline mb-4">
                    <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid username" />
                    <label className="form-label" for="form3Example3">username</label>
                  </div>
 
             
                  <div className="form-outline mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                    <label className="form-label" for="form3Example4">Password</label>
                  </div>
 
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                      <label className="form-check-label" for="form2Example3">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">Forgot password?</a>
                  </div>
 
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={logInUser} >Login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                  </div>
 
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}