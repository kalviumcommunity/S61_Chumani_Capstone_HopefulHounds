import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Accessory.css";
import NavbarFooter from "../NavbarFooterComponent/NavbarFooter";
import {
  Button,
  Box,
  Image,
  Text,
  VStack,
  ChakraProvider,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import image18 from "../../../assets/Capstone-1/image-18.webp";
import Footer from "../NavbarFooterComponent/Footer";

function Accessory() {
  const [entities, setEntities] = useState([]);
  const [error, setError] = useState(null);
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    imageLinks: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/accessory/read`
        );
        console.log(response.data);
        setEntities(response.data.data);
      } catch (error) {
        console.error("Error fetching entities:", error);
        setError(
          "Failed to fetch entities due to a network error. Please check your internet connection and try again."
        );
      }
    };

    fetchData();
  }, []);

  const handleBookNow = (entity) => {
    setSelectedEntity(entity);
    setIsDrawerOpen(true);
  };

  const handleAddAccessoryClick = () => {
    const isAdmin = localStorage.getItem("IsAdmin") === "true";
    if (isAdmin) {
      console.log("You can add accessory");
      openModal();
    } else {
      console.log("You cannot add accessory");
      toast({
        title: "You do not have access to add accessory",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try{
      const accessoryData = {
        image_links: formData.imageLinks.split(',')
      }
      const token = localStorage.getItem('token');
      if(!token){
        throw new Error('No token found.  Please log in again');
      }
      console.log('Token', token);
      const response = await axios.post("http://localhost:4000/api/accessory/create", accessoryData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Accessory added:', response.data);
      toast({
        title: 'Accessory added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      closeModal();
    }catch(error){
      console.error('Error adding accessory:', error);
      if(error.response){
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
        if(error.response.status == 401 || error.response.data.message === 'Invalid Token'){
          toast({
            title: 'Authentication error',
            description: 'Your session has expired or is invalid. Please log in again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }else{
          toast({
            title: 'Error adding accessory',
            description: error.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }else{
        console.error('Error message:', error.message);
      }
      toast({
        title: 'Error adding accessory',
        description: error.response ? error.response.data.message : error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <div>
      <NavbarFooter />
      <div className="accessory-wrapper">
        <div className="accessory-content">
          <div
            style={{
              backgroundImage: `url(${image18})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              overflowY: "auto",
              paddingTop: "60px", // Space for navbar
              paddingBottom: "90px", // Space for footer
            }}
          >
            <h1
              style={{
                fontSize: "30px",
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              ANIMAL ACCESSORIES
            </h1>
            <Button
              onClick={handleAddAccessoryClick}
              style={{
                border: "4px solid black",
                padding: "7px",
                borderRadius: "20px",
                backgroundColor: "#7e0081",
                color: "white",
                position: "relative",
                bottom: "10px",
              }}
            >
              Add Accessory
            </Button>
            <ChakraProvider>
              <Box p={5}>
                {error && <Box color="red.500">Error: {error}</Box>}
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="space-around"
                  gap={6}
                >
                  {entities.map((entity) => (
                    <Box
                      key={entity._id}
                      p={5}
                      shadow="md"
                      borderWidth="1px"
                      borderRadius="md"
                      width="300px"
                      bgColor="rgba(255,255,255,0.5)"
                    >
                      {entity.image_links.map((image, index) => (
                        <Box
                          key={index}
                          mb={4}
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                          alignItems="center"
                          minHeight="250px"
                        >
                          <Image
                            src={image}
                            alt=""
                            borderRadius="md"
                            height="200px"
                          />
                          {index === 0 && (
                            <Button
                              colorScheme="teal"
                              mt={2}
                              width="full"
                              onClick={() => handleBookNow(entity)}
                            >
                              Book Now
                            </Button>
                          )}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
                <Drawer
                  isOpen={isDrawerOpen}
                  placement="right"
                  onClose={() => setIsDrawerOpen(false)}
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerHeader>Book Accessory</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody>
                      <VStack spacing={4} align="start">
                        <Text>Name</Text>
                        <Input placeholder="Enter your name" />
                        <Text>Email Address</Text>
                        <Input placeholder="Enter your email address" />
                        <Text>Residence Address</Text>
                        <Input placeholder="Enter your residence address" />
                      </VStack>
                    </DrawerBody>
                    <DrawerFooter>
                      <Button
                        variant="outline"
                        mr={3}
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button colorScheme="blue">Save</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <form onSubmit={handleFormSubmit}>
                        <Text>Image Links:</Text>
                        <Input
                          type="text"
                          placeholder="Enter image links (comma-separated)"
                          value={formData.imageLinks}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              imageLinks: e.target.value,
                            })
                          }
                        />
                        {/* Add more input fields for other accessory details */}
                        <Button mt={4} colorScheme="blue" type="submit">
                          Submit
                        </Button>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={closeModal}>
                        Close
                      </Button>
                      {/* Add additional action buttons here */}
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accessory;
