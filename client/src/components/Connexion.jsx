import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Connexion( {setUser, user, setUserLogged, setIsLoading, baseUrl } ) {
    
  // const handleSubmitForm = (e) => {
  // e.preventDefault();
  // console.log("click!")
  // }
  // GET all data
  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("click!")

    e.persist();
    setUser({
      username: e.target.username.value,
      password: e.target.password.value,
    })
    checkUser();
  };
// 
  const checkUser = () => {
    axios.post( baseUrl, user)
    .then((res) => {
      // console.log(res.data)
    // console.log(res.data);
    console.log(res.data);
// 
      // setUser(username)
    })
    .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  }
// 
  useEffect( () => {
    // checkUser();
  }, []);

  return(
    <form className="form" 
    onSubmit={(e) =>  { handleSubmitForm(e) } }
    >
      <label htmlFor="username">Username : </label>
      <input 
        type="text" name="username" id="username" placeholder="Username"
        // onChange={ (e) => {
          // setUser(e.target.value) 
        // } }
      />
      <label htmlFor="password">Password : </label>
      <input type="password" name="password" id="password" placeholder="Password" required />
      <input type="submit" name="submit" onSubmit={(e) =>  { handleSubmitForm(e) } } required/>
    </form>
  );
}