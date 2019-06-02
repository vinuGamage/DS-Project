const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema to store registered user details
const UserSchema = new Schema({
    fullname : {
        type :String
    },
    email : {
        type :String,
        required:true
    },
    nic : {
        type :String,
        required:true
    },
    password : {
        type :String,
        required: true
    },
    empStatus : {
        type :String
    }
});


//TrainSchema to store the available train details the application provides
const TrainSchema = new Schema({
    trainName:{
        type:String
    },
    source:{
        type:String
    },
    destination:{
        type:String
    },
    departure:{
        type:String
    },
    ticketAmount:{
        type:String
    },
    availableTickets:{
        type:String
    }
});


//TrainSchema store the train ticket reservation details
const TrainTicketSchema = new Schema({
    trainName:{
        type:String,
        required:true
    },
    tickets:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    empStatus:{
      type:String,
      required:true
    },
    paymentAmount:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
});

//Store payment details that have been taken placed using the sampath credit card
const SampathPaymentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    cardNo:{
        type:String
    },
    cvc:{
        type:String,
        required:true
    },
    paymentAmount:{
        type:String,
    },
    email:{
        type:String,
    }
});



//Store payment details that have been taken placed using dialog bill payments
const DialogPaymentSchema = new Schema({
    mobile:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    paymentAmount:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})


//Renaming the schemas
mongoose.model('users',UserSchema);
mongoose.model('trains',TrainSchema);
mongoose.model('trainTickets',TrainTicketSchema);
mongoose.model('payment',SampathPaymentSchema);
mongoose.model('dialogPayment',DialogPaymentSchema);


//Connecting to the  database
mongoose.connect('mongodb://localhost:27017/testDB', (err) =>{
    if(err){
        console.log(err);
        process.exit(-1);
    }else{
        console.log('MongoDB is connected successfully');
    }
});

module.exports = mongoose;

