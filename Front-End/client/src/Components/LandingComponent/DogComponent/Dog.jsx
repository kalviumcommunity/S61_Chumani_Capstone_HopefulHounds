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
  background,
  color,
} from "@chakra-ui/react";

function Dog() {
  const [dogData, setDogData] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/read`)
      .then((response) => {
        console.log(response.data);
        setDogData(response.data.data);
      })
      .catch((error) => {
        console.log("Error fetching entities", error);
      });
  }, []);
  const handleDogClick = (dog) => {
    setSelectedDog(dog);
    onOpen();
  }
  return (
    <div className="data-container" >
      {dogData.map((dog) => (
        <div
          key={dog._id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)", textAlign:"center"}}
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
      <div style={{width:"500px"}}>
      {selectedDog && (
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom" >
          <ModalOverlay />
          <ModalContent style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", width:"500px", marginLeft:"30%"}}>
            <ModalHeader>Adopt {selectedDog.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div style={{ border: "1px solid black", margin: "10px", padding: "10px", color:"white" }}>
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
            <ModalFooter style={{justifyContent:"center"}}>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Adopt</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      </div>
    </div>
  );
}

export default Dog;
