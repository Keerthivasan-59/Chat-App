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

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(form);
  return (
    <VStack spacing="10px" color="black">
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
