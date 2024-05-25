import React, { useState } from 'react';
import { Flex, Heading, FormControl, FormLabel, Input, Button, useToast, Box, ChakraProvider } from '@chakra-ui/react';
import NavbarFooter from '../NavbarFooterComponent/NavbarFooter';

function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const toast = useToast();

    const handleLogin = async (event) => {
        event.preventDefault();
        if (email && password) {
            try {
                const response = await fetch('http://localhost:4000/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
        
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    toast({
                        title: data.message || 'Logged in successfully!',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to log in');
                }
            } catch (error) {
                console.error('Error:', error);
                toast({
                    title: error.message || 'An error occurred',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: 'Please fill in both email and password fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };
      
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
  return (
    <div>
        <NavbarFooter />
    <ChakraProvider>
    <Flex align="center" justify="center" height="100vh">
        <Flex direction="column" p={8} rounded={6} boxShadow="lg" bg="white">
            <Heading mb={4}>Login</Heading>
            <FormControl id='name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id='email' mt={4} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id='password' mt={4} isRequired>
                <FormLabel>Password</FormLabel>
                <Input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <FormControl id='file' mt={4}>
                <FormLabel>Upload Profile Picture</FormLabel>
                <Input type='file'  onChange={handleFileChange} />
            </FormControl>
            <Button colorScheme='blue' mt={6} onClick={handleLogin}>
                Login
            </Button>
            {selectedFile && (
                <Box mt={4}>
                    <strong>Selected:</strong>{selectedFile.name}
                </Box>
            )}
        </Flex>
    </Flex>
    </ChakraProvider>
    </div>
  );
}

export default Login;
