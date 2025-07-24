const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your actual Gmail & App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ZaimaGull@gmail.com',
        pass: 'vuqk rtxz seom jxna' // Use Gmail App Password
    }
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        await transporter.sendMail({
            from: email,
            to: 'ZaimaGull@gmail.com', // Your receiving email
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        });

        res.json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send message. Try again later.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



