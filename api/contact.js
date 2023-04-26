import fs from "fs";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import express from "express";

const router = express.Router();
const path = "./data/contacts.json";
const password = "password"

router.use(express.json());

router.post("/", (req, res) => {
    const timestamp = Math.floor( Date.now() / 1000 );
    let token = req.headers.authorization;

    if (token == undefined) {
        res.status(403);
        res.end();
        return;
    } else {
        token = token.split(" ");
        if (token[0] == "Bearer" && CryptoJS.AES.decrypt(token[1], password).toString(CryptoJS.enc.Utf8) == timestamp) {
           const data = JSON.parse(fs.readFileSync(path, "utf-8"));
           const uuid = crypto.randomUUID();

           data[uuid] = req.body.contact;
   
           fs.writeFileSync(path, JSON.stringify(data));
   
           res.end();
           return;
       } else {
           res.status(403);
           res.end();
       }
    }
});

module.exports = router;