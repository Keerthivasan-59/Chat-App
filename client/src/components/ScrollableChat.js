import React, { useState } from "react";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogic";
import { Avatar, Tooltip, useDisclosure } from "@chakra-ui/react";
import ShowProfileModal from "./ShowProfileModal";

const ScrollableChat = ({ messages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showProfile, setShowProfile] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile")).result;

  const ShowProfileModal = ({ user }) => {
    return (
      <>
        <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent h="410px">
            <ModalHeader
              fontFamily="Work sans"
              fontSize="40px"
              display="flex"
              justifyContent="center"
            >
              {user?.name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <Image
                borderRadius="full"
                boxSize="150px"
                src={
                  user.pic
                    ? user.pic
                    : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt={user.name}
              />
              <Text
                fontFamily="Work sans"
                fontSize={{ base: "24px", md: "28px" }}
              >
                Email: {user.email}{" "}
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <div style={{ overflowX: "hidden", overflowY: "auto" }}>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <>
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                    onClick={onOpen}
                  />
                </Tooltip>

                {/* <ShowProfileModal user={m.sender} /> */}
                {/* {console.log(m.sender)} */}
              </>
            )}

            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                display: "inline-block",
                maxWidth: "60%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
