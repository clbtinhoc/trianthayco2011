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
    let teacherName = data.content.teacherName
    // checkTeacherName(data.content.teacherName, data);

    admin.firestore().collection('Content').doc(teacherName).get().then(doc => {
        if (!doc.exists) {
            admin.firestore().collection('Content').doc(teacherName).set({
                wishes: [
                    {
                        identity: data.identity,
                        wish: data.content.wish
                    }
                ],
            })
            // Res.send array length of wishes firestore collection Content document teacherName
            admin.firestore().collection('Content').doc(teacherName).get().then(doc => {
                res.send(doc.data().wishes.length);
            }
            )

        }
        else {
            admin.firestore().collection('Content').doc(data.content.teacherName).update({
                wishes: admin.firestore.FieldValue.arrayUnion({
                    identity: data.identity,
                    wish: data.content.wish
                })
            })
            // Res.send array length of wishes firestore collection Content document teacherName
            admin.firestore().collection('Content').doc(teacherName).get().then(doc => {
                res.send(doc.data().wishes.length);
            }
            )
            
        }

    }
    ).catch(err => {
        res.send({
            status: 'failed',
            message: JSON.stringify(err.message),
        })
       // Get the error details.
         
    })

})


// Check if teacher's name exists in Content firebase collection as a function with paramenter teacherName
// }
function checkTeacherName(teacherName, data) {
    // Check if teacher's name exists in Content firebase collection, document teacherName, if it exists then call the callback, if not, create one 
    // with data {wishes: []} then call the callback
    admin.firestore().collection('Content').doc(teacherName).get().then(doc => {
        if (!doc.exists) {
            admin.firestore().collection('Content').doc(teacherName).set({
                wishes: [
                    {
                        identity: data.identity,
                        wish: data.content.wish
                    }
                ],
            })
        }
        else {
            admin.firestore().collection('Content').doc(data.content.teacherName).update({
                wishes: admin.firestore.FieldValue.arrayUnion({
                    identity: data.identity,
                    wish: data.content.wish
                })
            })
        }

    }
    )


}
function add(data) {
    admin.firestore().collection('Content').doc(data.content.teacherName).update({
        wishes: admin.firestore.FieldValue.arrayUnion({
            identity: data.identity,
            wish: data.content.wish
        })
    })
}

module.exports = router;
