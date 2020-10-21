require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const blogRoutes = require('./routes/blogRoutes');
const pageRoutes = require('./routes/pageRoutes');
const authRoutes = require('./routes/authRoutes');
const {checkUser} = require('./middleware/authMiddle');
// express app
const app = express();

const PORT = process.env.PORT;
// connect to mongodb & listen for requests
const dbURI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.ey0dd.mongodb.net/${process.env.DATABASENAME}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true})
  .then(result => app.listen(PORT))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// blog routes
app.use('*',checkUser);
app.use('/blogs', blogRoutes);
app.use(authRoutes);
app.use(pageRoutes);