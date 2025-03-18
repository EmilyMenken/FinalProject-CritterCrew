/* References
    https://mariadb.com/kb/en/datetime/
    https://mariadb.com/kb/en/boolean/
*/

create database petbarber;
use petbarber;

-- drop tables to reset
drop table if exists appointment;
drop table if exists users;

-- create users
create table users(
    uid int(5) auto_increment primary key,
    fname varchar(255),
    lname varchar(255),
    email varchar(255),
    password varchar(255),
    phone varchar(10),
    street_address varchar(255),
    city varchar(255),
    state varchar(2),
    zip_code varchar(5),
    timestamp datetime default now()
);

-- default test admin
insert into users (fname, lname, email, password, phone, street_address, city, state, zip_code)
values ('test', 'admin', 'admin@petbarber.com', 'password','1234567890', '123 Main St.', 'Auburn', 'WA', '98002');

-- default test user
insert into users (fname, lname, email, password, phone, street_address, city, state, zip_code)
values ('test', 'user', 'user@gmail.com', 'wordpass','1234567890', '321 Main St.', 'Auburn', 'WA', '98002');

-- create appointments
create table appointment(
    aid int(5) auto_increment primary key,
    uid int(5),
    appt_date datetime,
    petname varchar(255),
    pettype varchar(255),
    service varchar(255),
    friendly boolean default false,
    foreign key (uid) references users(uid)
);

-- test appointments
insert into appointment (uid, appt_date, petname, pettype, service, friendly)
values ('1', '2000-11-11 11:11:11', 'Spot', 'cat', 'bath', '1');
insert into appointment (uid, appt_date, petname, pettype, service, friendly)
values ('2', '2000-11-11 11:11:11', 'Mittens', 'dog', 'bath', '1');

