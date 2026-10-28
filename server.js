
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();


app.use(express.json());


const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });
