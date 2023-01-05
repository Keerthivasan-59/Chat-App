import React from "react";
import { isLastMessage, isSameSender } from "../config/ChatLogic";
import {Avatar, Tooltip} from '@chakra-ui/react'

const ScrollableChat = ({messages}) => {
  const user=JSON.parse(localStorage.getItem('profile'))
  return (
    <div style={{ overflowX: "hidden", overflowY: "auto" }}>
      {messages &&
        messages.map((m, i) => (
          <div>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
          </div>
        ))}
    </div>
  ); 
};

export default ScrollableChat;
