import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useToast } from "@chakra-ui/react";
import { signup } from "../../api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showpass, setshowpass] = useState(false);
  const [showconfpass, setshowconfpass] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast({
        title: "Passwords don't match",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false)
      return
    }

    try {
      const { data } = await signup(form);
      localStorage.setItem("profile", JSON.stringify(data));
      toast({
        title: 'Registration Successful',
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/chats");              
      setIsLoading(false);
    } catch (err) {
      if (!err?.response) {
        toast({
          title: "No Server Response",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else if (err.response?.status === 409) {
        toast({
          title: "User already exists",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }else {
        toast({
          title: "Registration Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <VStack spacing="10px" color="black">
      <FormControl isRequired id="first-name">
        <FormLabel color="blue.300">Name</FormLabel>
        <Input
          variant="filled"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired id="email">
        <FormLabel color="blue.300">Email</FormLabel>
        <Input
          name="email"
          variant="filled"
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired id="password">
        <FormLabel color="blue.300">Password</FormLabel>
        <InputGroup>
          <Input
            variant="filled"
            name="password"
            type={showpass ? "text" : "password"}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <InputRightElement w="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setshowpass(!showpass)}
            >
              {!showpass ? "Show" : "Hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired id="confirmPassword">
        <FormLabel color="blue.300">Confirm password</FormLabel>
        <InputGroup>
          <Input
            variant="filled"
            name="confirmPassword"
            type={showconfpass ? "text" : "password"}
            placeholder="Confirm your password"
            onChange={handleChange}
          />
          <InputRightElement w="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setshowconfpass((prev) => !showconfpass)}
            >
              {!showconfpass ? "Show" : "Hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired id="pic">
        <FormLabel color="blue.300">Upload your profile pic</FormLabel>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setForm({ ...form, pic: base64 })}
        />
      </FormControl>

      <Button
        colorScheme="teal"
        w="100%"
        onClick={handleSubmit}
        style={{ marginTop: 15 }}
        isLoading={IsLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
