const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
app.use(express.json());

// ✅ Use your environment variable for CORS
app.use(cors({
  origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN
}));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/mail", async (req, res) => {
  const { msg, sub, emailList } = req.body;
  
  try {
    for (let i = 0; i < emailList.length; i++) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailList[i],
        subject: sub,
        text: msg
      });
    }
    res.status(200).send(true);
  } catch (error) {
    res.status(500).send(false);
  }
});

app.listen(3000, () => {
  console.log("✅ Backend running on port 3000");
});