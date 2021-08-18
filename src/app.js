const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const connectDB = require('./DB/db');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

//@desc coonect Db
connectDB();


//Register View Engine for server-side rendering
app.set('views', './src/views');
app.set('view engine', 'ejs');


//middleware: static files 
app.use(express.static('src/public'));

//@middleware
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());


// @desc Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/form'));


// @desc 404 page
app.use((req, res) => {
  res.status(404).render('404');
});



const port = process.env.PORT || 5000;

//@server listening
const startApplication = async() => {
    await app.listen(3000, () => {
        console.log("app is running on port 3000");
    })
}

startApplication();