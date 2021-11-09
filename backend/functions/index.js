const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const cors = require('cors')
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
// Use cors for app
app.use(cors({ origin: true }));
// Use bodyparser for app
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

exports.api = functions.https.onRequest(app);