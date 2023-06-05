const express = require("express");
require("dotenv").config();
const app = express();
const url = process.env.URL_MONGODB;
const port = process.env.PORT;
const CommandeRoutes = require("./routes/commandesroute")
const connectTODB = require("./DB/db");


app.use(express.json());
app.use('/commandes', CommandeRoutes);

connectTODB(url);

app.listen(port,()=>{
    console.log("server connected in port 4000");
});
