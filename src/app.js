const express = require('express');
const Logger = require('./database/utils/logger');

const app = express();
const { HTTP, MESSAGES } = require('./constant');

app.use(express.json());

const error = (msg, detail) => ({ error: msg, detail: detail || '' });

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === HTTP.BAD_REQUEST && 'body' in err) {
    res.status(HTTP.BAD_REQUEST).json(error(MESSAGES.JSON_ERROR, err.toString()));
  } else next();
});

app.get('/health-check', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(HTTP.PORT, () => {
  Logger.info(MESSAGES.RUNNING_SERVER);
});
