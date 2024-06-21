const express = require('express');
const {Router} = require('express');
const { default: Stripe } = require('stripe');
const paymentRoute = express.Router();
const stripe = require('stripe')('sk_test_51PTJnb05BCKRvDvFvWtgLXIUkcTudCMmGHQtdNTFkE2LxTnm9p5uOELXFJ1JUX9zKYqPfymyhIiBWwLZ1DI4HEPC00Yio16R3F')
paymentRoute.use(express.json());

paymentRoute.post('/payment', async (req, res) => {
    const {amount} = req.body;
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr',
            payment_method_types: ['card'],
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    }catch(error){
        console.error('Error creating payment intent:', error.message);
        res.status(500).send({error: error.message});
    }
})

module.exports = paymentRoute;
