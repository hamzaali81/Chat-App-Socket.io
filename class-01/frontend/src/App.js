import './App.css';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { nanoid } from 'nanoid'

const socket = io("http://localhost:4000");
const username = nanoid(4);

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendChat = (e)=> {
    e.preventDefault();
    socket.emit("chat", {message,username});
    setMessage('')
  }

  useEffect(() => {
  socket.on("chat", (payload)=> {
    setChat([...chat, payload])
  })
  });

  console.log(chat);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
        {
          chat.map((payload, index)=> {
            return (
              <p key={index}>{payload.message}: <span style={{backgroundColor: "orange"}}>id: {payload.username}</span></p>
            )
          })
        }
        <form onSubmit={sendChat}> 
          <input placeholder='Send Message' type="text" value={message} onChange={(e)=> setMessage(e.target.value)}/>
          <button type="submit">Message</button>
        </form>

      </header>
    </div>
  );
}

export default App;
