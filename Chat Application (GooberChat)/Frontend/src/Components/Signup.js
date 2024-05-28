import React, { useState } from 'react';
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmshow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
      toast({
        title: "Passwords must match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    
    try {
      const { data } = await axios.post("/api/user/register",{name, email, password});
      toast({
        title: "Registration successful",
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
  }

  return (
    <VStack spacing="5px" color="darkblue">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          borderColor="darkblue"
          onChange={(e) => {setName(e.target.value)}}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          borderColor="darkblue"
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
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            type={confirmShow ? "text" : "password"}
            borderColor="darkblue"
            placeholder="Enter your password"
            onChange={(e) => {setConfirmpassword(e.target.value)}}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => {setConfirmshow(!confirmShow);}}>
              {confirmShow ? "Hide" : "Show"}
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
        Sign up
      </Button>
    </VStack>
  );
}

export default Signup;
