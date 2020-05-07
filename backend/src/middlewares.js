const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes')
const pass = require('../src/config/passport');
//______________________________________________DB Config__________________________________________
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

});
mongoose.connection.on('connected', () => {
    console.log('====================================');
    console.log('Database connrctd');
    console.log('====================================');
})
mongoose.connection.on('error', () => {
    console.log('====================================');
    console.log('Database Failed');
    console.log('====================================');
});

//__________________________________MiidleWares_______________________________________________________
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(require('./config/passport')(passport));


//________________________Routes___________________________________
app.use('/user', userRoutes)
    // app.use('/home',passport.authenticate('jwt'))

module.exports = app;