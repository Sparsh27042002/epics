const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'UserDatabase'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    // Check if username already exists
    db.query('SELECT username FROM users WHERE username = ?', [username], async (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            return res.send('Username already taken'); // Replace with redirect and flash message as needed
        }

        // Hash password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
            if (err) throw err;
            res.send('User registered successfully'); // Replace with appropriate redirect after signup
        });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.send('User not registered'); // Redirect to signup page with flash message
        }

        const user = result[0];

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.send('Incorrect password'); // Handle incorrect password
        }

        res.send('Login successful'); // Redirect to dashboard or home page after successful login
    });
});
// On signup failure
return res.redirect('/signup?error=username_taken');

// On login failure
return res.redirect('/signup?error=user_not_registered');

// Starting the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
