-- Inicializa la base de datos, creando las tablas y las restricciones entre ellas.

DROP TABLE IF EXISTS users;

CREATE TABLE users(
	id VARCHAR(255) NOT NULL CHECK (id <> ''),
	firstname VARCHAR(30) NOT NULL CHECK (firstname <> ''),
	lastname VARCHAR(30) NOT NULL CHECK (lastname <> ''),
	email VARCHAR(30) NOT NULL CHECK (email <> ''),
	birthdate date NOT NULL,
	signindate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	isadmin BOOLEAN DEFAULT FALSE
);

ALTER TABLE users ADD CONSTRAINT pk_users PRIMARY KEY(id);

-- Cargamos al usuario root en el sistema
INSERT INTO users (id, firstname, lastname, email, birthdate, isadmin)
	VALUES ('3ozxgItXE5cZFGtYMhNAs4dvqSA2',
			'root',
			'root',
			'root@seedyfiuba.com',
			'1990-01-01',
			TRUE);

INSERT INTO users (id, firstname, lastname, email, birthdate, isadmin)
	VALUES ('f8MPMhialjZCCB2yUMZjCPG5yTs1',
			'entrepreneur',
			'entrepreneur',
			'entrepreneur@test.com',
			'1990-01-01',
			FALSE);

INSERT INTO users (id, firstname, lastname, email, birthdate, isadmin)
	VALUES ('qDzHIJjwNqSm8HEN308LeQXHnbq2',
			'sponsor',
			'sponsor',
			'sponsor@test.com',
			'1990-01-01',
			FALSE);

INSERT INTO users (id, firstname, lastname, email, birthdate, isadmin)
	VALUES ('C5Jeg8M5HKaIKOqXt5bZX7IdWFk2',
			'seer1',
			'seer1',
			'seer1@test.com',
			'1990-01-01',
			FALSE);

INSERT INTO users (id, firstname, lastname, email, birthdate, isadmin)
	VALUES ('pvs2jwbOFiZN4WOtQBYmr5LzLU53',
			'seer2',
			'seer2',
			'seer2@test.com',
			'1990-01-01',
			FALSE);

INSERT INTO users (id, firstname, lastname, email, birthdate, isadmin)
	VALUES ('sSbHAjsWp8X3mNJ6rd1JtQB4vtU2',
			'seer3',
			'seer3',
			'seer3@test.com',
			'1990-01-01',
			FALSE);