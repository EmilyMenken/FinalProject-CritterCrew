create database petbarber;
use petbarber;

drop table if exists users;
create table users(
    uid int(5) auto_increment primary key,
    fname varchar(255),
    lname varchar(255),
    email varchar(255),
    phoneNumber varchar(255),
    address varchar(255),
    timestamp datetime default now()
);

create table appointment(
    
)
