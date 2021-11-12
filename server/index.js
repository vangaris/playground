const express = require("express");
require("./db/mongoose"); // grab everything from this file and check if the db is connected


const userRouter = require('./routers/user')
const examinationRouter = require('./routers/examination')
const cors = require("cors")

const app = express(); // getting express
const port = process.env.PORT || 3000; //heroku if does not exists go locally

app.use(express.json()); //post man object
app.use(userRouter)
app.use(examinationRouter)
app.use(cors())






app.listen(port, () => {
    console.log("Server is up on port: " + port);
});

