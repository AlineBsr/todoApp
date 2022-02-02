import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Register(props){
  const { baseUrl } = props;

    const handleFormSubmit = (e) => {
      e.preventDefault();
      e.persist();
      
      axios.post(baseUrl + "/register",  {
          username: e.target.username.value, 
          email: e.target.email.value,
          password: e.target.password.value,
          type: "user",
          isLogged: false,
        },  
      )
        .then( (res) => console.log(res.data) )
        .catch( (err) => console.error(err) )
        
        // const sendNewUser = async () => {
        //     try {
        //         const res = await axios.post(baseUrl + "/register", {
        //     username: e.target.username.value, 
        //     email: e.target.email.value,
        //     password: e.target.password.value,
        //     type: "user",
        //     isLogged: false,
        // });
        //         console.log(res.data);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // };
        // sendNewUser();
    }
    useEffect( () => {

    }, [])

    return(
        <div className="container">
            <div className="justify-content align-center">
        <form className="form-horizontal col-md-4"
            onSubmit={e => handleFormSubmit(e)}
        >
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Email" required />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
    )
}