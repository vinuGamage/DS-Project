const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');

//importing the routes.js
const routes = require('./routers/routes');

const app = express();
const PORT = 4000;

app.use(body_parser.json());
app.use(cors());
app.use(body_parser.urlencoded({
    extended : false
}));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});

//Routes the requests to the routes.js
app.use('/',routes);

//server connection
app.listen(PORT,() => console.log('Server is running on port ' + PORT));





