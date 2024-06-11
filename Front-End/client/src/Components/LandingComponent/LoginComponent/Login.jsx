import React, { useContext, useState } from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
  ChakraProvider,
} from "@chakra-ui/react";
import NavbarFooter from "../NavbarFooterComponent/NavbarFooter";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignOut,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { Navigate } from "react-router-dom";

function Login() {
  const { userLoggedIn, setUserLogIn } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    selectedFile: null,
  });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const toast = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      console.log("Email", formData.email);
      console.log("Password:", formData.password);
      await doSignInWithEmailAndPassword(formData.email, formData.password);
    }
  
    // Fetch admin details from the database
    try {
      const response = await fetch("http://localhost:4000/api/admin/profile");
      if (!response.ok) {
        throw new Error('Failed to fetch admin details');
      }
      const adminDetails = await response.json();
      console.log("line. 99", adminDetails);
  
      // Check if the input details match admin details
      const matchedAdmin = adminDetails.find(
        (admin) =>
          formData.email === admin.email && formData.password === admin.password
      );
  
      if (matchedAdmin) {
        console.log("The data matches.");
        localStorage.setItem("adminId", matchedAdmin._id);
        localStorage.setItem("adminEmail", matchedAdmin.email);
        localStorage.setItem("adminPassword", matchedAdmin.password);
        localStorage.setItem("IsAdmin", matchedAdmin.isAdmin);
  
        setUserLogIn(true);
        toast({
          title: "Successfully logged in as Admin!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // If the input details don't match admin, try user login
        const userResponse = await fetch("http://localhost:4000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
  
        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem("token", userData.token);
          setUserLogIn(true);
  
          if (userData.isAdmin) {
            localStorage.setItem('IsAdmin', userData.isAdmin);
            console.log('He is an admin');
          } else {
            localStorage.setItem('IsAdmin', false);
            console.log('He is not an admin');
          }
  
          toast({
            title: userData.message || "Logged in successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          const errorData = await userResponse.json();
          throw new Error(errorData.message || "Failed to log in");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: error.message || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsSigningIn(false);
    }
  };
  

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const result = await doSignInWithGoogle();
        const token = await result.user.getIdToken();

        const response = await fetch(
          "http://localhost:4000/api/user/firebaseLogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          setUserLogIn(true);
          toast({
            title: data.message || "Logged in successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to log in");
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: error.message || "An error occurred",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsSigningIn(false);
      }
    }
  };

  const handleLogout = async () => {
    await doSignOut();
    localStorage.removeItem("token");
    setUserLogIn(false);
    toast({
      title: "Logged out successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleFileChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedFile: event.target.files[0],
    }));
  };
  console.log(userLoggedIn);
  return (
    <div>
      {/* {userLoggedIn && <Navigate to={"/home"} replace={true} />} */}
      <NavbarFooter />
      <ChakraProvider>
        <Flex align="center" justify="center" height="100vh">
          <Flex direction="column" p={8} rounded={6} boxShadow="lg" bg="white">
            <Heading mb={4}>Login</Heading>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
            </FormControl>
            <FormControl id="email" mt={4} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </FormControl>
            <FormControl id="password" mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
            </FormControl>
            <FormControl id="file" mt={4}>
              <FormLabel>Upload Profile Picture</FormLabel>
              <Input type="file" onChange={handleFileChange} />
            </FormControl>
            {userLoggedIn ? (
              <Button colorScheme="red" mt={2} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button colorScheme="blue" mt={6} onClick={handleLogin}>
                  Login
                </Button>
                <Button colorScheme="blue" mt={2} onClick={onGoogleSignIn}>
                  Login with Google
                </Button>
              </>
            )}

            {selectedFile && (
              <Box mt={4}>
                <strong>Selected:</strong>
                {selectedFile.name}
              </Box>
            )}
          </Flex>
        </Flex>
      </ChakraProvider>
    </div>
  );
}

export default Login;
