const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const route = require("./routes/routes.js")
const app = express();
app.use(multer().any());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://soumya-db:afdbyZgt3CyQporD@cluster0.gvqtfzu.mongodb.net/Lattice",
                    { useNewUrlParser: true})
.then(()=>console.log("Successfully Connected with Database"))
.catch((err)=>console.log(err))

app.use("/",route);

const port=3000;

app.listen(process.env.PORT || port, ()=>console.log("Server started on port",process.env.PORT || port));


