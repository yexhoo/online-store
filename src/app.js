const express = require('express')
const app = express();
const codes = require("./codes")

app.use(express.json());

app.use(function (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === codes.BAD_REQUEST && "body" in err) {
    res.status(codes.BAD_REQUEST).json(error(codes.JSON_ERROR, err.toString()));
  } else next();
});

app.get('/health-check', function (req, res) {
  res.status(200).json({status: 'ok'});
});


app.listen(codes.PORT, function () {
  console.log(codes.RUNNING_SERVER);
});

const error = (msg, detail) => {
  return { error: msg, detail: detail || "" }
}