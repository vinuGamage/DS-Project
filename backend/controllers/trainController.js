const mongoose = require('../DBSchema');
const schema = mongoose.model('trains');

const trainController = function () {


    //retrieving all trains available
    this.getAll=()=>{
        return new Promise((resolve, reject) => {
            schema.find()
                .exec()
                .then(data=>{
                    resolve({status:200,data:data});
                })
                .catch(err=>{
                    reject({status:500,message:"Error : " + err});
                })
        })
    }


    //retrieving train details according to the name
    this.getOne=(trainName)=>{
        return new Promise((resolve,reject)=>{
            schema.find({trainName : trainName})
                .then(data =>{
                    resolve({status:200,data:data});
                }).catch(err=>{
                    reject({status:500,message:"Error while retrieving details on " +trainName + " train : " + err});
            })
        })
    }

    this.update=(train_name,data)=>{
        return schema.find({trainName : train_name}).then(train => {
            console.log(JSON.stringify(train));
            console.log(JSON.stringify(data));

            let availableTicketUpdated = train[0].availableTickets - data.noOfTickets
            console.log(availableTicketUpdated);
            return new Promise((resolve, reject) => {
                schema.update({trainName: train_name},{$set:{"availableTickets" : availableTicketUpdated}})
                    .then(data=>{
                        resolve({status : 200,message:"Available Tickets are updated."});
                    })
                    .catch(err=>{
                        reject({status:500,message:"Error while updating the available Tickets:" + err});
                    })
            })
        });

    }

}

module.exports = new trainController();