import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useContext,useEffect } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { createChat, fetchUsers } from "../api";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { ChatContext } from "../Context/chatContext";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {setSelectedChat,chats,setChats}=useContext(ChatContext)
  const toast = useToast();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await fetchUsers(search);

        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    navigate("/");
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await fetchUsers(search);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  const accessChat = async (userId) => {
   try {
    setLoadingChat(true)

    const {data}=await createChat(userId)
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

    setSelectedChat(data)
    setLoadingChat(false)
   } catch (error) {
    console.log(error.message)
   }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      bg="white"
      p="5px 10px 5px 10px"
      borderWidth="5px"
    >
      <Tooltip label="Search users to Chat" hasArrow placement="bottom-end">
        <Button variant="ghost" onClick={onOpen}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <Text display={{ base: "none", md: "flex" }} px="4">
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize="2xl" fontFamily="Work sans">
        Chat App
      </Text>

      <Box>
        <Menu>
          <MenuButton>
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>

        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar
              cursor="pointer"
              size="sm"
              name={user.result.name}
              src={user.result.pic}
            />
          </MenuButton>
          <MenuList>
            <ProfileModal>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={4}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SideDrawer;
