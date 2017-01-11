CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    primary key (item_id)
);

USE Bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rock Paper Coding", "Books", 50.00, 20),
	("Flying Laptop", "Technology", 2000.00, 100),
    ("Emergent Athletic Shorts", "Apparel", 75.00, 10),
    ("PowerUp Coffee", "Food", 5.00, 200),
    ("Angry Birds", "Games", 1.00, 1000),
    ("Hoverboard", "Technology", 5000.00, 2),
    ("Space Jam Ball", "Sports", 20000.00, 1),
    ("Dragon Ball", "Wellness", 30000.00, 7),
    ("Steak", "Food", 10.00, 200),
    ("Batman Utility Belt", "Fashion", 2000.00, 3);
    
    

    
SELECT * FROM products;