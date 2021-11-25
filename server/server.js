const cors = require("cors");
const fs = require("fs");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Tropiweb_Platform"
});
const path = require("path");
const usersDir = path.join(__dirname, "public/users");
app.use(cors());
app.use(express.json());
app.use(express.static(usersDir));
app.options("*", cors());
app.get("/", (req, res) => {
    res.send({ message: '' });
})

app.get('/user', (req, res) => {
    res.send({userid: "1234"});
});

app.post("/mockups", (req, res) => {
    const {body:{id, proyectid}} = req;
    res.json({
        body: {
            id,
            proyectid,
            imgUrl: usersDir
    }});
});

app.listen(8080, () => {
    console.log(usersDir);
    console.log('Application listening on port 8080!');
    connection.connect((error) => error ? console.error(error) : console.log("Connected to DB", connection.threadId));
});