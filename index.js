const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow requests from your frontend URL
app.use(cors({
  origin: "https://bulkmail-kavya.vercel.app",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.post("/send-mail", (req, res) => {
  const { email } = req.body;
  console.log("Email received:", email);
  res.json({ message: "Email sent successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
