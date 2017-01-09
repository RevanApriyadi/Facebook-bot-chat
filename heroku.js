const express = require("express");
const http = require("http");
const app = express();

// Bind to ports to make Heroku happy even though it doesn't use them
app.set("port", (process.env.PORT || 3000));
app.listen(app.get("port"));

// Landing page
app.get("/", function(req, res) {
    res.sendFile("index.html", {
        "root": __dirname
    });
});

// Ping every 20 minutes to keep awake
// Sleep from 3 AM to 9 AM to preserve time (UTC)
const local_low = 3;
const local_high = 9
const offset = 5;
setInterval(function() {
    var now = new Date();
    if (now.getUTCHours() < (local_low + offset) || now.getUTCHours() >= (local_high + offset)) {
        console.log("Pinging server");
        http.get("http://assume-bot.herokuapp.com");
    }
}, 1200000);