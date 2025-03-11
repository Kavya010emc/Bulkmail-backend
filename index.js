const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer")
require('dotenv').config();

const app = express();
app.use(express.json());

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
    res.status(200).json({ success: true, message: "✅ Emails sent successfully!" });
  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ success: false, message: "❌ Failed to send emails.", error });
  }
});

app.listen(3000, () => {
  console.log("✅ Backend running on port 3000");
});

const mongoose = require("mongoose")
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));



mongoose.connect("mongodb://127.0.0.1:27017/passkey")
.then(() => {
    console.log("✅ Connected to MongoDB database");
}).catch((err) => {
    console.log("❌ Failed to connect to MongoDB", err);
});


//creating model
const credential = mongoose.model("credential", {}, "bulkmail")

// ✅ Send Bulk Emails
app.post("/sendmail", async (req, res) => {
    const { msg, emailList } = req.body;

    credential.find().then(function (data) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass,
            },
        });

        new Promise(async function (resolve, reject) {
            try {
                let successCount = 0;
                for (let i = 0; i < emailList.length; i++) {
                    await transporter.sendMail({
                        from: "skavyabba@gmail.com",
                        to: emailList[i],
                        subject: "Bulk Mail from App",
                        text: msg
                    });
                    successCount++;
                }
                res.status(200).json({ successCount });
            } catch (error) {
                console.log(error);
                res.status(500).send("Failed to send emails");
            }
        })

    }).catch(function (error) {
        console.log(error)
    })

});

app.listen(5000, () => {
    console.log("Server started on port 5000...");
})
