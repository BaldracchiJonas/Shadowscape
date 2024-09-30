# Shadowscape

## Project setup
1. Clone the repository
2. Run "cd back"
3. Run "npm install"
4. Run "node index.js"

## Create Tables SQL Script
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    status_id INTEGER REFERENCES status(id) ON DELETE CASCADE
);

## Create Tables Migrations
npx sequelize-cli model:generate --name User --attributes name:string
npx sequelize-cli model:generate --name Task --attributes description:string,status_id:integer,user_id:integer
npx sequelize-cli model:generate --name Status --attributes name:string

npx sequelize-cli db:migrate

## Insert Data
INSERT INTO status (name) VALUES
('Open'),
('In Progress'),
('Done');

INSERT INTO "user" (name) VALUES
('Alice'),
('Bob'),
('Charlie');

INSERT INTO task (description, user_id, status_id) VALUES
('Task 1 for Alice', 1, 1), -- Pending
('Task 2 for Alice', 1, 2), -- In Progress
('Task 1 for Bob', 2, 3),   -- Completed
('Task 1 for Charlie', 3, 1); -- Pending

## Insert Data Seeders
npx sequelize-cli seed:generate --name statusSeeder
npx sequelize-cli seed:generate --name userSeeder
npx sequelize-cli seed:generate --name taskSeeder