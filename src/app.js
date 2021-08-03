const express = require('express');
const Logger = require('./database/utils/logger');

const app = express();
const { HTTP, MESSAGES } = require('./constant');

const Signup = require('./modules/auth/signup');
const Login = require('./modules/auth/login');
const Order = require('./modules/order');
const Product = require('./modules/product');
const { getTokenFromHeaders, verify, unauthenticated } = require('./modules/common/utils/jwt');

app.use(express.json());

app.use('/v1/order', (req, res, next) => {
  const token = getTokenFromHeaders(req.headers.authorization);
  if (!token) {
    unauthenticated(res, HTTP.FORBIDDEN);
  } else {
    verify(token)
      .then((response) => {
        if (response) {
          req.email = response.email;
          next();
        } else {
          unauthenticated(res, HTTP.FORBIDDEN);
        }
      });
  }
});

app.post('/v1/auth/signup', (req, res) => {
  const { body: { user } } = req;
  return Signup.create(user)
    .then((data) => { res.status(HTTP.CREATED).json(data); })
    .catch((err) => res.status(err.code).send({ error: err.message }));
});

app.post('/v1/auth/login', (req, res) => {
  const { body: { user } } = req;
  return Login.validate(user)
    .then((data) => { res.status(HTTP.OK).json(data); })
    .catch((err) => res.status(err.code).send({ error: err.message }));
});

app.post('/v1/order', (req, res) => {
  const { body: { order }, email } = req;
  return Order.create(order, email)
    .then((data) => { res.status(HTTP.CREATED).json(data); })
    .catch((err) => res.status(err.code).send({ error: err.message }));
});

app.get('/v1/product', (req, res) => {
  const { init, end } = req.query;
  return Product.get(init, end)
    .then((data) => { res.status(HTTP.OK).json(data); })
    .catch((err) => res.status(err.code).send({ error: err.message }));
});

app.listen(HTTP.PORT, () => {
  Logger.info(MESSAGES.RUNNING_SERVER);
});
