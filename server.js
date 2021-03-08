const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect Database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the contact keeper API..." })
);
//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.port || 500;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
