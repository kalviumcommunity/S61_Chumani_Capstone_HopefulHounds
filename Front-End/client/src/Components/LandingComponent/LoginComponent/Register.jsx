import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, Heading, useToast, ChakraProvider, Flex } from '@chakra-ui/react';

function Register() {
    const [registerUser, setRegisterUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const toast = useToast();

    const handleChange = (e, field) => {
        setRegisterUser({ ...registerUser, [field]: e.target.value });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("button clicked");
        try {
            const formData = new FormData();
            formData.append('username', registerUser.username);
            formData.append('email', registerUser.email);
            formData.append('password', registerUser.password);
            if (selectedFile) {
                formData.append('profilePicture', selectedFile);
            }

            const response = await axios.post('http://localhost:4000/api/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Response:", response);
            if (response.status === 201) {
                console.log('Registration successful');
                toast({
                    title: 'Registration successful.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else if (response.status === 409) {
                console.error('User already exists');
                toast({
                    title: 'User already exists.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                console.error('Unexpected response status:', response.status);
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('An error occurred while registering', error);
            toast({
                title: 'An error occurred.',
                description: 'Unable to register at this time.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <ChakraProvider>
            <Flex align="center" justify="center" height="100vh">
                <Flex direction="column" p={8} rounded={6} boxShadow="lg" bg="white">
                    <Heading mb={4}>Register</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" placeholder="Enter your username" value={registerUser.username} onChange={(e) => handleChange(e, "username")} />
                        </FormControl>
                        <FormControl id="email" mt={4} isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" placeholder="Enter your email" value={registerUser.email} onChange={(e) => handleChange(e, "email")} />
                        </FormControl>
                        <FormControl id="password" mt={4} isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Enter your password" value={registerUser.password} onChange={(e) => handleChange(e, "password")} />
                        </FormControl>
                        <FormControl id="file" mt={4}>
                            <FormLabel>Upload Profile Picture</FormLabel>
                            <Input type="file" onChange={handleFileChange} />
                        </FormControl>
                        <Button colorScheme="blue" mt={6} type="submit">Register</Button>
                        {selectedFile && (
                            <Box mt={4}>
                                <strong>Selected:</strong> {selectedFile.name}
                            </Box>
                        )}
                    </form>
                </Flex>
            </Flex>
        </ChakraProvider>
    );
}

export default Register;


