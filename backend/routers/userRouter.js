const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

//inserting the user
router.post('/',(req,res)=>{
    userController.insert(req.body).then(data=>{
        res.status(data.status).send({message:data.message});
    }).catch(err=>{
        res.status(err.status).send({message: err.message});
    })
});

//Getting the user according to the email and password
router.get('/:email/:password',(req,res)=>{
    userController.getOne(req.params.email,req.params.password)
        .then(data=>{
            res.status(data.status).send(data.data);
        })
        .catch(err=>{
            res.status(err.status).send({message:err.message});
        })
});

//verification of email
router.get('/:email',(req,res)=>{
    userController.checkEmail(req.params.email)
        .then(data=>{
            res.status(data.status).send(data.data);
        })
        .catch(err=>{
            res.status(err.status).send({message:err.message});
        })
})


module.exports = router;
