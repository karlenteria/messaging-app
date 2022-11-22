import { Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import './chat.css'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import axios from '../axios'
import VideocamIcon from '@mui/icons-material/Videocam';
import avatarLongganisa from './longganisa.jpg'
import VideoCall from './VideoCall'

const Chat = ({messages}) => {
  const [input, setInput] = useState('')
  const [inCall, setInCall] = useState(false);
  const sendMessage = async (e) => {
    e.preventDefault();
    
    await axios.post('/messages/new', {
      message: input,
      name: 'Karl Levin',
      timestamp: new Date().toLocaleString(),
      received: false      
    });

    setInput('')
  };
  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={avatarLongganisa}/>

        <div className='chat__headerInfo'>
          <h3>Longganisa Seller</h3>
          <p>Last seen ...</p>
        </div>
        <div className='chat__headerRight' style={{height:'100%'}}>
        {inCall ? <VideoCall setInCall={setInCall}/> : <IconButton variant="contained" color="primary" onClick={ () => setInCall(true)}><VideocamIcon/></IconButton>}
          <IconButton>
                <SearchOutlinedIcon />
            </IconButton>
            <IconButton>
                <AttachFileIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </div>
      </div>  

      <div className='chat__body'>
       {messages.map((message) => (
            <p className={`chat__message ${message.received && "chat_receiver"}`}>
            <span className='chat__name'> {message.name}</span>
            {message.message}
            <span className='chat__timestamp'>
              {message.timestamp}
            </span>    
          </p>
      ))}
    
      </div>
      
      <div className='chat__footer'>
        <InsertEmoticonIcon/>
        <form>
        <input
          value={input} 
          onChange={e => setInput(e.target.value)}
          placeholder="Type a Message"
          type="text"/>
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon/>
      </div>
    </div>
  )
}

export default Chat