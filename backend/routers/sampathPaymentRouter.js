const sampathPaymentController = require('../controllers/sampathPaymentController');
const express = require('express');
const router = express.Router();

//inserting the user
router.post('/',(req,res)=>{
    sampathPaymentController.insert(req.body).then(data=>{
        res.status(data.status).send({message:data.message});
    }).catch(err=>{
        res.status(err.status).send({message: err.message});
    })
});

//invoking getAll() function in the trainController to get all details about trains
router.get('/',(req,res)=>{
    sampathPaymentController.getAll()
        .then(data=>{
            res.status(data.status).send({data:data.data});
        }).catch(err=>{
        res.status(data.status).send({message: err.message});
    })
});

module.exports = router;

