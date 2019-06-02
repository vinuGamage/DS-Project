const mongoose = require('../DBSchema');
const schema  = mongoose.model('trainTickets');

const trainTicketController = function () {


    //Inserting train ticket data
    this.insert = function (data) {
        return new Promise((resolve, reject) => {

            let trainTicket = schema({
                trainName:data.trainName,
                tickets:data.tickets,
                nic:data.nic,
                empStatus:data.empStatus,
                paymentAmount:data.paymentAmount,
                paymentMethod:data.paymentMethod
            })
            trainTicket.save()
                .then(()=>{
                    resolve({status:200,message:trainTicket.tickets + " were reserved in " + trainTicket.trainName });
                }).catch(err=>{
                    reject({status:500,message:"Error : " + err});
            })
        })
    }


    //Retrieving data according to the user using the nic
    this.getOne=(nic)=>{
        return new Promise((resolve, reject) => {
            schema.find({nic:nic})
                .exec
                .then(data=>{
                    resolve({status:200,data:data});
                }).catch(err=>{
                    reject({status:500,message:"Error while retrieving data of ticket reserving : " + err})
            })
        })
    }

}

module.exports = new trainTicketController();