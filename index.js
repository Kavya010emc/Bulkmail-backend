const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// ✅ FIXING CORS ERROR COMPLETELY
var corsOptions = {
  origin: ["https://bulkmail-kavya-htkbmzu4s-kavyas-projects-fffd4e21.vercel.app"]
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://bulkmail-kavya-htkbmzu4s-kavyas-projects-fffd4e21.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://bulkmail-kavya-htkbmzu4s-kavyas-projects-fffd4e21.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send();
});

app.use(express.json());

// ✅ Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skavyabba@gmail.com",
    pass: "lzbc layz efpk gwpm"
  },
});

// ✅ POST Route To Send Emails to Multiple Users
app.post("/sendmail", function (req, res) {
  const { email, msg } = req.body; // ✅ Get email & message from frontend

  const mailOptions = {
    from: "skavyabba@gmail.com",
    to: email, // ✅ Now sending to dynamic emails
    subject: "Message from Bulk Mail App",
    text: msg,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("❌ Error Sending Email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("✅ Email Sent Successfully");
    }
  });
});

// ✅ Start Server
app.listen(3000, function () {
  console.log("✅ Server started at http://localhost:3000");
});