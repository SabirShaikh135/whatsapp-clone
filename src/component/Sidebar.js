import React from 'react';
import "./Sidebar.css";
import {Avatar,IconButton} from "@material-ui/core";
import DonutlargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MorevertIcon from "@material-ui/icons/MoreVert";
import SearchOutLineIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';
import { useState } from 'react';
import { useEffect } from 'react';
import db from '../firebase';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
function Sidebar() {
    const [rooms,setRooms]=useState([]);
    const [{user}]= useStateValue();
    useEffect(()=>{
        db.collection("rooms").onSnapshot((snapshot)=>(
            setRooms(snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data(),
            }))
           ))
        )
    },[])
   
    return (
        <div className='sidebar'>
        <div className="sidebar_header">
        <Avatar src={user?.photoURL}/>
        <div className="sidebar_headerRight">
        <IconButton>
        <DonutlargeIcon/>
        </IconButton>
        <IconButton>
        <ChatIcon/>
        </IconButton>
        <IconButton>
        <MorevertIcon/>
        </IconButton>
      </div>
        </div>
        <div className="sidebar_search">
        <div className="sidebar_searchContainer">
            <SearchOutLineIcon/>
            <input type="text" placeholder='Search or start new chats'/>
        </div>
        </div>
        <div className="sidebar_chats">
         <SidebarChat addNewChat/>
        {
            rooms.map(room=>(
                <SidebarChat key={room.id} 
                id={room.id} name={room.data.name}
                /> 
                
           
            ))}
        </div>
        </div>
    )
}

export default Sidebar;
