const app = require('./includes/app')

const user = require('./routes/user');
const candidate = require('./routes/candidate')
const token = require('./routes/token');
const { PORT } = require('./config')
const http2 = require('http2')
const team = require('./routes/team');
const questions = require('./routes/questions');

require('./includes/db');


app.use("/api/user", user)
app.use("/api/candidate", candidate)
app.use("/api/token", token)
app.use("/api/team", team)
app.use("/api/question", questions)


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})


module.exports.app = app;