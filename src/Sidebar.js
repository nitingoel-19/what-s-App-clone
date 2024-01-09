import { Avatar, IconButton } from '@material-ui/core';
import { DonutLargeOutlined, MoreVertOutlined, SearchOutlined } from '@material-ui/icons';
import ChatIcon from "@material-ui/icons/Chat";
import React, { useState } from 'react';
import SidebarChat from './SidebarChat';
import { useEffect } from 'react';
import db from './firebase';
import { useStateValue } from './StateProvider';

const Sidebar = () => {
  const [rooms,setRooms] = useState([]);
  const[{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map((doc) => (
        {
          id: doc.id,
          data: doc.data(), 
        }
      )))
    ));
    return () => {
      unsubscribe();
    }
  },[]);

  return (
    <div className='flex flex-col flex-[0.35]'>
      <div className='flex justify-between p-5 border-r-2 border-gray-300'>
        <Avatar src={user?.photoURL}/>
        <div className='flex items-center justify-between min-w-[10vw]'>
          <IconButton className='mr-[2vw] !text-2xl'>
            <DonutLargeOutlined />
          </IconButton>
          <IconButton className='mr-[2vw] !text-2xl'>
            <ChatIcon />
          </IconButton>
          <IconButton className='mr-[2vw] !text-2xl'>
            <MoreVertOutlined />
          </IconButton>
        </div>
      </div>
      <div className='flex items-center bg-slate-100 h-[50px] p-[10px]'>
        <div className='flex items-center w-full h-[35px] bg-white rounded-[20px] text-gray-700 p-[10px]'>
          <SearchOutlined />
          <input className='border-none ml-[10px]' placeholder='Search or start new chat' type='text'/>
        </div>
      </div>
      <div className='bg-white flex-1 overflow-scroll'>
        <SidebarChat addNewChat/>
        {rooms.map((room) => (
          <SidebarChat key={room.id} id ={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
