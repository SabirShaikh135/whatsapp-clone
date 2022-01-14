import React from 'react'
import "./Login.css"
import {Button} from "@material-ui/core";
import { auth,provider } from '../firebase';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Login() {
  const [{user},dispatch]= useStateValue();
    const signIn=()=>{
     auth.signInWithPopup(provider).then(result=>
        {
          console.log(result)
          dispatch({
            type:actionTypes.SET_USER,
            user:result.user,
          })
       
        }
        
        ).catch(error=>alert(error.message));
    }
    return (
        <div className='login'>
          <div className='login_container'>
            <img
                src='https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png'
                // src='./logo192.png'
                alt='logo'
            />
             <div className='login_text'>
                <h1>SignIn into WhatsApp</h1>
            </div>
            <Button onClick={signIn}>SignIn With Google</Button>
          </div>
        </div>
    )
}

export default Login
