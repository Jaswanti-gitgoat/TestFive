// Sample Node.js application with common SAST findings

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// 1. SQL Injection vulnerability
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootpassword',
        database: 'users_db'
    });

    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.send('Invalid credentials');
        }
    });
});

// 2. Insecure use of file system operations
app.get('/read-file', (req, res) => {
    const filePath = req.query.filePath; // File path taken from user input

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});

// 3. Cross-Site Scripting (XSS) vulnerability
app.get('/greet', (req, res) => {
    const name = req.query.name;
    res.send(`Hello, ${name}`); // User input is directly reflected in the response
});

// 4. Hard-coded credentials
const secretKey = "SuperSecretKey123!"; // Hard-coded secret key

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
