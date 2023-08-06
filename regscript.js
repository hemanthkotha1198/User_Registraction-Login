// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.use(express.static('views'));

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// MySQL database configuration
const dbConfig = {
    host:"localhost",
    user: "root",
    pass: "",
    database: 'registration_db',
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Define a route to display the form
app.get('/', (req, res) => {
  res.render('reg');
});

// Define a route to handle the form submission
app.post('/submit', (req, res) => {
  const { fname,username,email,num,passwd,cpasswd } = req.body;

  // Insert data into the database
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send('Error connecting to the database');
    }

    const query = 'INSERT INTO register (FirstNAme,UserName,mail,ph_num,password,COnfirm_password) VALUES (?,?,?,?,?, ?)';
    connection.query(query, [fname,username,email,num,passwd,cpasswd], (error, results) => {
      connection.release();

      if (error) {
        return res.status(500).send('Error inserting data into the database');
      }

      return res.redirect('/');
    });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});