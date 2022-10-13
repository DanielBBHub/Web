DROP TABLE Muestras;
create table Muestras (
	id INTEGER PRIMARY KEY,
	major char(8) NOT NULL,
	minor char(8) NOT NULL
);

INSERT INTO Muestras VALUES (NULL, "1234", "2234");
INSERT INTO Muestras VALUES (NULL, "1235", "2238");