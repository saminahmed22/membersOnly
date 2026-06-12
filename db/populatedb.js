#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS members_only_users (
  user_id           INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name        VARCHAR(255),
  last_name         VARCHAR(255),
  username          VARCHAR(255),
  profile_picture   VARCHAR(255),
  hash              TEXT,
  status            VARCHAR(255) DEFAULT 'general',
  isAdmin           BOOLEAN DEFAULT false
);


CREATE TABLE IF NOT EXISTS members_only_posts (
  post_id               INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id               INTEGER,
  post_title            VARCHAR(255),
  post_description      VARCHAR(255) DEFAULT 'No description provided',
  category              VARCHAR(255) DEFAULT 'general',
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS members_only_images (
  image_id              INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  image_link            TEXT,
  use_count             INTEGER
);

INSERT INTO members_only_images (image_link, use_count)
VALUES
  ('https://img.itch.zone/aW1nLzIxNzIzNTYwLmpwZw==/original/5fS%2BUG.jpg', 0),
  ('https://media.tenor.com/ThwiQuVpaicAAAAM/cat-licking-a-lollipop-and-being-super-cool.gif', 0),
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVzWx_1RCNlyYsP9TzRMP8FyZbOvx28wKb2A&s', 0),
  ('https://i.pinimg.com/736x/ef/aa/85/efaa85262c2979c0bce49d0dc643d49e.jpg', 0),
  ('https://i.scdn.co/image/ab67616d00001e02020e96f4b12ac5979768cedf', 0),
  ('https://pbs.twimg.com/profile_images/1956647059764703232/8nE1Ktpj_400x400.jpg', 0),
  ('https://static.wikia.nocookie.net/silly-cat/images/3/39/Site-community-image/revision/latest?cb=20230715182629', 0),
  ('https://i.pinimg.com/originals/69/d4/f5/69d4f553a801270cc080e78402855353.jpg?nii=t', 0),
  ('https://i.ytimg.com/vi/vickng51TkE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAw0RAccP4zWLS_F0J2Sy5-xVSY6A', 0),
  ('https://i.redd.it/kb49b4yxdzd91.jpg', 0),
  ('https://i.redd.it/reddit-silly-cat-faces-close-up-v0-g3t8twnwb63c1.jpg?width=1170&format=pjpg&auto=webp&s=1b8fe7872e7e0e09a3250ab832720dc6dc1c2ab5', 0),
  ('https://preview.redd.it/what-is-she-plotting-v0-g3s2kx9wid2h1.jpeg?width=640&crop=smart&auto=webp&s=2034b8f876c90e3c215410b1dd505eda03c881ae', 0),
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTedQ3SSzuPr0WQLcY5utiXAvooGMZptfTRXA&s', 0),
  ('https://media.tenor.com/3YunLjG4jrEAAAAM/sendy-cat-meme.gif', 0),
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMfvCqG1NEdLNW0UV6U9Rz-uro8xs6NWnCkg&s', 0),
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC20-jZoJmKvMY0ue7rh-a8wfWgA3CImIzzg&s', 0),
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKQB4ouq5cO5X3Nv7wy1BV9Ojjk7PSjnNN1w&s', 0);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://samin-ahmed:12345@localhost:5432/odinprojects",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
