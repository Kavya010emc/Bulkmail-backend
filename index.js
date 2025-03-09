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

// ✅ POST Route To Send Email
app.post("/sendmail", function (req, res) {
  const msg = req.body.msg; // ✅ Get the message from frontend

  transporter.sendMail({
    from: "skavyabba@gmail.com",
    to: "skavyabba@gmail.com",
    subject: "Message from Bulk Mail App",
    text: msg,
  }, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("❌ Error Sending Email");
    } else {
      console.log(info);
      res.status(200).send("✅ Email Sent Successfully");
    }
  });
});

// ✅ Start Server
app.listen(3000, function () {
  console.log("✅ Server started at http://localhost:3000");
});