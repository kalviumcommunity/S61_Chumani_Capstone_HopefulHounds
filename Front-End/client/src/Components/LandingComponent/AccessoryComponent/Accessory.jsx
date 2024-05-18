import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Accessory.css";
import NavbarFooter from "../NavbarFooterComponent/NavbarFooter";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Box,
  Image,
  Text,
  VStack,
  ChakraProvider
} from "@chakra-ui/react";
import image18 from '../../../assets/Capstone-1/image-18.webp';
import Footer from "../NavbarFooterComponent/Footer";

function Accessory() {
  const [entities, setEntities] = useState([]);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEntity, setSelectedEntity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/accessory/read`);
        console.log(response.data);
        setEntities(response.data.data);
      } catch (error) {
        console.error("Error fetching entities:", error);
        setError("Failed to fetch entities due to a network error. Please check your internet connection and try again.");
      }
    };

    fetchData();
  }, []);

  const handleBookNow = (entity) => {
    setSelectedEntity(entity);
    onOpen();
  };

  return (
    <div>
    <NavbarFooter />
    <div className="accessory-wrapper">
         {/* Ensure NavbarFooter is included here */}
      <div className="accessory-content">
        <div
          style={{
            backgroundImage: `url(${image18})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            overflowY: "auto",
            paddingTop: "60px", // Space for navbar
            paddingBottom: "90px" // Space for footer
          }}
        >
          <h1 style={{ fontSize: "30px", color: "white", textAlign: "center", fontWeight: "bold" }}>ANIMAL ACCESSORIES</h1>
          <ChakraProvider>
            <Box p={5}>
              {error && <Box color="red.500">Error: {error}</Box>}
              <Box display="flex" flexWrap="wrap" justifyContent="space-around" gap={6}>
                {entities.map((entity) => (
                  <Box key={entity._id} p={5} shadow="md" borderWidth="1px" borderRadius="md" width="300px" bgColor="rgba(255,255,255,0.5)">
                    {entity.image_links.map((image, index) => (
                      <Box key={index} mb={4} display="flex" justifyContent="center" flexDirection="column" alignItems="center" minHeight="250px">
                        <Image src={image} alt="" borderRadius="md" height="200px" />
                        {index === 0 && (
                          <Button colorScheme="teal" mt={2} width="full" onClick={() => handleBookNow(entity)}>
                            Book Now
                          </Button>
                        )}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
              <DrawerExample isOpen={isOpen} onClose={onClose} entity={selectedEntity} />
            </Box>
          </ChakraProvider>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

function DrawerExample({ isOpen, entity, onClose }) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Book Accessory</DrawerHeader>

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
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Accessory;


