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

// TODO: follow up on this in class to see how to do this better
let loggedIn = false;

// TODO: Store the user query data from login?
let userData = null;

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

//+TODO: Finish implementing validation
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

    //+TODO: uncomment after implementing validation
    //TODO: test new account validation
    const result = validateNewUser(newAccount);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }

    newAccount.phone = newAccount.phone.replace(/-/g, "");
    
    // console.log(newAccount);

    const conn = await connect();

    // TODO: new user cannot have email that already exists on server (needs query

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
    // query if the username and password are correct
    const loginInfo = {
        email: req.body.email.trim(),
        password: req.body.password.trim()
    }

    const conn = await connect();

    // TODO: Query the DB to see if we have an account where the email and password matches
    const results = await conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [loginInfo.email, loginInfo.password]);

    // TODO: If we have a username & password match in the DB, store the user info from the query and set logged in to true
    if (results.length() === 1) {
        userData = results[0];
        loggedIn = true;
    }

    // TODO: // load the correct user page (user or admin) based on uid (admin account should be uid: 1)
    res.render({userData});
});

// TODO: Implement create new appointment
// TODO: How do I get uid out of the server?
app.post('/newAppointment', async (req, res) => {
    // NOTE: Database fields
    // aid int(5) auto_increment primary key,
    // uid int(5),
    // appt_date datetime,
    // petname varchar(255),
    // pettype varchar(255),
    // service varchar(255),
    // friendly boolean default false,
    // foreign key (uid) references users(uid)
    
    const newAppointment = {
        uid: userData.uid,
        appt_date: req.body.appt_date,
        petname: req.body.petname,
        service: req.body.service,
        friendly: req.body.friendly
    }
    
    // TODO: convert date format for DB

    //TODO: verify uid against DB
    // Follow up on this in class since it should really be done as part of validateNewAppointment

    // TODO: uncomment after completing validation
    // validate new appointment
    // const result = validateNewAppointment(newAppointment);
    // if (!result.isValid) {
    //     console.log(result.errors);
    //     res.send(result.errors);
    //     return;
    // }

    // connect to the database
    const conn = await connect();

    // TODO: implement add new appointment query
    // const insertQuery = await conn.query(`insert into appointment
    //     (uid, appt_date, petname, pettype, service, friendly)
    //     values (?, ?, ?, ?, ?, ?)`,
    //     [  ]
    // );

    // TODO: Create the account creation confirmation page
    res.render('accountSuccess', { newAccount });

});

// TODO: Implement logout
app.get('/logout', (req, res) => {

    loggedIn = false;
    // TODO: set user account to empty
    
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});