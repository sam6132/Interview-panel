const mongoose = require('mongoose');
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

mongoose.connect("mongodb+srv://admin:12345@cluster0-jqe8z.mongodb.net/interview-panel?retryWrites=true", {
    useNewUrlParser: true
}, () => {
    console.log("Connected to Mongodb at atlas")
})