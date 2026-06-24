const express = require("express");
const app = express();
const PORT = 8080;

const index = require("./api/index.js");
app.use("/api", index);

app.use(express.json());

function middleware(req, res, next) {
  console.log("Checking request method", req.method, req.originalUrl);
  next();
}

app.use(middleware);

function ErrorHandler(err, req, res, next) {
  console.log("Caught the error");
  (console.log(">>>>", err.message), res.sendStatus(500));
}
app.use(ErrorHandler);

(app.listen(PORT), () => console.log("Server running on port 8080"));
