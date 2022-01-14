import React,{useState,useEffect} from 'react';
import "./Chat.css";
import {Avatar,IconButton} from "@material-ui/core";
import SearchOutLineIcon from "@material-ui/icons/SearchOutlined";
import AttechfileIcon from "@material-ui/icons/AttachFile";
import MorevertIcon from "@material-ui/icons/MoreVert";
import InsertimojiIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';


function Chat() {
    const [seed ,Setseed]= useState("");
    const [input,Setinput]=useState("");
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [Messages,setMessages] = useState([]);
    const [{user}]= useStateValue();
    
    useEffect(() => {
       if(roomId){
        db.collection("rooms").doc(roomId).onSnapshot(snapshot=>{
            setRoomName(snapshot.data().name)
        })
        db.collection("rooms").doc(roomId).
        collection("messages").orderBy("timestamp","asc").
        onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc)=>
                doc.data()
                ))
        );
       }

    }, [roomId]);
   

    useEffect(()=>{
        Setseed(Math.floor(Math.random()*5000));
    },[])

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log("you type input",input);
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        Setinput("");
    }

    return (
        <div className='chat'>
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`}/> 
            <div className="chat_headerInfo">
                <h2>{roomName}</h2>
                <p>
                    Last Seen{" "}
                    {
                        new Date(
                            Messages[Messages.length-1]?.timestamp?.toDate()
                        ).toUTCString()
                    }
                </p>
            </div>
            <div className="chat_headerRight">
             <IconButton>
             <SearchOutLineIcon/>
             </IconButton>
             <IconButton>
             <AttechfileIcon/>
             </IconButton>
             <IconButton>
             <MorevertIcon/>
             </IconButton>
            </div>
            </div>

            <div className="chat_body">
            {
                Messages.map((message)=>(
            <p className={`chat_messgage ${message.name === user.displayName && 'chat_reciever'}`}>
            <span key={message.id} className='chat_name'>{message.name}</span>
                 {message.message}
            <span className='chat_timestamp'>
            {
                new Date(message.timestamp?.toDate()).toUTCString()
            }
            </span>
            </p>
               
                ))
            }
            
            
            </div>

            <div className="chat_footer">
                <InsertimojiIcon/>
                <form>
                    <input value={input} onChange={e=>Setinput(e.target.value)} type="text" placeholder='Type a Message'/>
                    <button type="submit" onClick={sendMessage}>Send Message</button>
                </form>
                <MicIcon/>
            </div>

        </div>
    )
}

export default Chat;
