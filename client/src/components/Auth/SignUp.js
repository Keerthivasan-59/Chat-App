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

const SignUp = () => {
  const [showpass, setshowpass] = useState(false);
  const [showconfpass, setshowconfpass] = useState(false);

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

  const handleSubmit=(e)=>{
   e.preventDefault()

  }
  console.log(form);
  return (
    <VStack spacing="10px" color="black">
      <FormControl isRequired id="first-name">
        <FormLabel>Name</FormLabel>
        <Input
          variant="filled"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          variant="filled"
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
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
        <FormLabel>Confirm password</FormLabel>
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
        <FormLabel>Upload your profile pic</FormLabel>
        <Input
          name="pic"
          // p={1.5}
          accept="image/*"
          type="file"
          onChange={handleChange}
          variant="unstyled"
        />
      </FormControl>

      <Button
        colorScheme="teal"
        w="100%"
        onClick={handleSubmit}
        style={{marginTop:15}}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
