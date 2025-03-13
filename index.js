const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN || "http://localhost:5173",
}));

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/passkey")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Failed to connect to MongoDB", err));

// ✅ Define Credential Model
const Credential = mongoose.model("Credential", {}, "bulkmail");

// ✅ Send Single Email
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
    for (const email of emailList) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: sub,
        text: msg
      });
    }
    res.status(200).json({ success: true, message: "✅ Emails sent successfully!" });
  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ success: false, message: "❌ Failed to send emails.", error });
  }
});

// ✅ Send Bulk Emails (from MongoDB Credentials)
app.post("/sendmail", async (req, res) => {
  const { msg, emailList } = req.body;

  try {
    const credentials = await Credential.find();
    if (!credentials.length) {
      return res.status(500).json({ message: "❌ No email credentials found." });
    }

    const { user, pass } = credentials[0].toJSON();
    const bulkTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass }
    });

    let successCount = 0;
    for (const email of emailList) {
      await bulkTransporter.sendMail({
        from: user,
        to: email,
        subject: "Bulk Mail from App",
        text: msg
      });
      successCount++;
    }

    res.status(200).json({ success: true, successCount, message: `✅ Sent ${successCount} emails.` });
  } catch (error) {
    console.error("❌ Bulk Email Error:", error);
    res.status(500).json({ success: false, message: "❌ Failed to send bulk emails.", error });
  }
});

app.listen(5000, () => {
  console.log("✅ Server started on port 5000...");
});