import fs from "fs";
import crypto from "crypto";
import express from "express";

const app = express();
const path = "./data/contacts.json";

app.use(express.json());

app.post("/contact", (req, res) => {
    console.log(req.body);
    const data = JSON.parse(fs.readFileSync(path, "utf-8"));
    const uuid = crypto.randomUUID();
    console.log(uuid);

    data[uuid] = req.body.content;

    fs.writeFileSync(path, JSON.stringify(data));
});

module.exports = app;