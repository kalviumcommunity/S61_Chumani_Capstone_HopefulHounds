// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   ChakraProvider,
//   Box,
//   Flex,
//   Heading,
//   Spinner,
//   Text,
//   VStack,
//   Grid,
//   GridItem,
//   useToast
// } from '@chakra-ui/react';
// import './Hospital.css';
// import image20 from '../../../assets/Capstone-1/image-20.jpg'
// import NavbarFooter from '../NavbarFooterComponent/NavbarFooter';
// import Footer from '../NavbarFooterComponent/Footer';

// function Hospital() {
//   const [entities, setEntities] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [filteredHospitals, setFilteredHospitals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const toast = useToast();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:4000/api/hospital/read');
//         setEntities(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch data. Please try again later.');
//         toast({
//           title: 'Error fetching data.',
//           description: 'Failed to fetch data. Please try again later.',
//           status: 'error',
//           duration: 5000,
//           isClosable: true,
//         });
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [toast]);

//   const handlePlaceClick = (place) => {
//     setSelectedPlace(place);
//     const filteredEntity = entities.find((entity) => entity.city === place || entity.state === place);
//     if (filteredEntity) {
//       setFilteredHospitals(filteredEntity.hospitals.length ? filteredEntity.hospitals : filteredEntity.clinics);
//     } else {
//       setFilteredHospitals([]);
//     }
//   };

//   return (
//     <div>
//       <NavbarFooter />
//     <ChakraProvider>
      
//       <Box
//         className="place"
//         minH="120vh"
//         bgImage={image20}
//         bgPos="center"
//         bgRepeat="no-repeat"
//         bgSize="cover"
//         color="white"
//         p={10}
//         marginTop={10}
//       >
//                 <VStack spacing={8} align="start">
//           <Heading>Choose your location</Heading>
//           {loading ? (
//             <Spinner size="xl" />
//           ) : error ? (
//             <Text>{error}</Text>
//           ) : (
//             <Flex wrap="wrap" gap={6} mt={4}>
//               {entities.map((entity) => (
//                 <Box
//                   key={entity._id}
//                   bg="whiteAlpha.900"
//                   color="black"
//                   p={5}
//                   shadow="md"
//                   borderWidth="1px"
//                   borderRadius="md"
//                   cursor="pointer"
//                   _hover={{ bg: "teal.100" }}
//                   onClick={() => handlePlaceClick(entity.city)}
//                 >
//                   <Text><strong>City:</strong> {entity.city}</Text>
//                   <Text><strong>State:</strong> {entity.state}</Text>
//                 </Box>
//               ))}
//             </Flex>
//           )}
//         </VStack>
//         {selectedPlace && entities.length > 0 && (
//           <Box w="100%" mt={8}>
//             <Heading size="md">Hospitals in {selectedPlace}</Heading>
//             <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6} mt={4}>
//               {filteredHospitals.map((hospital, index) => (
//                 <GridItem key={index}>
//                   <Box
//                     bg="whiteAlpha.900"
//                     color="black"
//                     p={5}
//                     shadow="md"
//                     borderWidth="1px"
//                     borderRadius="md"
//                   >
//                     <Text><strong>Name:</strong> {hospital.name}</Text>
//                     <Text><strong>Address:</strong> {hospital.address.street}, {hospital.address.area}, {hospital.address.pin_code}</Text>
//                     <Text><strong>Contact:</strong> {hospital.address.phone}</Text>
//                   </Box>
//                 </GridItem>
//               ))}
//             </Grid>
//           </Box>
//         )}
//       </Box>
//     </ChakraProvider>
//     <Footer />
//     </div>
    
//   );
// }

// export default Hospital;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
  Grid,
  GridItem,
  useToast
} from '@chakra-ui/react';
import './Hospital.css';
import image20 from '../../../assets/Capstone-1/image-20.jpg';
import NavbarFooter from '../NavbarFooterComponent/NavbarFooter';
import Footer from '../NavbarFooterComponent/Footer';

function Hospital() {
  const [entities, setEntities] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/hospital/read');
        setEntities(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        toast({
          title: 'Error fetching data.',
          description: 'Failed to fetch data. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    const filteredEntity = entities.find((entity) => entity.city === place || entity.state === place);
    if (filteredEntity) {
      setFilteredHospitals(filteredEntity.hospitals.length ? filteredEntity.hospitals : filteredEntity.clinics);
    } else {
      setFilteredHospitals([]);
    }
  };

  return (
    <div className="hospitalContainer">
      <NavbarFooter />
      <ChakraProvider>
        <Box
          className="place"
          minH="120vh"
          bgImage={image20}
          bgPos="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          color="white"
          p={10}
          marginTop={10}
        >
          <VStack spacing={8} align="start">
            <Heading>Choose your location</Heading>
            {loading ? (
              <Spinner size="xl" />
            ) : error ? (
              <Text>{error}</Text>
            ) : (
              <Flex wrap="wrap" gap={6} mt={4}>
                {entities.map((entity) => (
                  <Box
                    key={entity._id}
                    bg="whiteAlpha.900"
                    color="black"
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ bg: "teal.100" }}
                    onClick={() => handlePlaceClick(entity.city)}
                  >
                    <Text><strong>City:</strong> {entity.city}</Text>
                    <Text><strong>State:</strong> {entity.state}</Text>
                  </Box>
                ))}
              </Flex>
            )}
          </VStack>
          {selectedPlace && entities.length > 0 && (
            <Box w="100%" mt={8}>
              <Heading size="md">Hospitals in {selectedPlace}</Heading>
              <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6} mt={4}>
                {filteredHospitals.map((hospital, index) => (
                  <GridItem key={index}>
                    <Box
                      bg="whiteAlpha.900"
                      color="black"
                      p={5}
                      shadow="md"
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <Text><strong>Name:</strong> {hospital.name}</Text>
                      <Text><strong>Address:</strong> {hospital.address.street}, {hospital.address.area}, {hospital.address.pin_code}</Text>
                      <Text><strong>Contact:</strong> {hospital.address.phone}</Text>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </ChakraProvider>
      <Footer />
    </div>
  );
}

export default Hospital;

