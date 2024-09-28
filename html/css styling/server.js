const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your_stripe_secret_key'); // Replace with your actual key
const app = express();
const port = 3000;

// Only use body-parser once
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// Contact form route
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received contact form submission:', { name, email, message });
    res.send('Thank you for your message!');
});

// Payment route using Stripe
app.post('/payment', async (req, res) => {
    const { cardNumber, expiryDate, cvv } = req.body;

    try {
        // Create a Payment Intent using Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
        });

        // Send a success response
        res.send('Payment processed successfully!');
    } catch (error) {
        // Handle errors
        console.error('Payment error:', error);
        res.status(500).send('Payment failed'); 
    }
});

// Fuel consumption route
app.post('/fuel-consumption', (req, res) => {
    const { distance, fuelUsed } = req.body;
    const consumption = (fuelUsed / distance) * 100; // Liters per 100 km
    res.json({ consumption });
});

// Balance route 
let customerBalance = 100.00; // Example balance 

app.get('/balance', (req, res) => {
    res.json({ balance: customerBalance });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});