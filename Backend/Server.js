const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const feynmanRoutes = require("./routes/feynman");

const app = express();

// Enable CORS for localhost:3000 (frontend)
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from the frontend
  methods: "GET, POST, PUT, DELETE", // Allow necessary methods
  allowedHeaders: "Content-Type, Authorization", // Allow necessary headers
};

app.use(cors(corsOptions)); // Use the cors options

app.use(bodyParser.json());

// Routes
app.use("/api/feynman", feynmanRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Study Assistant API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
