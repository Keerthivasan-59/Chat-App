import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api";

const SignUp = () => {
  const [showpass, setshowpass] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const navigate=useNavigate()
  const toast=useToast()
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.email || !form.password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await signin(form);
      localStorage.setItem("profile", JSON.stringify(data));
      toast({
        title: 'Log In Successful',
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
      } else if (err.response?.status === 404) {
        toast({
          title: "Invalid Credentials",
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

      setIsLoading(false)
    }
  };
  return (
    <VStack spacing="10px" color="black">
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

      <Button
        colorScheme="teal"
        w="100%"
        onClick={handleSubmit}
        style={{ marginTop: 15 }}
      >
        Log In
      </Button>
    </VStack>
  );
};

export default SignUp;
