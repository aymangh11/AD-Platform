CREATE DATABASE ctf_db;

USE ctf_db;

CREATE TABLE flags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flag VARCHAR(255) NOT NULL
);

-- Insert some example flags
INSERT INTO flags (flag) VALUES ('CTF{example_flag}');
