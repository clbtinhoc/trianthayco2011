const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/:name', (req, res)=>{
    // res.send(wishes) with wishes is the wishes data get from collection Content in document req.params.name
    console.log(req.params.name)
    admin.firestore().collection('Content').doc(req.params.name).get().then(doc=>{
        if(doc.exists){
            res.send(doc.data().wishes)
        }else{
            res.send("No wishes found")
        }
    }
    )
    

})

module.exports = router;