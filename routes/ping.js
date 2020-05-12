const express = require("express");

const app = express();

app.get("/", (_, res) => res.send(JSON.stringify("pong")));

module.exports = app;
