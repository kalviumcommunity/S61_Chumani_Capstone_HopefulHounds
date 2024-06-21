import React, { useState } from "react";
import "./Donate.css";
import {
  ChakraProvider,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  Flex,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import NavbarFooter from "../NavbarFooterComponent/NavbarFooter";
import { useDonation } from "./DonationContext";
import Footer from "../NavbarFooterComponent/Footer";
import PaymentPopUp from "./PaymentPopUp";

function Donate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentPopupVisible, setIsPaymentPopupVisible] = useState(false);
  const toast = useToast();
  const { addDonation } = useDonation();
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = event.target.elements;
    const donationAmount = parseFloat(formData["donation-amount"].value);
    console.log(donationAmount);

    try {
      const response = await fetch("http://localhost:4000/api/stripe/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: donationAmount * 100 }),
      });
      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
        setIsPaymentPopupVisible(true);
      } else {
        console.error("Error creating payment intent", response.statusText);
        toast({
          title: "Error",
          description: "Error creating payment intent. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error creating payment intent", error);
      toast({
        title: "Error",
        description: "Error creating payment intent. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentPopupVisible(false);
    // addDonation(parseFloat(document.getElementById("donation-amount").value));
    toast({
      title: "Donation Successful",
      description: "Thank you for your donation!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setTimeout(() => {
      window.location.reload();
    },5000)
  };

  return (
    <div>
      <NavbarFooter />
      <div className="donate">
        <h1
          style={{
            fontSize: "30px",
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          DONATE AMOUNT
        </h1>
        <ChakraProvider>
          {/* <Flex minH="100vh" bg="gray.100"> */}
          <Box
            w="600px"
            bg="rgba(255,255,255,1)"
            p={4}
            boxShadow="md"
            position="fixed"
            top="40"
            left="10"
            bottom="44"
            overflowY="auto"
          >
            {!isPaymentPopupVisible ? (
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl id="full-name" isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" border="1px solid black" />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input type="email" border="1px solid black" />
                  </FormControl>
                  <FormControl id="phone" isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <Input type="tel" border="1px solid black" />
                  </FormControl>
                  <FormControl id="address" isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="text"
                      placeholder="Street Address"
                      mb={2}
                      border="1px solid black"
                    />
                    <Input
                      type="text"
                      placeholder="City"
                      mb={2}
                      border="1px solid black"
                    />
                    <Input
                      type="text"
                      placeholder="State"
                      mb={2}
                      border="1px solid black"
                    />
                    <Input
                      type="text"
                      placeholder="Zip Code"
                      border="1px solid black"
                    />
                  </FormControl>
                  <FormControl id="donation-amount" isRequired>
                    <FormLabel>Donation Amount</FormLabel>
                    <Input type="number" border="1px solid black" />
                  </FormControl>
                  <FormControl id="donation-frequency" isRequired>
                    <FormLabel>Donation Frequency</FormLabel>
                    <Select border="1px solid black">
                      <option value="one-time">One-time</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </Select>
                  </FormControl>

                  {/* Bank Transfer Details */}
                  <FormControl is="bank-transfer-details">
                    <FormLabel>Bank Transfer Details</FormLabel>
                    <input
                      type="text"
                      placeholder="Bank Account Number"
                      mb={2}
                    />
                    <input type="text" placeholder="Routing Number" />
                  </FormControl>

                  {/* PayPal Details */}
                  <FormControl id="paypal-details">
                    <FormLabel>PayPal Account</FormLabel>
                    <Input
                      type="email"
                      placeholder="PayPal Email"
                      border="1px solid black"
                    />
                  </FormControl>

                  <FormControl id="donation-designation">
                    <FormLabel>Donation Designation</FormLabel>
                    <Select border="1px solid black">
                      <option value="general-fund">General Fund</option>
                      <option value="specific-program">Specific Program</option>
                    </Select>
                  </FormControl>

                  <FormControl id="anonymous-donation">
                    <Checkbox border="1px solid black" />
                    Donate Anonymously
                  </FormControl>

                  <FormControl id="tax-receipt-preference">
                    <FormLabel>Tax Receipt Preference</FormLabel>
                    <Select border="1px solid black">
                      <option value="email">Email</option>
                      <option value="physical-mail">Physical Mail</option>
                    </Select>
                  </FormControl>

                  <FormControl id="employer-matching">
                    <FormLabel>Employer Matching Information</FormLabel>
                    <Input type="text" border="1px solid black" />
                  </FormControl>

                  <FormControl id="consent" isRequired>
                    <Checkbox border="1px solid black" /> I agree to the terms
                    and conditions
                  </FormControl>

                  <FormControl id="how-did-you-hear">
                    <FormLabel>How Did You Hear About Us</FormLabel>
                    <Input type="text" border="1px solid black" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Special Instructions or Comments</FormLabel>
                    <Textarea border="1px solid black" />
                  </FormControl>

                  <FormControl id="birthday">
                    <FormLabel>Birthday or Special Dates</FormLabel>
                    <Input type="date" border="1px solid black" />
                  </FormControl>

                  <Button
                    colorScheme="teal"
                    type="submit"
                    isDisabled={isLoading}
                    // onClick={createPaymentIntent}
                  >
                    Donate
                  </Button>
                  {clientSecret && <PaymentPopUp clientSecret={clientSecret} />}
                </Stack>
              </form>
            ) : (
              <PaymentPopUp clientSecret={clientSecret} onPaymentSuccess={handlePaymentSuccess}/>
            )}

            {isLoading && (
              <Box mt={4} textAlign="center">
                <CircularProgress isIndeterminate color="teal" />
              </Box>
            )}
          </Box>
          {/* </Flex> */}
        </ChakraProvider>
      </div>
      <Footer />
    </div>
  );
}

export default Donate;
