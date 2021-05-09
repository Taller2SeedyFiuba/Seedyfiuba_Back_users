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
-- ALTER TABLE taller_2.public.users ADD CONSTRAINT firstname_empty_users CHECK(firstname <> '');
-- ALTER TABLE taller_2.public.users ADD CONSTRAINT lastname_empty_users CHECK(lastname <> '');
-- ALTER TABLE taller_2.public.users ADD CONSTRAINT email_empty_users CHECK(birthdate <> '');
-- ALTER TABLE taller_2.public.users ADD CONSTRAINT email_empty_users CHECK(email <> '');
-- ALTER TABLE taller.taller_2.colectivos_por_parada ADD CONSTRAINT pk_colectivos_por_parada PRIMARY KEY(cod_parada, num_colectivo);

-- ALTER TABLE taller.taller_2.colectivos_por_parada DROP CONSTRAINT fk_colectivos_por_parada_parada;

/*
ALTER TABLE taller.taller_2.colectivos_por_parada 
			ADD CONSTRAINT fk_colectivos_por_parada_parada
			FOREIGN KEY(cod_parada)
			REFERENCES taller.taller_2.paradas(cod_parada)
			ON DELETE NO ACTION
			ON UPDATE CASCADE;


INSERT INTO taller_2.public.users
	(id, firstname, lastname, email, signindate)
	VALUES (1, 'Juan', 'Lopez', 'jlop@gmail.com', '15-03-1998');

INSERT INTO taller_2.public.users
	(id, lastname, email, signindate)
	VALUES (2, 'Lopez', 'jlop@gmail.com', '15-03-1998');
	
*/
