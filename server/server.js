const cors = require("cors");
const fs = require("fs")
const express = require("express");
const app = express();
const path = require("path");
const userDir = path.join(__dirname, "public");
app.use(cors());
app.use(express.json());
app.use(express.static(userDir));
app.options("*", cors());

app.get("/", (req, res) => {
    res.send({ message: '' })
})

app.get('/user', (req, res) => {
    res.send({userid: "1234"});
});

app.post("/mockups", (req, res) => {
    res.json({body: req.body});
});

app.listen(8080, () => {
    fs.readdirSync(userDir).forEach((file) => {
        console.log(file);
    });
    console.log('Application listening on port 8080!');
});