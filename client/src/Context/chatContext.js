import React, { useState, createContext, useEffect } from "react";

export const ChatContext=createContext()

export const ChatProvider= (props)=>{
  const [selectedChat, setSelectedChat] = useState();
  const [chats,setChats]=useState()
  return (
    <ChatContext.Provider
      value={([selectedChat, setSelectedChat], [chats, setChats])}
    >
      {props.children}
    </ChatContext.Provider>
  );
}