const cors = require("cors");
const fs = require("fs");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");
const usersDir = path.join(__dirname, "public/users");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "/",
    database: "Tropiweb_Platform"
});
app.use(cors());
app.use(express.json());
app.use(express.static(usersDir));
app.options("*", cors());

const getUser = (email) => new Promise((resolve, reject) => {
    try {
        connection.execute(
            'SELECT * FROM `Users` WHERE `email` = ?',
            [email],
            (error, results) => {
                if (error) reject(error);
                results.length > 0 ? resolve(results) : reject(new Error("Error on Authentication", {cause: "Email is not on records"}));
            }
        );
    }
    catch (error) {
        console.error("Error on DB connection", error);
    }
    
});

app.post('/user', async (req, res, next) => {
    let {body:{email, password}} = req; 
    let user;
    try {
        [{user:{hashedPassword}}] = await getUser(email, password);
        if (password !== hashedPassword) throw new Error("Error on Authentication", {cause: "Wrong Password"}); 
    } 
    catch (error) {
        console.error("Error on Login: ", error);
        next(error);
    }
    finally {
        res.json({
            body:{
                user
            }
        });
    }
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
        connection.connect((error) => error ? console.error(error) : console.log("Connected to DB on thread number: ", connection.threadId));
        fs.readdirSync(usersDir).forEach((file) => {
            console.log(file);
        });
        console.log(usersDir);
        console.log('Application listening on port 8080!');

    });