import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db from './firebase';
import { Link } from 'react-router-dom';

const SidebarChat = ({ id, name, addNewChat }) => {
    const[seed,setSeed] = useState('');
    const[messages,setMessages] =  useState("");

    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    },[id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    },[]);  

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");
        if(roomName != null){
            db.collection('rooms').add({
                name: roomName,
            })
        }
    }
    return !addNewChat ? (
        <Link to={`/rooms/${id}`} key={id}>
            <div className='flex p-5 cursor-pointer border-b-2 border-b-red-50 hover:bg-gray-200'>
                <Avatar src={`https://api.multiavatar.com/${seed}.svg`} />
                <div className='ml-[15px]'>
                    <h1 className='text-base mb-2 font-bold'>{name}</h1>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className='flex p-5 cursor-pointer border-b-2 border-b-red-50 hover:bg-gray-200'>
            <h2 className='font-bold'>Add new Chat</h2>
        </div>
    );
}

export default SidebarChat
