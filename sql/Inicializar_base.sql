-- Inicializa la base de datos, creando las tablas y las restricciones entre ellas.

SET SEARCH_PATH TO 'public';

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
	VALUES  ('3ozxgItXE5cZFGtYMhNAs4dvqSA2', 'root', 'root', 'root@seedyfiuba.com', '1990-01-01', TRUE),
	        ('f8MPMhialjZCCB2yUMZjCPG5yTs1', 'entrepreneur', 'entrepreneur', 'entrepreneur@test.com', '1990-01-01', FALSE),
	        ('qDzHIJjwNqSm8HEN308LeQXHnbq2', 'sponsor', 'sponsor', 'sponsor@test.com', '1990-01-01', FALSE)
