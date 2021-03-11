const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//connect Database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

// app.get("/", (req, res) =>
//   res.json({ msg: "Welcome to the contact keeper API..." })
// );
//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder for display UI
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.port || 500;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
