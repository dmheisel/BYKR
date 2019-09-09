
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- users table for user id, username, and password
CREATE DATABASE "bykr_app";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

--table to contain user settings and account info - default location lat and lon, if they have given permission to use device location
CREATE TABLE user_settings (
    id serial primary key,
    user_id INT REFERENCES "user",
    lat decimal not null,
    lng decimal not null,
    use_device_location boolean default false
);

--table to contain different types of locations available to create/view
create table location_types (
    id serial primary key,
    type_name varchar(250),
    services varchar(500)
);

--location table contains details for each location
create table locations (
    id serial primary key,
    lat decimal not null,
    lng decimal not null,
    location_type_id int references location_types,
    created_by_user_id int references "user"
);

--junction table for users saved locations
create table users_locations_saved (
    id serial primary key,
    user_id int references "user",
    location_id int references locations
);

--junction table for ratings on each location
create table users_locations_ratings (
    id serial primary key,
    user_id int references "user",
    location_id int references locations,
    rating int not null
);

--junction table for comments on each location
create table users_locations_comments (
    id serial primary key,
    user_id int references "user",
    location_id int references locations,
    "comment" varchar(750) not null
);
