const trainController = require('../controllers/trainController');
const express = require('express');
const router = express.Router();

//invoking getAll() function in the trainController to get all details about trains
router.get('/',(req,res)=>{
    trainController.getAll()
        .then(data=>{
            res.status(data.status).send({data:data.data});
        }).catch(err=>{
            res.status(data.status).send({message: err.message});
         })
});

//invoking getOne() function in the trainController to get train details according to the given train
router.get('/:trainName',(req,res)=>{
    trainController.getOne(req.params.trainName)
        .then(data=>{
            res.status(data.status).send({data:data.data});
        }).catch(err=>{
            res.status(err.status).send({message: err.message});
    })
});

//invoking update() function in the trainController to update the available no of tickets
router.put('/:trainName',(req,res)=>{
    trainController.update(req.params.trainName,req.body)
        .then(data=>{
            res.status(data.status).send({data:data.data});
        }).catch(err=>{
            res.status(err.status).send({message:err.message});
    })
});

module.exports = router;


