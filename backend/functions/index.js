const functions = require("firebase-functions");
const cors = require('cors')
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const admin = require("firebase-admin");
admin.initializeApp();
// Use cors for app
app.use(cors({ origin: true }));
// Use bodyparser for app
app.use(bodyParser.json());

const add = require('./src/add');
const getTeacherNames = require('./src/getTeacherNames')
const getWishes = require('./src/getWishes');
const getWish = require('./src/getWish');
app.use('/', add);
app.use('/', getTeacherNames);
app.use('/getWishes', getWishes);
app.use('/getWishes', getWish);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

exports.api = functions.region('asia-east2').https.onRequest(app);