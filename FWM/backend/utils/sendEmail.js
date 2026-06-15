const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (to, subject, message) => {
    try {
        await transporter.sendMail({
            from: `"Food Waste Management" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            text: message,
        });

        console.log("Email sent successfully");
    } 
    catch (error) {
        console.log("Email failed:", error);
    }
};

module.exports = sendEmail;