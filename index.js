const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skavyabba@gmail.com",
    pass: "lzbc layz efpk gwpm"
  }
});

app.get("/", (req, res) => {
  res.send("App is running on port 3000...");
});

app.post("/mail", async (req, res) => {
  const { msg, sub, emailList } = req.body;
  
  try {
    for (let i = 0; i < emailList.length; i++) {
      await transporter.sendMail({
        from: "skavyabba@gmail.com",
        to: emailList[i],
        subject: sub,
        text: msg
      });
    }
    res.status(200).send("✅ Emails Sent Successfully");
  } catch (error) {
    console.error("❌ Failed to send emails:", error);
    res.status(500).send("❌ Failed to send emails");
  }
});

app.listen(3000, () => {
  console.log("✅ App started on port 3000");
});