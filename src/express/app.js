const http = require("http");
const express = require("express");
const router = require("./router");

//
const app = express();
const server = http.createServer(app);

//
app.use("/", router);

//
server.listen(process.env.PORT || 3000, () => {
    console.log("http://localhost:3000/");
});