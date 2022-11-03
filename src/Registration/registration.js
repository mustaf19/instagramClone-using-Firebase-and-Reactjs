import { Button, Input } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import React from "react";
import './registration.css';
import { ReactDOM } from "react";
import {db,auth} from '../firebase';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { useState ,useEffect} from "react";
// import firebase from "../firebase/app";

const Registration =({email,password,username,setSignin,setEmail,setPassword,setUsername})=> {

    const onRegister =()=> {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            userCredential.displayName = username;
            const user = userCredential.user;
            console.log(user);
            setSignin(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }


    return(
        <div className="registrationApp">
            <h1>Register YourSelf</h1>
            <form className="">
            <label>Username</label><input type="text" onChange={(e)=> { setUsername(e.target.value); } }/><br/><br/>
                <label>Email   </label><input type="text" onChange={(e)=> { setEmail(e.target.value);  } }/><br/><br/>
                <label>Password</label><input type="password" onChange={(e)=> { setPassword(e.target.value); } }/><br/><br/>
                <Button variant="contained" color="secondary" onClick={onRegister} >Save and Register me!</Button>
            </form>
        </div>
    );
}

export default Registration;