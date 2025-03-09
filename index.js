const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// ✅ Allow requests from your frontend URL
const corsOptions = {
  origin: "https://bulkmail-kavya-htkbmzu4s-kavyas-projects-fffd4e21.vercel.app",
  credentials: true
};
app.use(cors(corsOptions));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skavyabba@gmail.com",
    pass: "lzbc layz efpk gwpm"
  }
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
    res.status(200).send(true);
  } catch (error) {
    res.status(500).send(false);
  }
});

app.listen(3000, () => {
  console.log("✅ Backend running on port 3000");
});