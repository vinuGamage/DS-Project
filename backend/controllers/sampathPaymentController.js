const mongoose = require('../DBSchema');
const schema = mongoose.model('payment');
const nodemailer = require('nodemailer');

const sampathPayController = function () {

    //Adding user information
    this.insert = function (data) {
        return new Promise((resolve, reject) => {
            let sampathPay = schema({
                name: data.name,
                creditNo: data.creditNo,
                cvc: data.cvc,
                paymentAmount: data.paymentAmount,
                email: data.email,
            });
            sampathPay.save().then(() => {
                // //Sending the success payment mail
                let response = `<b>Online Train Ticket Reservation System </b>
                     <p>Dear Sir/Madam,
                        An amount of LKR ${data.paymentAmount} was successfully received. Thank you for reserving ticket from Online Train Ticket Reservation.
                     </p>
                    `;

                let sender = nodemailer.createTransport({
                    service: 'gmail',
                    secure: false,
                    port: 25,
                    auth: {
                        user: 'onlinetrainticketreservation@gmail.com',
                        pass: 'trainticket1234'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }

                });

                let mailOptions = {
                    from: "Online Train Ticket Reservation ",
                    to: data.email,
                    subject: "Payment Confirmation",
                    text: "Thank you!!",
                    html: response

                };
                console.log(response);

                return sender.sendMail(mailOptions);
            }).then(() => {
                console.log("sent");
                   // console.log('Message sent : %s', info, messageId);
                    //console.log('Preview URL : %s', nodemailer.getTestMessageUrl(info));
                    resolve({status: 200, message: 'Added new sampath payment details'});
            }).catch(err => {
                reject({status: 500, message: 'Error :' + err});
            })
        })



    }
};




module.exports = new sampathPayController();