const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(bodyParser.json());
// API Endpoint for sending emails
app.post('/send-email', async (req, res) => {
const { to, subject, text } = req.body;
if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required fields' });
}
try {
// Create transporter
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});
// Send email
await transporter.sendMail({
    from: '"Angular App" <no-reply@example.com>', // Sender address
    to, // Receiver address
    subject, // Subject line
    text // Plain text body
});
res.status(200).json({ message: 'Email sent successfully!' });
} catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});