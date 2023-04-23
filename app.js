/**
 * 
 * Required Dependencies
 * 
 */
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const config = require('./config.json');
const port = config.port

/**
 * 
 * Web Server & Routes
 * 
 */
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// Static Files
app.use('/assets', express.static('public/assets'));
app.set('views', path.join(__dirname, 'public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Connect to Port
app.listen(port, () => {
    console.log(`Webserver is running on port ${port}`);
});

// Routes
app.use('/', require('./routers/root'));

/**
 * 
 * Mode Check (Dev or Prod)
 * 
**/
let mongo;
if (config.mode === 'production') {
    mongo = config.mongo;
} else {
    mongo = config.mongo_dev;
};

/**
 * 
 * MongoDB Database
 * 
 */
// const encodedPassword = encodeURIComponent(mongo.password);
// const connectionURL = `mongodb://${mongo.user}:${encodedPassword}@${mongo.host}:${mongo.port}/${mongo.db}?authSource=admin`;
// console.log(`Creating MongoDB connection at ${mongo.host}:${mongo.port}`);

// mongoose.set('strictQuery', false);
// mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((error) => {
//   console.log('Error connecting to MongoDB');
//   console.log(error);
// });