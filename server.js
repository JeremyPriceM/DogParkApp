const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
  res.sendFile('index.html');
});

app.get("/dogparks", (req, res) => {
    res.sendFile(__dirname + '/public/dogparks.html');
});

app.post("/dogparks", (req, res) => {
    res.send("You Have Hit The Post Route");
});

app.get("/newdogparks", (req, res) => {
    res.sendFile(__dirname + '/public/newdogparks.html');
});

app.get("/dogparks/:id", (req, res) => {
    res.send("You have reached the /dogparks/ID route");
});

app.delete("/dogparks/:id",(req, res) => {

});


let server;

function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
    server = app
        .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        })
        .on("error", err => {
            reject(err);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log("closing server");
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };