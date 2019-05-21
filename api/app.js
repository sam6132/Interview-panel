const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
// const user = require('./routes/user');

var app = express();
app.use(express.json())
app.use(cors())
// app.use(express.static(path.join(__dirname, './public')))


mongoose.connect("mongodb://localhost:27017/interview-panel", {
    useNewUrlParser: true
}, () => {
    console.log("Connected to Mongodb at port 27017")
})

// app.use("/api/user", user)



app.listen(3000, () => {
    console.log(`Listening to port ${"http://localhost:3000/"}`)
})