const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

var corsOptions = {
  origin: ["https://bulkmail-kavya-htkbmzu4s-kavyas-projects-fffd4e21.vercel.app"]
};
app.use(cors(corsOptions));

// ✅ Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skavyabba@gmail.com",
    pass: "lzbc layz efpk gwpm"
  }
});

app.post("/sendmail", async (req, res) => {
  const { emails, msg } = req.body;
  let successCount = 0;
  let failureCount = 0;
  let failedEmails = [];

  for (let email of emails) {
    const mailOptions = {
      from: "skavyabba@gmail.com",
      to: email,
      subject: "Bulk Email from BulkMail App",
      text: msg
    };

    try {
      await transporter.sendMail(mailOptions);
      successCount++;
    } catch (error) {
      failureCount++;
      failedEmails.push(email);
    }
  }

  res.status(200).send({
    status: "Completed",
    total: emails.length,
    success: successCount,
    failed: failureCount,
    failedEmails
  });
});

app.listen(3000, () => {
  console.log("✅ Server started at http://localhost:3000");
});