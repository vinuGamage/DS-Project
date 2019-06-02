First install npm for both server side and to client side.

Front end deployement

The front end of the web application was developed using ReactJS.
To deploy the react app "npx create-react-app trainticket_reservation" command was used.
Using "npm i bootstrap" bootstrap is installed
Using "npm i react-router-dom" react-router-dom was installed.
Inside the src>components folder all the components that were needed for the applications were included.
Inside the src>images folder all the images that were needed were included.
App.js was the main javascrit file where the basic application was developed using reactJs.

Back end deployement

The back end was developed using NodeJs with the help of Express,Mongoose,cors,nodemailer.
A seperate directory was made for the backend, using the command "mkdir backend".
Using "npm init -y" setup a new npm package(Anwsers yes by deafult).This will create a package.json
Using "npm i express body-parser cors mongoose nodemailer" can install the dependencies needed for the project.
body-parser and cors are middle-wares.
mongoose let to access mongodb in an object oriented manner.
using "npm i -g nodemon" nodemon is globaly install so that it will automatically resfresh the application when a change is made.
As the database mongodb was used.database name which was created testDB.
Inside the controllers folder controller files are icluded and inside the routers folder all router files that were used are included.
DBSchema.js file includes the database schemas and the connection to the mongodb.
server.js file includes important details to start the node server and the middlewares. 

Finally to run the application run the backend using nodemon server(by opening the terminal in backend folder) and to run the front end 
use npm start(by opening the terminal in trainticket_reservation folder) as well run mongod (in the local terminal).