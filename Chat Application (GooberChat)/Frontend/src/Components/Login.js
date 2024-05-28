import React, { useState } from 'react';
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "All fields needed",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    
    try {
      const { data } = await axios.post("/api/user/login",{email, password});
      toast({
        title: "Login successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch(error) {
      toast({
        title: "Error occurred",
        description: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  
  return (
    <VStack spacing="5px" color="darkblue">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          borderColor="darkbusterlue"
          onChange={(e) => {setEmail(e.target.value)}}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            borderColor="darkblue"
            placeholder="Enter your password"
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => {setShow(!show);}}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="green"
        width="100%"
        style={{marginTop: 15}}
        onClick={submitHandler}
        isLoading={loading}
      >
        Log in
      </Button>
    </VStack>
  );
}

export default Login;
