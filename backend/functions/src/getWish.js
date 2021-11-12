const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/:name/:index', (req, res)=>{
    // res.send(wish) with wish is the data from array[index] from collection Content in document req.params.name
    admin.firestore().collection('Content').doc(req.params.name).get().then(doc=>{
        if(doc.exists){
            res.send(doc.data().wishes[parseInt(req.params.index)])
        }else{
            res.send('Error')
        }
    })
})

module.exports = router;