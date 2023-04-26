import express from "express";

const app = express();

app.use("/contact", require("./contact.js"));

module.exports = app;