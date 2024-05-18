import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Dog.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import NavbarFooter from "../NavbarFooterComponent/NavbarFooter";
import Footer from "../NavbarFooterComponent/Footer";
// import dotenv from 'dotenv'
// dotenv.config();


function Dog() {
  const [dogData, setDogData] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/read`);
        setDogData(response.data.data);
      } catch (error) {
        console.error("Error fetching entities", error);
      }
    };
    fetchDogs();
  }, []);

  const handleDogClick = (dog) => {
    setSelectedDog(dog);
    onOpen();
  };

  const handleAdoptButtonClick = async () => {
    try{
      await axios.delete(`http://localhost:4000/api/delete/${selectedDog._id}`);
      setDogData(prevDogData => prevDogData.filter(dog => dog._id !== selectedDog._id));
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      },10000);
    }catch(error){
      console.error("Error deleting entity", error);
    }
    onClose();
  }

  return (
    <div>
    <NavbarFooter />
    <div className="dog">
      <h1>ADOPT</h1>
    <div className="data-container" style={{ textAlign: "center", marginTop: "20px" }}>
      {dogData.length === 0 && <p>Loading...</p>}
      {dogData.map((dog) => (
        <div
          key={dog._id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)", textAlign: "center", cursor:"pointer" }}
          onClick={() => handleDogClick(dog)}
        >
          <img src={dog.picture_link} alt={`${dog.name}`} style={{ width: "200px", height: "250px" }} />
          <h2>{dog.name}</h2>
          <p>
            <strong>Breed:</strong> {dog.breed}
          </p>
          <p>
            <strong>Age:</strong> {dog.age} years
          </p>
        </div>
      ))}
      {selectedDog && (
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", width: "500px", marginLeft: "30%" , textAlign:"center", height:"500px", position:"relative", top:"120px", overflowY:"auto"}}>
            <ModalHeader style={{fontSize:"25px", fontWeight:"bold"}}>Adopt {selectedDog.name}</ModalHeader>
            <ModalCloseButton style={{ position: "absolute", top: "0", right: "0",  height:"50px", width:"50px", color:"white", backgroundColor:"black"}}/>
            <ModalBody>
              <div style={{ margin: "10px", padding: "10px", color: "black", fontSize:"17px" }}>
                <img src={selectedDog.picture_link} alt={`${selectedDog.name}`} style={{ width: "200px", height: "auto" }} />
                <h2>{selectedDog.name}</h2>
                <p>
                  <strong>Adoption Status:</strong> {selectedDog.adoption_status}
                </p>
                <p>
                  <strong>Vaccinated:</strong> {selectedDog.vaccinated ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Description:</strong> {selectedDog.description}
                </p>
                <p>
                  <strong>Address:</strong> {selectedDog.address}
                </p>
              </div>
            </ModalBody>
            <ModalFooter style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button backgroundColor="black" mr={3} onClick={onClose} style={{width:"100px", height:"40px", color:"white", border:"none", borderRadius:"30px", fontWeight:"bold", fontSize:"15px"}}>
                Close
              </Button>
              <Button variant="ghost" style={{width:"100px", height:"40px", color:"white", border:"none", borderRadius:"30px", fontWeight:"bold", fontSize:"15px", backgroundColor:"black"}} onClick={handleAdoptButtonClick}>Adopt</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
    {showAlert && (
        <Alert status='success' style={{ marginTop: "20px", backgroundColor:"lightgreen", height:"60px", textAlign:"center", justifyContent:"center", position:"fixed", bottom:"20px", left:"50%", transform:"translateX(-50%)", backgroundColor:"lightgreen", zIndex:9999 }} >
          <AlertIcon style={{color:"green", height:"40px"}}/>
          <strong style={{color:"black", fontSize:"17px"}}> Dog Adopted successfully</strong>
        </Alert>
      )}
    </div>
    <Footer />
    </div>
  );
}

export default Dog;

