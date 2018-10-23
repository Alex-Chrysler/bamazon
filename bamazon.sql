-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect animals_db --
USE bamazon_db;

-- Creates the table "products" within bamazon --
CREATE TABLE products (
  
   id INT NOT NULL AUTO_INCREMENT,

  product_name VARCHAR(255),

  department_name VARCHAR(30),
 
  price DECIMAL(100,2) NULL,

  stock_quantity INT,
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks", "clothing", 5.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirts", "clothing", 8.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Avatar", "movies", 15.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Transformers", "movie", 17.00, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("carrots", "food", 2.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("soup", "food", 1.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "clothing", 18.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bread", "food", 3.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Venom", "movies", 25.00, 9);