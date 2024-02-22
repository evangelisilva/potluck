const express = require("express")
const cors = require("cors")
const app = express();

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/_api/events",require("./components/events"))

app.listen(1200,()=>{
    console.log("Potluck Server started at the port: 1200");
})