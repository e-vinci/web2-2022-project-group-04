const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const client = require('./connection');
const developersRouter = require('./routes/developers');
const pizzaRouter = require('./routes/pizzas');
const jobOffersRouteur = require('./routes/jobOffers');
const registerDevRouteur = require('./routes/developers')

const app = express();
client.connect();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/developers', developersRouter);
app.use('/jobOffers', jobOffersRouteur);
app.use('/pizzas', pizzaRouter);
app.use('/registerDev', registerDevRouteur);

module.exports = app;
