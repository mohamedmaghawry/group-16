const express = require('express');
const path = require('path');
const { createPool } = require('mysql');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "moh.2005",
    database: "web_project",
    connectionLimit: 10
});



pool.query('SELECT * FROM users', (err, result, fields) => {
    if (err) {
        return console.log(err);
    }
    test = result;
    return console.log(result);
});


app.get('/api/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Database query failed' });
        } else {
            res.json(result);
        }
    });
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
