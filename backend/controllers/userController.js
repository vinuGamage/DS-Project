const mongoose = require('../DBSchema');
const schema = mongoose.model('users');

const userController = function () {

    //Adding user information
    this.insert = function (data) {
        return new Promise((resolve, reject) => {
          let user = schema({
              fullname:data.fullname,
              email:data.email,
              nic:data.nic,
              empStatus:data.empStatus,
              password:data.password
          });
            user.save().then(()=>{
                resolve({status:200,message:'Added a new user'});
            }).catch(err=>{
                reject({status:500,message:'Error :' + err});
            })
        })
    }

    //Retrieving data of a specific user according to email and password
    this.getOne = (email,password) => {
        return new Promise((resolve,reject)=>{
            schema.find({email: email,password: password})
                .exec()
                .then(data => {
                    resolve({status : 200,data:data});
                }).catch(err =>{
                    reject({status:500,message:'Error:' + err});
            })
        })
    }

    //Checking whether the entered mail is existing or not
    this.checkEmail = (email)=>{
        return new Promise((resolve, reject) => {
            schema.find({email : email})
                .exec()
                .then(data =>{
                    resolve({status:200,data:data});
                })
                .catch(err=>{
                    reject({status:500,message:'Error :' + err});
                })
        })


    }

}

module.exports = new userController();