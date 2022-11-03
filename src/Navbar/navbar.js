import React,{ useEffect, useState ,useStyles}  from 'react';
import ReactDOM from 'react-dom/client';
import { Input } from "@material-ui/core";
import './navbar.css'
import Modal from "@material-ui/core/Modal"
import Button from "@material-ui/core/Button";
import { auth, db } from "../firebase";



const Navbar = () =>{

    return(
        <div className='navbar'>
            <div className='navbarcomponents'>
                <div className='navbarlist'>
                    <ul className='unlist'>
                        <li className='list'>Home</li>
                        <li className='list'>Explore</li>
                        <li className='list'>Notifications</li>
                        <li className='list'>Settings</li>
                        <button className='navbar_button'>Sign in</button>
                    </ul>
                    
                </div>
            </div>
        </div>

    );
}

export default Navbar;
