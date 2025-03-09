const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow requests from your frontend URL
app.use(cors({
  origin: "https://bulkmail-kavya-1se8v0orp-kavya.vercel.app", // Your frontend URL
  methods: "GET,POST,PUT,DELETE",
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
