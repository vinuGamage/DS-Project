const express = require('express');
const router = express.Router();
const dialogPaymentControlller = require('../controllers/dialogPaymentController');

//Inserting dialog payment details with the help of the controller class
router.post('/',(req,res)=>{

    dialogPaymentControlller.insert(req.body).then(data=>{
        res.status(data.status).send({message:data.message});
    }).catch(err=>{
        res.status(err.status).send({message: err.message});
    })

});


module.exports = router;
