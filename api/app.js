/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const client = require('./connection');

const developersRouter = require('./routes/developers');
const pizzaRouter = require('./routes/pizzas');
const jobOffersRouter = require('./routes/jobOffers');
const compagniesRouter = require('./routes/compagnies');

const app = express();

client.connect((err) => {
  if (err) console.error("Error in connecting to the database",err);
  else console.log("Connection to the database ...");
});

const expiryDateIn3Months = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3);
const cookieSecreteKey = 'YouWouldnot!not!like!mypizza';
app.use(
  cookieSession({
    name: 'user',
    keys: [cookieSecreteKey],
    cookie: {
      httpOnly: true,
      expires: expiryDateIn3Months,
    },
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/developers', developersRouter);
app.use('/jobOffers', jobOffersRouter);
app.use('/compagnies', compagniesRouter);
app.use('/pizzas', pizzaRouter);


module.exports = app;