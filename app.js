import express from 'express';
import mariadb from 'mariadb';

const app = express();

// const pool = mariadb.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'petbarber',
//     port: '3306'
// });

// async function connect() {
//     try {
//         const conn = await pool.getConnection();
//         console.log('Connected to the database!');
//         return conn;
//     } catch (err) {
//         console.log(`Error connecting to MariaDB: ${error}`);
//     }
// }

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const PORT = 3000;

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})