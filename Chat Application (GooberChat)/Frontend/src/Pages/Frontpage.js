import React from 'react';
import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import Login from '../Components/Login'
import Signup from '../Components/Signup'

const Frontpage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
      	display="flex"
      	justifyContent="center"
      	p={3}
      	bg="bisque"
      	w="100%"
      	m="40px 0 15px 0"
      >
      	<Text fontSize="4xl" fontFamily="Cursive" color="darkblue">GooberChat</Text>
      </Box>
      <Box bg="bisque" w="100%" p={4} color="darkblue">
      	<Tabs variant='enclosed' borderColor="darkblue">
  	  <TabList mb="1em">
    	    <Tab width="50%">Login</Tab>
    	    <Tab width="50%">Sign Up</Tab>
  	  </TabList>
  	  <TabPanels>
    	    <TabPanel>
      	      <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Frontpage;
