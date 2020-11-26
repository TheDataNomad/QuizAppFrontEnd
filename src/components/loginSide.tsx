import React from 'react';
import { Redirect } from 'react-router-dom';
import {fetchLogin} from '../API';

export default function loginSide() {

    var user = localStorage.user;
    var pass = localStorage.pass;
    

    const completeLogin = async ()  => {
        const loginDetails = await fetchLogin(user,pass);
        console.log(loginDetails)
        if (loginDetails.message === "success") {
            return <Redirect to="/profile"/>
        } 
        
    }
    return (
        <div>
            {completeLogin()}
        </div>
    );
  }