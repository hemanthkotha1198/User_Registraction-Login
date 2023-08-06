// // // Import required modules
// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// // // Create an Express app
// const app = express();
// const port = 3000;
// // // Set the view engine to EJS
// app.set('view engine', 'ejs');
// app.use(express.static('views'));
// // // Middleware to parse incoming request bodies
// app.use(bodyParser.urlencoded({ extended: false }));
// // MySQL database configuration
// const dbConfig = {
//     host:"localhost",
//     user: "root",
//     pass: "",
//     database: 'registration_db',
// };
// // Create a MySQL connection pool
// const pool = mysql.createPool(dbConfig);
// // // Define a route to display the form
// app.get('/', (req, res) => {
//   res.render('login');
// });
// // // Define a route to handle the form submission
// app.post('/submit', (req, res) => {
// //   // retriving data into the database
//   pool.getConnection((err, connection) => {
//     if (err) {
//       return res.status(500).send('Error connecting to the database');
//     }
//     const email = req.body.email;
//     const password = req.body.passwd;

//     const sql = `SELECT * FROM register WHERE mail = ? AND Password = ?`;
//     connection.query(query, [email,passwd], (error, results) => {
//       connection.release();

//       if (error) {
//         return res.status(500).send('Error retriving data from the database');
//       }

//       return res.redirect('/');
//     });
//   });
//     });
  
// // // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registration_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Use EJS template engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('views'));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes
app.get('/', (req, res) => {
    res.render('login');    
});

app.post('/login', (req, res) => {
    const username = req.body.email;
    const password = req.body.passwd;

    const sql = `SELECT * FROM register WHERE mail = ? AND password = ?`;

    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.send('Login failed');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
