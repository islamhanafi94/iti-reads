const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes')
const categoryRoutes = require('./routes/category.routes')
const bookRoutes = require('./routes/book.routes')
const authorRoutes = require('./routes/author.routes');
const reviewRoutes = require('./routes/reviews.routes');
const home = require ('./controllers/home.js');
//______________________________________________DB Config__________________________________________
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

});
mongoose.connection.on('connected', () => {
    console.log('====================================');
    console.log('Database connectd');
    console.log('====================================');
})
mongoose.connection.on('error', () => {
    console.log('====================================');
    console.log('Database Failed');
    console.log('====================================');
});

//__________________________________MiddleWares_______________________________________________________
//For logging 
app.use(cors({origin: true, credentials: true}));app.use(morgan('dev'));

//Passport
app.use(passport.initialize());
app.use(passport.session());
//Config Passport
require('./config/passport')(passport);

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public")); 

//________________________Routes___________________________________
//add Prefix Route
app.use('/users', userRoutes);
app.use('/category', categoryRoutes);
app.use('/books', bookRoutes);
app.use('/author', authorRoutes);
app.use('/review', reviewRoutes);
app.use('/',home);


//___________________________ERRRORRS_____________________


app.use((req, res, next) => { //404 Not Found
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const error = err.message || 'Error processing your request';

    res.status(status).send({
        error
    })
});
// app.use((err, req, res, next) => {
//     const status = err.status || 401;
//     const error = err.message || ' You are not authorized to access this area';

//     res.status(status).send({
//         error
//     })
// });






module.exports = app;