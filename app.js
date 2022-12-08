require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connection = require("./db");
const adminRoutes = require('./routes/adminRoutes');
const moderatorRoutes = require('./routes/moderatorRoutes');
const movieRoutes = require('./routes/movieRoutes');


const PORT = 4000;
const app = express();

//database connection 
connection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//routes
app.use(adminRoutes);
app.use(moderatorRoutes);
app.use(movieRoutes);



app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});