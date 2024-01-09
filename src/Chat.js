import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile,MoreVertOutlined, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';

const Chat = () => {
    const[input,setInput] = useState("");
    const[seed,setSeed] = useState("");
    const [roomName,setRoomName] = useState("");
    const {roomId }  = useParams();
    const [messages,setMessages] = useState([]);
    const [ { user }, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ));
            db.collection("rooms").doc(roomId)
            .collection("messages")
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
        }
    },[roomId]);

    useEffect(() => {
            setSeed(Math.floor(Math.random() * 5000));
    },[]);  

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    return (
        <div className='flex-[0.65] flex flex-col'>
            <div className='p-5 flex items-center border-b-2 border-b-gray-300'>
                <Avatar src={`https://api.multiavatar.com/${seed}.svg`} />
                <div className='flex-1 pl-5'>
                    <h1 className='text-base font-bold mb-[3px] '>{roomName}</h1>
                    <p className='text-gray-500'>
                        last seen{" "}
                        {new Date(
                            messages[messages.length-1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className='flex justify-between min-w-[100px]'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlined />
                    </IconButton>
                </div>
            </div>
            <div className='flex-1 bg-[url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")] bg-repeat bg-center p-[30px] overflow-scroll'>
                {messages.map((message) => (

                        <p className={`relative text-base p-[10px] ${message.name === user.displayName ? " bg-[#dcf8c6] ml-auto" : " bg-white ml-0"} rounded-lg w-fit mb-[30px] ml-auto`}>
                            <span className='absolute -top-[16px] font-extrabold text-xs'>
                                {message.name}
                            </span>
                            {message.message}
                            <span className='ml-[10px] text-[10px]'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>
                ))}
                
            </div>
            <div className='flex justify-between items-center h-[62px] border-t-2 border-t-gray-300 p-[10px] gap-3 text-gray-500'>
                <InsertEmoticonIcon />
                <form className='flex-1 flex'>
                    <input value={input} onChange={(e) => {setInput(e.target.value)}} className='flex-1 rounded-[30px] p-[10px] text-black border-none
                    ' placeholder='Type a message' type='text' />
                    <button type="submit" onClick={sendMessage} className='hidden'>Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;
