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
    database: "Tropiweb_Platform",
    multipleStatements: true
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
        reject(new Error("Error on DB", error));
    }
});

app.post('/createUser', async (req, res, next) => {
    const {body:{email, password}} = req;
    let doesUserExist;
    try {
        doesUserExist = await checkForUser(email);
        if (doesUserExist === false) {
            connection.execute(
                'CALL SP_CREATE_USER(?, ?); SELECT id FROM Users WHERE `email` = ?',
                [email, password,  email],
                (error, results) => {
                    if (error) throw error;
                    console.log(results);
                    //const {insertId} = results;
                    //fs.mkdirSync(`${usersDir}${"/" + insertId}`, {recursive: true});
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
            Success: "User Created"
        })
    }
});
app.post('/authenticateUser', async (req, res, next) => {
    let token, user, email;
    try{
        [, token] = req.headers.authorization.split(' ');
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) throw err;
            console.log(decoded);
            ({email} = decoded);
        });
        [user] = await getUser(email);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    finally {
        const {id, accountId, proyectId} = user;
        res.json({
            body:{
                id,
                accountId,
                proyectId,
            }
        });
    }
});

app.post('/user', async (req, res, next) => {
    const {body:{email, password}} = req; 
    let user;
    try {
        [user] = await getUser(email);
        const {hashedPassword} = user;
        if (password !== hashedPassword) throw new Error("Error on Authentication", {cause: "Wrong Password"});
    } 
    catch (error) {
        console.error("Error on Login: ", error);
        next(error);
    }
    finally {
        const {id, email, proyectId, accountId} = user; 
        const accessToken = jwt.sign(
            {
                accountId,
                email, 
                id, 
                proyectId
            },
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
    const [, token] = req.headers.authorization.split(' ');
    console.log(token);
    let mockups
    try {
        jwt.verify(token, "secret", (err) => {
            if (err) throw err; 
        });
        mockups = await getMockups(proyectId);
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
    });