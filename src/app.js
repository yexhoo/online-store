const express = require('express');
const Logger = require('./database/utils/logger');

const app = express();
const { HTTP, MESSAGES } = require('./constant');

const User = require('./modules/user');

app.use(express.json());

app.get('/health-check', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/user', (req, res) => {
  const { body: { user } } = req;
  return User.create(user)
    .then((data) => { res.status(HTTP.CREATED).json(data); })
    .catch((err) => res.status(err.code).send({ error: err.message }));
});

app.listen(HTTP.PORT, () => {
  Logger.info(MESSAGES.RUNNING_SERVER);
});
