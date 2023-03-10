CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(40) NOT NULL UNIQUE, 
    email VARCHAR(40) NOT NULL UNIQUE,
    passcode VARCHAR(255) NOT NULL,
    poll_id BIGINT REFERENCES poll(id),

)


CREATE TABLE poll(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    descriptions VARCHAR(255) NOT NULL,
     
)

CREATE TABLE poll_answers(
    id SERIAL NOT NULL PRIMARY KEY,
    poll_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    votes VARCHAR(255) NOT NULL DEFAULT '0',
)


/* change column from not null to nullable*/

/*ALTER TABLE users ALTER COLUMN poll_id DROP NOT NULL;*/