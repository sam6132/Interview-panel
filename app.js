const express = require('express');
const cors = require('cors')
const path = require('path');
const user = require('./routes/user');
const candidate = require('./routes/candidate')
// const project = require('./routes/project');
const helmet = require('helmet')
const token = require('./routes/token');
var app = express();
app.use(express.json())
app.use(cors())
app.use(helmet())
// app.use(express.static(path.join(__dirname, './public')))

require('./includes/db');


app.use("/api/user", user)
app.use("/api/candidate", candidate)
app.use("/api/token", token)

// app.use("/api/project", project)




app.listen(5000, () => {
    console.log(`Listening to port ${"http://localhost:5000/"}`)
})