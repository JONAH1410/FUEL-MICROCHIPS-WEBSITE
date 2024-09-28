document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Form submitted:', data);
        alert('Thank you for your message!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Fetch balance on page load
document.addEventListener('DOMContentLoaded', function() {
    fetch('/balance')
        .then(response => response.json())
        .then(data => {
            document.getElementById('balance-amount').textContent = `$${data.balance.toFixed(2)}`;
        })
        .catch(error => console.error('Error fetching balance:', error));
});

document.getElementById('fuel-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const distance = document.getElementById('distance').value;
    const fuelUsed = document.getElementById('fuel-used').value;

    fetch('/fuel-consumption', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ distance, fuelUsed })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('consumption-result').textContent = `Fuel Consumption: ${data.consumption.toFixed(2)} L/100km`;
    })
    .catch(error => console.error('Error calculating fuel consumption:', error));
});

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    fetch('/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cardNumber, expiryDate, cvv })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Payment response:', data);
        alert('Payment processed successfully!');
    })
    .catch(error => {
        console.error('Error processing payment:', error);
        alert('Payment failed');
    });
});
