-- ================================================
-- Contact Book - Database Setup Script
-- ================================================

-- 1. Create the database (skip if it already exists)
CREATE DATABASE IF NOT EXISTS contact_book_db;
USE contact_book_db;

-- 2. Create the contacts table
-- NOTE: Spring Boot (spring.jpa.hibernate.ddl-auto=update) will also
-- auto-create this table on first run, but it's good practice to know
-- the exact schema and be able to set it up manually too.
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mobile VARCHAR(10) NOT NULL,
    email VARCHAR(100),
    city VARCHAR(100)
);

-- 3. Insert sample data
INSERT INTO contacts (name, mobile, email, city) VALUES
('Rahul', '9876543210', 'rahul@gmail.com', 'Chennai'),
('Priya', '9123456789', 'priya@gmail.com', 'Coimbatore');

-- 4. Verify
SELECT * FROM contacts;
