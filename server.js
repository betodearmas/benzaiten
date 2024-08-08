const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

// Endpoint to handle subscriptions
app.post("/subscribe", (req, res) => {
    const email = req.body.email;
    // Save the email to a file (or a database in a real-world scenario)
    fs.appendFile("subscribers.txt", email + "\n", (err) => {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(200).json({ message: "Subscription successful" });
            sendEmail(email, "Thank you for subscribing!");
        }
    });
});

// Function to send email
function sendEmail(to, subject) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-email-password"
        }
    });

    const mailOptions = {
        from: "your-email@gmail.com",
        to: to,
        subject: subject,
        text: "You'll now receive notifications for new articles."
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
