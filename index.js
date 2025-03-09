const express = require("express");
const app = express();

app.use(express.json());

app.post("/send-mail", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://bulkmail-kavya-1se8v.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  res.send("Email sent");
});

app.listen(5000, () => console.log("Server running"));