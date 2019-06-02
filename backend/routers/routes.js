const express = require('express');
const routes = express.Router();

//importing the routes
const userRouter = require('./userRouter');
const trainRouter = require('./trainRouter');
const trainTicketRouter = require('./trainTicketRouter');
const sampathPaymentRouter = require('./sampathPaymentRouter');
const dialogPaymentRouter = require('./dialogPaymentRouter');


//using the routes
routes.use('/user',userRouter);
routes.use('/train',trainRouter);
routes.use('/trainTicket',trainTicketRouter);
routes.use('/creditCard',sampathPaymentRouter);
routes.use('/dialogPay',dialogPaymentRouter);

module.exports = routes;

