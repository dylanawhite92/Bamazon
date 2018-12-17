DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oranges", "Fresh Fruit", 0.69, 450), 
("BamazonBasics Lightning Cable - 3 ft.", "Electronics - Accessories", 7.99, 45),
("Hanes White T-Shirts", "Men's Clothing", 5.99, 99), 
("Clorox Zero Splash Bleach Crystals", "Household Supplies", 11.50, 12),
("Super Smash Bros. Ultimate", "Electronics - Video Games", 59.88, 0), 
("Dungeons & Dragons Player's Handbook", "Books", 22.74, 65),
("Carrie by Stephen King", "Books", 7.19, 22), 
("Women's Barre Yoga Socks", "Women's Clothing", 16.58, 249),
("BamazonBasics Tank Undershirts", "Men's Clothing", 14.00, 24), 
("Ball Package of 24 Glass Mason Jars - 16 oz.", "Home & Kitchen", 13.65, 38);