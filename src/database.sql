CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL UNIQUE, 
    email VARCHAR(40) NOT NULL UNIQUE,
    passcode VARCHAR(255) NOT NULL,
    


)