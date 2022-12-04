import { Avatar } from '@mui/material'
import React from 'react'
import './sideBarChat.css'
import avatarLongganisa from './longganisa.jpg'
const SidebarChat = () => {
  const lastSeen = new Date().toLocaleDateString()
  return (
    <div className='sidebarChat'>
        <Avatar src={avatarLongganisa}/>
        <div className='sidebarChat__info'>
            <h2> Longganisa Seller</h2>
            <p>Last Seen {lastSeen}</p>
        </div>
    </div>
  )
}

export default SidebarChat