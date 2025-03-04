import express from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';
import { validateNewUser, validateNewAppointment} from './services/validation.js';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

const PORT = process.env.APP_PORT || 3000;

let loggedIn = false;
let userID = -1;

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database!');
        return conn;
    } catch (err) {
        console.log(`Error connecting to MariaDB: ${error}`);
    }
}

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

// go to the home page
app.get('/', (req, res) => {
    res.render('home');
});

// go to the create account page
app.get('/createAccount', (req, res) => {
    res.render('createAccount');
});

//TODO: Finish implementing validation
app.post('/createAccount', async (req, res) => {
    const newAccount = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zipcode
    }


    //TODO: uncomment after implementing validation
    // const result = validateNewUser(newAccount);
    // if (!result.isValid) {
    //     console.log(result.errors);
    //     res.send(result.errors);
    //     return;
    // }

    newAccount.phone = newAccount.phone.replace(/-/g, "");
    
    // console.log(newAccount);

    const conn = await connect();

    const insertQuery = await conn.query(`insert into users
        (fname, lname, email, password, phone, street_address, city, state, zip_code)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [ newAccount.fname, newAccount.lname, newAccount.email, newAccount.password, newAccount.phone, newAccount.street_address, newAccount.city, newAccount.state, newAccount.zip_code ]
    );

    // console.log(insertQuery);
    res.render('accountSuccess', { newAccount });

});

// go to the log in page
app.get('/login', (req, res) => {
    res.render('login.ejs')
});

// TODO: Implement logging in (post) route
app.post('/login', async (req, res) => {
    //things
});

// TODO: Implement create new appointment
// TODO: How do I get uid out of the server?
app.post('/newAppointment', async (req, res) => {
    const result = validateNewAppointment(newAppointment);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }

    const conn = await connect();

    const insertQuery = await conn.query(`insert into appointment
        (uid, appt_date, petname, pettype, service, friendly)
        values (?, ?, ?, ?, ?, ?)`,
        [ newAppointment.uid, newAccount.lname, newAccount.email, newAccount.password, newAccount.phone, newAccount.street_address, newAccount.city, newAccount.state, newAccount.zip_code ]
    );

    res.render('accountSuccess', { newAccount });

});



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});