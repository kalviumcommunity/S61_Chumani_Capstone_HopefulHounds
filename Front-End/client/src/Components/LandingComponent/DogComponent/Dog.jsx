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
  ChakraProvider,
} from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import NavbarFooter from "../NavbarFooterComponent/NavbarFooter";
import Footer from "../NavbarFooterComponent/Footer";

function Dog() {
  const [dogData, setDogData] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [updatedDog, setUpdatedDog] = useState(null);
  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose,
  } = useDisclosure();
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [newDog, setNewDog] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    vaccinated: false,
    description: "",
    address: "",
    picture_link: "",
  });

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
    setUpdatedDog({ ...dog });
    setIsUpdating(false);
    onDetailModalOpen();
  };

  const handleUpdateButtonClick = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/update/${selectedDog._id}`,
        updatedDog
      );
      setAlertMessage("Dog updated successfully");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      onDetailModalClose();
    } catch (error) {
      console.error("Error updating entity", error);
    }
  };

  const handleAdoptButtonClick = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/api/delete/${selectedDog._id}`
      );
      setDogData((prevDogData) =>
        prevDogData.filter((dog) => dog._id !== selectedDog._id)
      );
      setAlertMessage("Dog adopted successfully");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 10000);
    } catch (error) {
      console.error("Error deleting entity", error);
    }
    onDetailModalClose();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setUpdatedDog({ ...updatedDog, [name]: inputValue });
  };

  const handleNewDogInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setNewDog({ ...newDog, [name]: inputValue });
  };

  const handleAddDogClick = () => {
    setSelectedDog(null); // Reset selectedDog when adding a new dog
    setIsUpdating(false);
    setNewDog({
      name: "",
      breed: "",
      age: "",
      gender: "",
      vaccinated: false,
      description: "",
      address: "",
      picture_link: "",
    });
    onAddModalOpen();
  };

  const handleSubmitNewDog = async (e) => {
    e.preventDefault(); 
    try {
      await axios.post(`http://localhost:4000/api/create`, newDog);
      setAlertMessage("Dog added successfully");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      onAddModalClose();
    } catch (error) {
      console.error("Error creating new dog", error);
    }
  };

  return (
    <div>
      <NavbarFooter />
      <div className="dog">
        <h1>ADOPT</h1>
        <div
          style={{
            textAlign: "right",
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          <Button
            onClick={handleAddDogClick}
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
            Add Dog
          </Button>
        </div>
        <div
          className="data-container"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          {dogData.length === 0 && <p>Loading...</p>}
          {dogData.map((dog) => (
            <div
              key={dog._id}
              style={{
                border: "1px solid black",
                margin: "10px",
                padding: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => handleDogClick(dog)}
            >
              <img
                src={dog.picture_link}
                alt={`${dog.name}`}
                style={{ width: "200px", height: "250px", objectFit:"cover" , marginLeft:"145px"}}
              />
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
            <Modal
              isCentered
              onClose={onDetailModalClose}
              isOpen={isDetailModalOpen}
              motionPreset="slideInBottom"
            >
              <ModalOverlay />
              <ModalContent
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  width: "500px",
                  marginLeft: "30%",
                  textAlign: "center",
                  height: "500px",
                  position: "relative",
                  top: "120px",
                  overflowY: "auto",
                }}
              >
                <ModalHeader style={{ fontSize: "25px", fontWeight: "bold" }}>
                  {isUpdating
                    ? `Update ${selectedDog.name}`
                    : `Adopt ${selectedDog.name}`}
                </ModalHeader>
                <ModalCloseButton
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    height: "50px",
                    width: "50px",
                    color: "white",
                    backgroundColor: "black",
                  }}
                />
                <ModalBody>
                  <div
                    style={{
                      margin: "10px",
                      padding: "10px",
                      color: "black",
                      fontSize: "17px",
                    }}
                  >
                    <img
                      src={selectedDog.picture_link}
                      alt={`${selectedDog.name}`}
                      style={{ width: "200px", height: "auto" }}
                    />
                    <h2>{selectedDog.name}</h2>
                    {isUpdating ? (
                      <>
                        <input
                          type="text"
                          name="name"
                          value={updatedDog.name}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          name="breed"
                          value={updatedDog.breed}
                          onChange={handleInputChange}
                        />
                        <input
                          type="number"
                          name="age"
                          value={updatedDog.age}
                          onChange={handleInputChange}
                        />
                      </>
                    ) : (
                      <p>
                        <strong>Description:</strong> {selectedDog.description}
                      </p>
                    )}
                    <input
                      type="text"
                      name="adoption_status"
                      value={updatedDog.adoption_status}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="vaccinated"
                      value={updatedDog.vaccinated}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="address"
                      value={updatedDog.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </ModalBody>
                <ModalFooter
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  {isUpdating ? (
                    <Button
                      backgroundColor="black"
                      mr={3}
                      style={{
                        width: "100px",
                        height: "40px",
                        color: "white",
                        border: "none",
                        borderRadius: "30px",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                      onClick={handleUpdateButtonClick}
                    >
                      Update
                    </Button>
                  ) : (
                    <>
                      <Button
                        backgroundColor="black"
                        mr={3}
                        style={{
                          width: "100px",
                          height: "40px",
                          color: "white",
                          border: "none",
                          borderRadius: "30px",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                        onClick={handleAdoptButtonClick}
                      >
                        Adopt
                      </Button>
                      <Button
                        backgroundColor="black"
                        mr={3}
                        style={{
                          width: "100px",
                          height: "40px",
                          color: "white",
                          border: "none",
                          borderRadius: "30px",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                        onClick={() => setIsUpdating(true)}
                      >
                        Update
                      </Button>
                    </>
                  )}
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </div>
        {showAlert && (
          <Alert
            status="success"
            style={{
              marginTop: "20px",
              backgroundColor: "lightgreen",
              height: "60px",
              textAlign: "center",
              justifyContent: "center",
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "lightgreen",
              zIndex: 9999,
            }}
          >
            <AlertIcon style={{ color: "green", height: "40px" }} />
            <strong style={{ color: "black", fontSize: "17px" }}>
              {isUpdating
                ? "Dog Updated successfully"
                : "Dog Adopted successfully"}
            </strong>
          </Alert>
        )}
        <ChakraProvider>
          <Modal isOpen={isAddModalOpen} onClose={onAddModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add a New Dog</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmitNewDog}>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newDog.name}
                    onChange={handleNewDogInputChange}
                  />
                  <br />
                  <label>Breed:</label>
                  <input
                    type="text"
                    name="breed"
                    value={newDog.breed}
                    onChange={handleNewDogInputChange}
                  />
                  <br />
                  <label>Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={newDog.age}
                    onChange={handleNewDogInputChange}
                  />
                  <br />
                  <label>Gender:</label>
                  <input
                    type="text"
                    name="gender"
                    value={newDog.gender}
                    onChange={handleNewDogInputChange}
                  />
                  <br />
                  <label>Vaccinated:</label>
                  <input
                    type="checkbox"
                    name="vaccinated"
                    checked={newDog.vaccinated}
                    onChange={handleNewDogInputChange}
                  />
                  <br />
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={newDog.description}
                    onChange={handleNewDogInputChange}
                  />
                  <br />
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={newDog.address}
                    onChange={handleNewDogInputChange}
                  />
                  <br />
                  <label>Picture Link:</label>
                  <input
                    type="text"
                    name="picture_link"
                    value={newDog.picture_link}
                    onChange={handleNewDogInputChange}
                  />
                  <br />
                  <Button type="submit">Add Dog</Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </ChakraProvider>
      </div>
    </div>
  );
}

export default Dog;
