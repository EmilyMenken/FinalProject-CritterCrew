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

// +TODO: follow up on this in class
// I know this isn't how it works in real life but this is just for class since we haven't learned sessions/cookies, etc.
let loggedIn = false;
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
        fname: req.body.fname.trim(),
        lname: req.body.lname.trim(),
        email: req.body.email.trim(),
        password: req.body.password.trim(),
        phone: req.body.phone.trim(),
        street_address: req.body.street_address.trim(),
        city: req.body.city.trim(),
        state: req.body.state.trim(),
        zip_code: req.body.zip_code.trim()
    }

    //+TODO: uncomment after implementing validation
    //+TODO: test new account validation
    const result = validateNewUser(newAccount);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }

    console.log(result);

    newAccount.phone = newAccount.phone.replace(/-/g, "");
    
    // // console.log(newAccount);

    const conn = await connect();

    // +TODO: new user cannot have email that already exists on server
    const emailCheck = await conn.query('SELECT * FROM users WHERE email = ?', [newAccount.email])
    if (emailCheck.length > 0) {
        res.send('logIn',{message: 'Email is already taken. Please log in.'});
        
        // return so we don't make a user with a duplicate email
        return;
    }
    // console.log(emailCheck);
    // console.log('did we get stuck?');
    
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
    res.render('login')
});

// +TODO: Implement logging in (post) route
app.post('/login', async (req, res) => {
    // query if the username and password are correct
    const loginInfo = {
        email: req.body.email.trim(),
        password: req.body.password.trim()
    }

    const conn = await connect();

    // +TODO: Query the DB to see if we have an account where the email and password matches
    const results = await conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [loginInfo.email, loginInfo.password]);

    // +TODO: If we have a username & password match in the DB, store the user info from the query and set logged in to true
    if (results.length() === 1) {
        userData = results[0];
        loggedIn = true;
    }

    // +TODO: // load the correct user page (user or admin) based on uid (admin account should be uid: 1)
    if (!userData.uid) {
        res.render('login');
    } else if (userData.uid !== '1') {
        const userAppointments = await conn.query('SELECT * FROM appointment WHERE uid = ?', [userData.uid]);
        console.log('user route:' + userAppointments);
        res.render('appointments', {userAppointments});
    } else {
        const adminAppointments = await conn.query('SELECT * FROM appointment');
        console.log('admin route:' + adminAppointments);
        res.render('appointments', {adminAppointments})
    }
});

// +TODO: Implement create new appointment
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
    
    // if the user is logged in, we can process the new appointment
    if (loggedIn) {
        const newAppointment = {
            uid: userData.uid.trim(),
            appt_date: req.body.appt_date.trim(),
            petname: req.body.petname.trim(),
            service: req.body.service.trim(),
            // set boolean for friendly or not
            friendly: req.body.friendly ? 1 : 0,
            timestamp: new Date()
        }
    
        // connect to the database
        const conn = await connect();

        // validate new appointment
        const result = validateNewAppointment(newAppointment);
        if (!result.isValid) {
            console.log(result.errors);
            res.send(result.errors);
            return;
        }

        // +TODO: implement add new appointment query
        const insertQuery = await conn.query(`insert into appointment
            (uid, appt_date, petname, pettype, service, friendly, timestamp)
            values (?, ?, ?, ?, ?, ?, ?)`,
            [ newAppointment.uid, newAppointment.appt_date, newAppointment.petname, newAppointment.service, newAppointment.friendly, newAppointment.timestamp ]
        );

        // TODO: Create the account creation confirmation page
        res.render('accountSuccess', { newAccount });
    } else {
        // if the user is not logged in send them to the login page
        res.send('login')
    }
});

// +TODO: Implement logout
app.get('/logout', (req, res) => {

    // reset loggedIn and userData
    loggedIn = false;
    userData = null;
    
    // send user to Home page
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});