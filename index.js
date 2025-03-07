const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// ✅ FIXING CORS ERROR COMPLETELY
app.use(cors({
  origin: "https://bulkmail-kavya-1se8v0orp-kavyas-projects-fffd4e21.vercel.app/",  // ✅ Allow your frontend URL
  methods: ["POST", "GET"],
  credentials: true
}));

// ✅ Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skavyabba@gmail.com",
    pass: "lzbc layz efpk gwpm",
  },
});

// ✅ POST Route To Send Email
app.post("/sendmail", function (req, res) {
  const msg = req.body.msg;  // ✅ Get the message from frontend

  transporter.sendMail({
    from: "skavyabba@gmail.com",
    to: "skavyabba@gmail.com",  // ✅ You can change this to any recipient
    subject: "Message from Bulk Mail App",
    text: msg,
  },
  function (error, info) {
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
