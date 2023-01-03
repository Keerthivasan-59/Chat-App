import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { fetchChats } from "../api";
import { getSender } from "../config/ChatLogic";
import { ChatContext } from "../Context/chatContext";
import ChatLoading from "./ChatLoading";

const MyChats = () => {
  const {selectedChat,setSelectedChat,chats,setChats}=useContext(ChatContext)

  const loggedUser = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const Chats = async () => {
      try {
        const { data } = await fetchChats();
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    Chats();
  },[]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      overflowY='hidden'
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <Button
          d="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
      >
        {chats ? (
          <Stack overflow="scroll">
            {chats.map((c) => (
              <Box
                onClick={()=> setSelectedChat(c)}
                cursor="pointer"
                bg={selectedChat === c ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === c ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={c._id}
              >
                <Text>
                  {!c.isGroupChat? getSender(loggedUser,c.users): c.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
