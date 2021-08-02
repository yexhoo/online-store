const express = require('express');
const Logger = require('./database/utils/logger');

const app = express();
const { HTTP, MESSAGES } = require('./constant');

const Signup = require('./modules/auth/signup');
const Login = require('./modules/auth/login');
const Order = require('./modules/order');

app.use(express.json());

app.get('/health-check', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/auth/signup', (req, res) => {
  const { body: { user } } = req;
  return Signup.create(user)
    .then((data) => { res.status(HTTP.CREATED).json(data); })
    .catch((err) => res.status(err.code).send({ error: err.message }));
});

app.post('/auth/login', (req, res) => {
  const { body: { user } } = req;
  return Login.validate(user)
    .then((data) => { res.status(HTTP.OK).json(data); })
    .catch((err) => res.status(err.code).send({ error: err.message }));
});

app.post('/order', (req, res) => {
  const { body: { order } } = req;
  return Order.create(order)
    .then((data) => { res.status(HTTP.OK).json(data); })
    .catch((err) => res.status(err.code).send({ error: err.message }));
});

app.listen(HTTP.PORT, () => {
  Logger.info(MESSAGES.RUNNING_SERVER);
});
