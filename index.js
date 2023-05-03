const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT;
app.use(express.json());
app.use(errorHandler);

app.use("/api", require("./routes/contactRoutes.js"));
app.use("/user", require("./routes/userRoutes.js"));

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
