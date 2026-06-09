#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  user_id           INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name        VARCHAR(255),
  last_name         VARCHAR(255),
  username          VARCHAR(255),
  profile_picture   VARCHAR(255),
  hash              TEXT,
  isAdmin           BOOLEAN DEFAULT false
);


CREATE TABLE IF NOT EXISTS posts (
  post_id               INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id               VARCHAR(255),
  post_title            VARCHAR(255),
  post_description      VARCHAR(255) DEFAULT 'No description provided',
  created_at            TIMESTAMP DEFAULT NOW()
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://samin-ahmed:12345@localhost:5432/opawnion",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
