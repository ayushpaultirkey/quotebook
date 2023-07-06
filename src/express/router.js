const express = require('express');
const path = require("path");
const Serve = require("./../h12/serve");
const router = express.Router();

const { Create, Random } = require("./../quotebook/quote");

router.use("/quote/create", Create);
router.use("/quote/random", Random);

router.use("/home", (request, response) => {
    response.sendFile(path.join(__dirname, "./../../public/view/index.html"));
});

router.use("/public", Serve(path.join(__dirname, "./../../public"), { hotreload: false }).Express);
router.use("/@h12", express.static(path.join(__dirname, "./../../public/library/h12")));
/*
router.use("/@hotreload", function(req, res) {

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    let _interval = setInterval(() => { res.write("Connected"); }, 250);

    res.on("close", () => {
        clearInterval(_interval);
        res.end();
    });

});
*/

module.exports = router;