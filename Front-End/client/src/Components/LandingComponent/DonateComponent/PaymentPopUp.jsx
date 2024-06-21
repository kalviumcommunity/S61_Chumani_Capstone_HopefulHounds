import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { ChakraProvider, Box, Button, Flex, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';

function PaymentPopUp({clientSecret, onPaymentSuccess}) {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentRequest, setPaymentRequest] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        if(stripe){
            const pr = stripe.paymentRequest({
                country: 'IN',
                currency: 'inr',
                total: {
                    label: 'Total',
                    amount: 5000,
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });
            pr.canMakePayment().then((result) => {
                if(result){
                    setPaymentRequest(pr);
                }
            });
            pr.on('paymentmethod', async (ev) => {
                try{
                    const {error} = await stripe.confirmCardPayment(
                        clientSecret,
                        {
                            payment_method: ev.paymentMethod.id,
                        },
                        {handleActions: false}
                    );
                    if(error){
                        console.error("Error confirming card payment:", error);
                        ev.complete('fail');
                        setPaymentStatus(`Payment failed: ${error.message}`)
                    }else{
                        ev.complete('success');
                        setPaymentStatus('Payment succeeded!');
                        onPaymentSuccess();
                    }
                }catch(error){
                    console.error('Error confirming card payment', error);
                    ev.complete('fail');
                    setPaymentStatus(`Payment failed: ${error.message}`)
                }
            });
        }
    }, [clientSecret, stripe, onPaymentSuccess]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const cardElement = elements.getElement(CardElement);

        const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        })
        if(error){
            setPaymentStatus(`Payment failed: ${error.message}`);
        }else if(paymentIntent.status === 'succeeded'){
            setPaymentStatus('Payment succeeded!');
            onPaymentSuccess();
        }
    }

  return (
    <Box maxW="500px" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="md" boxShadow="md">
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Card Details</FormLabel>
                    <Box p={2} borderWidth={1} borderRadius="md">
                        <CardElement className='card-element'/>
                    </Box>
                </FormControl>
                <Button colorScheme="teal" onClick={handleSubmit}>
                    Pay with Card
                </Button>
                <Text color={paymentStatus.includes('succeeded') ? 'green.500' : 'red.500'} className='payment-status'>
                    {paymentStatus}
                </Text>
            </VStack>
            {paymentRequest && (
                <Box mt={5}>
                    <PaymentRequestButtonElement options={{ paymentRequest }} />
                </Box>
            )}
        </Box>
  );
}

export default PaymentPopUp;
