-- Inicializa la base de datos, creando las tablas y las restricciones entre ellas.

DROP TABLE IF EXISTS users;

CREATE TABLE users(
	id INTEGER,
	firstname VARCHAR(30) NOT NULL CHECK (firstname <> ''),
	lastname VARCHAR(30) NOT NULL CHECK (lastname <> ''),
	email VARCHAR(30) NOT NULL CHECK (email <> ''),
	birthdate date NOT NULL,
	signindate date NOT NULL
);

ALTER TABLE users ADD CONSTRAINT pk_users PRIMARY KEY(id);
