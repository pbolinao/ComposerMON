CREATE TABLE IF NOT EXISTS teams (
    `ID` INT Primary Key,
    `Creators_Team` TINYINT,
    `Composer_1` VARCHAR(255) CHARACTER SET utf8,
    `Composer_1_ID` INT,
    `Composer_2` VARCHAR(255) CHARACTER SET utf8,
    `Composer_2_ID` INT,
    `Composer_3` VARCHAR(255) CHARACTER SET utf8,
    `Composer_3_ID` INT
);

INSERT INTO teams VALUES
    (1,1,'Antonio Vivaldi',11,'Trumpet Boy',10,'Frederic Chopin',5),
    (2,1,'Ludwig van Beethoven',2,'Johann Sebastian Bach',3,'Pyotr Ilyich Tchaikovsky',9),
    (3,1,'Wolfgang Amadeus Mozart',1,'Ludwig van Beethoven',2,'Giuseppe Tartini',8),
    (4,1,'Trumpet Boy',10,'Trumpet Boy',10,'Trumpet Boy',10);