DROP TABLE Muestras;
create table Muestras (
	id INTEGER PRIMARY KEY,
	muestra char(4) NOT NULL,
	fecha DATE NOT NULL
);

INSERT INTO Muestras VALUES (NULL, "1234", '2022-09-22');
INSERT INTO Muestras VALUES (NULL, "1235", '2022-09-23');