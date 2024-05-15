import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Accessory.css';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button, Input, useColorModeValue } from '@chakra-ui/react';

function Accessory() {
    const [entities, setEntities] = useState([]);
    const [error, setError] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/accessory/read');
                console.log(response.data);
                setEntities(response.data.data);
            } catch (error) {
                console.error('Error fetching entities:', error);
                setError('Failed to fetch entities due to a network error. Please check your internet connection and try again.');
            }
        };

        fetchData();
    }, []);

    const handleBookNow = () => {
        onOpen(); // Open the drawer when "Book Now" button is clicked
    };

    return (
        <div>
            {error && <div>Error: {error}</div>}
            <div className='accessory-container'>
                {entities.map(entity => (
                    <div key={entity._id}>
                        {entity.image_links.map((image, index) => (
                            <div key={index} className='accessory'>
                                <img src={image} alt="" className='accessory-img' />
                                <button onClick={handleBookNow} colorScheme='teal' ref={index === 0 ? btnRef:null}>Book Now</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* DrawerExample component */}
            <DrawerExample isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </div>
    );
}

// DrawerExample component
function DrawerExample({ isOpen, onOpen, onClose }) {
    const btnRef = React.useRef();

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Type here...' />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Accessory;




