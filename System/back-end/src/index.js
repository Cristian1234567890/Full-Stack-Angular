const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authRoute = require('./routes/auth')
var cors = require("cors");

const  dbURI = "mongodb://mongodb/informacion"

/* next is just to test on local */
/* const  dbURI = "mongodb://localhost:27017/informacion" */


/* this is to control, specific CORS */
/* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

app.use(cors());

app.use(express.json())
app.use('/api/auth', authRoute)

mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        const db = mongoose.connection

        db.on("error", (err)=>{console.error(err)})
        db.once("open", () => {console.log("DB started successfully")})

        app.listen(2400, () => {console.log("Server started: 2400")})
    })
    .catch(e=>console.log("********* Error ********* "+e));