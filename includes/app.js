const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
// const jwt = require('jsonwebtoken');

var app = express();

app.use(express.json({ limit: '300kb' }))
app.use(cors())
app.use(helmet())

module.exports = app
