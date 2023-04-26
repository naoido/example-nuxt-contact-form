import fs from "fs";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import express from "express";

const router = express.Router();
const path = "./data/contacts.json";

router.use(express.json());

router.post("/", (req, res) => {
    const timestamp = Math.floor( Date.now() / 100 );
    const token = req.headers.pass;
    if (token == undefined) {
        res.status(403);
        res.end();
        return;
    }

    if (CryptoJS.AES.decrypt(req.headers.pass.split(" ")[1], password).toString(CryptoJS.enc.Utf8) == timestamp) {
        const data = JSON.parse(fs.readFileSync(path, "utf-8"));
        const uuid = crypto.randomUUID();

        data[uuid] = req.body.content;

        fs.writeFileSync(path, JSON.stringify(data));
        res.end();
    } else {
        res.status(403);
        res.end();
    }
});

module.exports = router;