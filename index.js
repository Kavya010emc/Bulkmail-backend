const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

var corsOptions = {
  origin: ["https://bulkmail-kavya-htkbmzu4s-kavyas-projects-fffd4e21.vercel.app"]
};
app.use(cors(corsOptions));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skavyabba@gmail.com",
    pass: "lzbc layz efpk gwpm"
  }
});

app.post("/sendmail", function (req, res) {
  const { email, msg } = req.body;

  const mailOptions = {
    from: "skavyabba@gmail.com",
    to: email,
    subject: "Bulk Email from BulkMail App",
    text: msg
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", error: error.message });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({ status: "Success", info: info.response });
    }
  });
});

app.listen(3000, function () {
  console.log("✅ Server started");
});