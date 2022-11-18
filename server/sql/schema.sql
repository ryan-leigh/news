DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS publishers CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS topic_subscriptions CASCADE;
DROP TABLE IF EXISTS publisher_subscriptions CASCADE;
DROP TABLE IF EXISTS publishers_topics CASCADE;

CREATE TABLE users (
  id serial,
  "name" text,
  email text,
  PRIMARY KEY(id)
);

CREATE TABLE topics (
  id serial,
  "name" text,
  PRIMARY KEY(id)
);

CREATE TABLE publishers (
  id serial,
  "name" text,
  PRIMARY KEY(id)
);

CREATE TABLE articles (
  id serial,
  _id int,
  headline text,
  image_url text,
  summary text,
  topic_id int,
  topic_name text,
  publisher_id int,
  publisher_name text,
  PRIMARY KEY(id)
);

CREATE TABLE topic_subscriptions (
  id serial,
  user_id int,
  topic_id int,
  PRIMARY KEY(id),
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id),
  CONSTRAINT fk_topic_id
    FOREIGN KEY(topic_id)
      REFERENCES topics(id)
);

CREATE TABLE publisher_subscriptions (
  id serial,
  user_id int,
  publisher_id int,
  PRIMARY KEY(id),
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id),
  CONSTRAINT fk_publisher_id
    FOREIGN KEY(publisher_id)
      REFERENCES publishers(id)
);

CREATE TABLE publishers_topics (
  id serial,
  publisher_id int,
  topic_id int,
  PRIMARY KEY(id),
  CONSTRAINT fk_publisher_id
    FOREIGN KEY(publisher_id)
      REFERENCES publishers(id),
  CONSTRAINT fk_topic_id
    FOREIGN KEY(topic_id)
      REFERENCES topics(id)
)
