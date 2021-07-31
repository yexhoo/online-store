const express = require('express')
const app = express();
const { HTTP, MESSAGES } = require("./constants")

app.use(express.json());

app.use(function (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === HTTP.BAD_REQUEST && "body" in err) {
    res.status(HTTP.BAD_REQUEST).json(error(MESSAGES.JSON_ERROR, err.toString()));
  } else next();
});

app.get('/health-check', function (req, res) {
  res.status(200).json({status: 'ok'});
});


app.listen(HTTP.PORT, function () {
  console.log(MESSAGES.RUNNING_SERVER);
});

const error = (msg, detail) => {
  return { error: msg, detail: detail || "" }
}