const mongoose = require('mongoose');
//Configure mongoose's promise to global promise
// mongoose.promise = global.Promise;
// mongodb+srv://admin:12345@cluster0-jqe8z.mongodb.net/interview-panel?retryWrites=true
mongoose.connect("mongodb+srv://admin:12345@cluster0-jqe8z.mongodb.net/interview-panel?retryWrites=true", {
    useNewUrlParser: true
}, (err) => {
    if (err) return console.log('db not connected')
    console.log("Connected to Mongodb at atlas")
})