const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const users = require("./routes/users");
const cors = require("cors");
app.use(cors());

// Load the routes file to be able to use it
const apiRoutes = require("./routes/users");

// Express middleware
// To enable the server to accept requests from the Body of
// a request in a json format.
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the apiRoutes
app.use("/api", apiRoutes);

// app.get("/api", (request, response) => {
//   response.send("Hello world from Express!");
// });

app.listen(3001);
