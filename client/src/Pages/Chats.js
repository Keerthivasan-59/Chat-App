import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";

const Chats = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
const [fetchAgain,setFetchAgain]=useState(false)

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" p="10px" w='100%' h='91vh'>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default Chats;
