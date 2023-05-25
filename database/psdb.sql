DROP DATABASE IF EXISTS products;
CREATE DATABASE products
WITH
  ENCODING = 'UTF8';

DROP TABLE IF EXISTS "product" CASCADE;
DROP TABLE IF EXISTS "styles" CASCADE;
DROP TABLE IF EXISTS "photos" CASCADE;
DROP TABLE IF EXISTS "features" CASCADE;

CREATE TABLE "product" (
  "product_id" serial PRIMARY KEY NOT NULL,
  "name" varchar,
  "slogan" varchar,
  "description" varchar,
  "category" varchar,
  "default_price" integer
);

CREATE TABLE "styles" (
  "style_id" serial PRIMARY KEY NOT NULL,
  "product_id" integer,
  "name" varchar,
  "sale_price" varchar,
  "original_price" integer,
  "default" integer
);

CREATE TABLE "photos" (
  "photo_id" serial PRIMARY KEY NOT NULL,
  "style_id" integer,
  "url" varchar,
  "thumbnail_url" varchar
);

CREATE TABLE "features" (
  "feature_id" serial PRIMARY KEY NOT NULL,
  "product_id" integer,
  "feature" varchar,
  "value" varchar
);

CREATE TABLE "skus" (
  "skus_id" serial PRIMARY KEY NOT NULL,
  "style_id" integer,
  "size" varchar(5),
  "quantity" varchar
);

CREATE TABLE "related" (
  "id" serial PRIMARY KEY NOT NULL,
  "product_id" integer NOT NULL,
  "related_id" integer NOT NULL
);

ALTER TABLE "styles" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("product_id");

ALTER TABLE "photos" ADD FOREIGN KEY ("style_id") REFERENCES "styles" ("style_id");

ALTER TABLE "features" ADD FOREIGN KEY ("feature_id") REFERENCES "product" ("product_id");

ALTER TABLE "skus" ADD FOREIGN KEY ("style_id") REFERENCES "styles" ("style_id");

ALTER TABLE "related" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("product_id");