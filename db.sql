CREATE DATABASE ecommerce;

CREATE TABLE product(
  product_id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  price DEC(10,2),
  description VARCHAR(300),
  category VARCHAR(150),
  image VARCHAR(150)  
);

ALTER TABLE product
RENAME TO products;