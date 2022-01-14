import React, { useEffect } from 'react';
import "./SidebarChat.css";
import {Avatar} from "@material-ui/core";
import { useState } from 'react';
import db from '../firebase';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
function SidebarChat({id,name,addNewChat}) {
const [seed ,Setseed]= useState("");
const [messages,setMessages]= useState("");
const [{user}] =useStateValue();
// console.log(name);
   
    useEffect(()=>{
      
        if(id){
            db.collection("rooms").doc(id).collection("messages").
            orderBy("timestamp","desc").onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc)=>
            doc.data()
            ))
            )
        }

     },[id])



    useEffect(()=>{
        Setseed(Math.floor(Math.random()*5000));
    },[])

//     useEffect(()=>{
//         const newUser=user.displayName;
//         if(newUser !== user.displayName){
//         db.collection("rooms").add({
//         name: newUser,
//     })
//    }
//     },[])

    const createCat=()=>{
        const roomname = prompt("please enter the name for chat");
        if(roomname){
            db.collection("rooms").add({
                name: roomname,
            });
        }
    }

    return !addNewChat ?(
        <Link to={`/rooms/${id}`}>
          <div className='sidebarChat'>
          <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`}/>  
          <div className="sidebarChat_info">
              <h2>{name}</h2>
              <p>{messages[0]?.message}</p>

          </div>
        </div>
        </Link>
      
    ) :(
        <div className='sidebarChat' onClick={createCat}>
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat
