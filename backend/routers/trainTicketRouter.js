const trainTicketController = require('../controllers/trainTicketController');
const express = require('express');
const router = express.Router();


//Inserting train Ticket reservation details
router.post('/',(req,res)=>{
    trainTicketController.insert(req.body)
        .then(data=>{
            res.status(data.status).send({message:data.message});
        }).catch(err=>{
            res.status(err.status()).send({message: err.message});
        })
});

//Retrieving ticket reservation details according to the user
router.get('/:nic',(req,res)=>{
    trainTicketController.getOne(req.params.nic)
        .then(data=>{
            res.status(data.status).send(data.data);
        }).catch(err=>{
            res.status(err.status).send({message:err.message});
        })
});

module.exports = router;

