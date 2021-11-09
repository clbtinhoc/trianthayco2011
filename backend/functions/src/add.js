const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
router.post('/add', (req, res) => {
    // Expected piece of data:
    // {
    //     "identity": {
    //         "name": "string" otherwise null,
    //         "class": "string" otherwise null,
    //         "year" : "string"
    //     },
    //     "content": {
    //         "wish": "string",
    //         "teacherName": "string"
    //     }
    // }
    // Escape everything in the data
    const data = JSON.parse(JSON.stringify(req.body));
    checkTeacherName(data.content.teacherName, () => {
        add(data);

    });
    res.send({
        status: 'success',
        message: 'Wish added'
    })

})


// Check if teacher's name exists in Content firebase collection as a function with paramenter teacherName
// If it does, then close function
// If it doesn't, create one
function checkTeacherName(teacherName, callback) {
    admin.firestore().collection('Content').doc(teacherName).get().then(doc => {
        if (doc.exists) {
            console.log('Teacher name exists');
            callback()
        } else {
            console.log('Teacher name does not exist');
            admin.firestore().collection('Content').doc(teacherName).set({
                wishes: [],
            })
            callback()
        }
    })
}

function add(data){
    admin.firestore().collection('Content').doc(data.content.teacherName).update({
        wishes: admin.firestore.FieldValue.arrayUnion({
            name: data.identity.name,
            wish: data.content.wish
        })
    })
}

module.exports = router;