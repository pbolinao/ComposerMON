CREATE TABLE IF NOT EXISTS items (
    `ID` INT Primary Key,
    `Name` VARCHAR(10) CHARACTER SET utf8,
    `Effect` VARCHAR(32) CHARACTER SET utf8,
    `Value` INT
);
INSERT INTO items VALUES
    (1,'Potion','Heals 30%',30),
    (2,'Max Potion','Heals full health',100),
    (3,'Revive','Revives a ComposerMON to half hp',50),
    (4,'Max-Revive','Revives a ComposerMON to full HP',100);