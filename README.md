# About
This is the prototype of a platform for a graphic designer and his/her clients. The clients can sign up and login to the platform in order to view the mockups the designer has prepared and uploaded for their respective proyects.

Because this is a fully working prototype, it emulates real-world storage systems. This means that the image and file URLs for the clients' proyects' mockups are stored in a database.  Meanwhile, the images and files are stored in a server and can be retrieved later by using the URLs stored in the database. Thus, in order to get this prototype working on you computer you will need to run the queries set forth further below in the "SQL Queries" section of this README. 

# How it Works

Clients can use the "LoginPage" to log in to their accounts. Once there, they can view the mockups that have been proposed and uploaded by their assigned designer (hereinafter, "admin"). The clients can rate the proposed/uploaded mockups and leave comments documenting their thoughts on the admin's presentation. Clients are authenticated with a JWT and upon navigation to their profile, a PrivateRoute will run an isAuth() hook in order to whether allow or deny navigation to the profile. Similarly, the server will not respond with a sensitive data payload (in this case, the mockups), unless the JWT can be verified. 

Admins can use the "AdminLoginPage" to log in to their accounts. Once there, they can view the proyects assigned to them and some basic info regarding said proyects. The admins can navigate to nested dynamic sub-routes that render the mockups that have already been uploaded to each proyect. Furthermore, the admins can see the rating the clients gave the mockups and the comments they left. Additionally, the admins may upload additional mockups to the clients' proyect. Just like the clients, admins are authenticated with a JWT and upon navigation to their profile, an AdminPrivateRoute will run an isAuth() hook in order to whether allow or deny navigation to the profile. 

***Please note that only image files may be uploaded***

# Getting Started
Run `npm install` and `npm start` in your react-app directory. 

Then, navigate to the "server" directory using `cd server` and run `node server.js` in a different terminal window. 

***Make sure you put in your own configuration for the MySQL server on line 13 of "./server/server.js"***

# SQL Queries
This prototype uses various MySQL tables that have to be created before it works properly. Furthermore, upon client "signup/creation" the MySQL server runs a Stored Procedure in order to populate all of the tables that the client will need in order to use the platform properly.

Thus, before running this prototype, it is necessary to execute the following MySQL queries. First, open your MySQL Workbench and use the visual editor to create the tables. Alternatively, run `mysql -u yourUserName -p` to access MySQL from your command line; You will be prompted for your MySQL account's password in order to access the server. 

Once you have either installed the Workbench or logged in to the MySQL server through the command line, you can run the following queries: 

## **MySQL Tables**
1. 

    CREATE TABLE `mockups` (
        `id` int NOT NULL AUTO_INCREMENT,
        `proyectId` int DEFAULT NULL,
        `src` varchar(255) DEFAULT NULL,
        `rating` int DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `proyectId` (`proyectId`)
    );
2. 

    CREATE TABLE `proyects` (
        `id` int NOT NULL AUTO_INCREMENT,
        `userId` int DEFAULT NULL,
        `adminId` int DEFAULT NULL,
        `lastModified` datetime DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `userId` (`userId`)
    );
3. 

    CREATE TABLE `comments` (
        `id` int NOT NULL AUTO_INCREMENT,
        `proyectId` int NOT NULL,
        `dateCreated` datetime NOT NULL,
        `comment` text,
        PRIMARY KEY (`id`)
    );
4. 

    CREATE TABLE `accounts` (
        `id` int NOT NULL AUTO_INCREMENT,
        `userId` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `userId` (`userId`)
    );
5. 
    
    CREATE TABLE `users` (
        `id` int NOT NULL AUTO_INCREMENT,
        `email` varchar(255) DEFAULT NULL,
        `hashedPassword` varchar(255) DEFAULT NULL,
        `proyectId` int DEFAULT NULL,
        `accountId` int DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `proyectId` (`proyectId`),
        KEY `accountId` (`accountId`)
    );
6. 

    CREATE TABLE `admins` (
        `id` int NOT NULL AUTO_INCREMENT,
        `email` varchar(255) NOT NULL,
        `hashedPassword` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
    );
## **MySQL Stored Procedure**
1. 

    CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CREATE_USER`(
        IN emailInput VARCHAR(255),
        IN passwordInput VARCHAR(255),
        OUT dirNum INT
    )
    BEGIN 
        DECLARE EXIT HANDLER FOR SQLEXCEPTION 
        BEGIN 
        ROLLBACK;
        RESIGNAL;
        END;
        START TRANSACTION;
        SET @adminid = (SELECT id FROM Admins ORDER BY RAND() LIMIT 1); 
        INSERT INTO Users(email, hashedPassword) VALUES (emailInput, passwordInput);
        SET @userid = LAST_INSERT_ID();
        INSERT INTO Accounts(userId) VALUES (@userid);
        SET @accountid = LAST_INSERT_ID();
        INSERT INTO Proyects(userId, adminId, lastModified) VALUES (@userid, @adminid, NOW());
        SET @proyectid = LAST_INSERT_ID();
        UPDATE Users SET accountId = @accountid, proyectId = @proyectid WHERE id = @userid;
        SET dirNum = @proyectid;
        COMMIT WORK; 
    END
    
# Future features
Add a contract signing requirement for when the user creates an account. Also, add a stripe checkout for 25% deposit right before account creation. 