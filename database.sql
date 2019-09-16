
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
    user_id INT REFERENCES "user" on delete cascade,
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
    "address" varchar(500),
    locality varchar(500),
    location_type_id int references location_types on delete cascade,
    created_by_user_id int references "user" on delete cascade
);

--junction table for users saved locations
create table users_locations_saved (
    id serial primary key,
    user_id int references "user" on delete cascade,
    location_id int references locations on delete cascade
);

--junction table for ratings on each location
create table users_locations_ratings (
    id serial primary key,
    user_id int references "user" on delete cascade,
    location_id int references locations on delete cascade,
    rating int not null
);

--junction table for comments on each location
create table users_locations_comments (
    id serial primary key,
    user_id int references "user" on delete cascade,
    location_id int references locations on delete cascade,
    "comment" varchar(750) not null
);

SELECT "locations"."id", "lat", "lng", "created_by_user_id", "type_name"
    FROM locations
    JOIN location_types
      ON locations.location_type_id = location_types.id;

--sql query to get a location and all associated comments and their user_ids who created them
select
    locations.id,
    lat,
    lng,
    location_type_id,
    array_agg(users_locations_comments.comment) as user_comments,
    array_agg(users_locations_comments.user_id) as user_ids
  FROM
    locations
  left join
    users_locations_comments
  ON
    locations.id = users_locations_comments.location_id
  WHERE
    locations.id = $1
  group BY
    locations.id;

--query to get location and the average user rating on that location
select
    locations.id,
    round(avg(rating), 1) as avg_rating
	from
		locations
	left join
		users_locations_ratings
	on
		locations.id = users_locations_ratings.location_id
	where
		locations.id = $1
	group by
		locations.id;
