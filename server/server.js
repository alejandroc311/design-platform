const cors = require("cors");
const fs = require("fs");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");
const usersDir = path.join(__dirname, "public/users");
const jwt = require('jsonwebtoken');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gohanssj2",
    database: "Tropiweb_Platform"
});
app.use(cors());
app.use(express.json());
app.use("/images", express.static(usersDir));
app.options("*", cors());

const getUser = (email) => new Promise((resolve, reject) => {
    try {
        connection.execute(
            'SELECT * FROM `Users` WHERE `email` = ?',
            [email],
            (error, results) => {
                if (error) throw error;
                results.length > 0 ? resolve(results) : reject(new Error("Error on Authentication", {cause: "Email is not on records"}));
            }
        );
    }
    catch (error) {
        console.error("Error on DB connection", error);
    }
    
});
const checkForUser = (email) => new Promise((resolve, reject) => {
    try {
        connection.execute(
            'SELECT `email` FROM `USERS` WHERE `email` = ?',
            [email],
            (error, results) => {
                if (error) throw error;
                results.length > 0 ? reject(new Error("User already exists.")) : resolve(false); 
            }
        )
    }
    catch (error) {
        console.error("Error on DB connection", error);
    }
});
const getMockups = (proyectId) => new Promise((resolve, reject) => {
    let mockups;
    try {
        connection.execute(
            'SELECT * FROM `Mockups` WHERE `proyectId` = ?',
            [proyectId],
            (error, results) => {
                if (error) throw error;
                if(results.length > 0 ){
                    mockups = [...results]
                    resolve(mockups);
                }
                else {
                    reject(new Error("No Mockups for this Proyect yet ..."));
                }    
            }
        );
    }
    catch (error) {
        console.error("Error on DB Connection", error);
    }
});

app.post('/createUser', async (req, res, next) => {
    let {body:{email, password}} = req;
    let doesUserExist;
    try {
        doesUserExist = await checkForUser(email);
        if (doesUserExist === false) {
            connection.execute(
                '',
                [email, password],
                (error, results) => {

                }
            );
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    finally {
        res.json({
            body:{
                
            }
        });
    }

});
app.post('/user', async (req, res, next) => {
    let {body:{email, password}} = req; 
    let user;
    try {
        [user] = await getUser(email, password);
        let {hashedPassword} = user;
        if (password !== hashedPassword) throw new Error("Error on Authentication", {cause: "Wrong Password"});
    } 
    catch (error) {
        console.error("Error on Login: ", error);
        next(error);
    }
    finally {
        let accessToken = jwt.sign(
            {data: "secret"},
            "secret",
            {expiresIn: 60 * 60}
        ); 
        res.json({
            body:{
                user,
                accessToken
            }
        });
    }
});

app.post("/mockups", async (req, res, next) => {
    const {body:{proyectId}} = req;
    let [, token] = req.headers.authorization.split(' ');
    console.log(token);
    let mockups, isUserAuthenticated; 
    try {
        mockups = await getMockups(proyectId);
        isUserAuthenticated = jwt.verify(token, "secret", (err) => {
            if (err) throw err; 
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    finally {
        res.json({
            mockups    
        });
    }
});

app.listen(8080, async () => {
        connection.connect((error) => error ? console.error("Error on line 140:", error) : console.log("Connected to DB on thread number: ", connection.threadId));
        let mockups = await getMockups("1"); console.log(mockups);
    });