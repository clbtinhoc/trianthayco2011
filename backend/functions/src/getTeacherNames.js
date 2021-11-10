const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get("/getTeacherNames", (req, res)=>{
    admin.firestore().collection("Content").get().then(snapshot => {
        let teachers = [];
        snapshot.forEach(doc => {
            teachers.push(doc.id);
        });
        res.send(teachers);
    });
})
module.exports = router;