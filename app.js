require("dotenv").config();
require("./db/conn");
const express = require("express");
const cors = require("cors");
const router = require("./Routes/router");
const dbProjects = require("./models/projectSchema");
const app = express();
const port = process.env.PORT || 8000; 

app.use(cors());
app.use(express.json());
app.use(router)

app.get("/",(req, res) => {
    res.status(200).json("Server started at port :: " + port);
});


app.listen(port, () => {
    console.log("Server started at port :: " + port);
})