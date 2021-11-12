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
// }
function checkTeacherName(teacherName, callback){
    // Check if teacher's name exists in Content firebase collection, document teacherName, if it exists then call the callback, if not, create one 
    // with data {wishes: []} then call the callback
    admin.firestore().collection('Content').doc(teacherName).get().then(doc => {
        if (!doc.exists){
            admin.firestore().collection('Content').doc(teacherName).set({
                wishes: [],
            })
        }
        callback()
    }
    )


}
function add(data){
    admin.firestore().collection('Content').doc(data.content.teacherName).update({
        wishes: admin.firestore.FieldValue.arrayUnion({
            identity: data.identity,
            wish: data.content.wish
        })
    })
}

module.exports = router;
