CREATE TABLE IF NOT EXISTS composers (
    `ID` INT Primary Key,
    `Name` VARCHAR(24) CHARACTER SET utf8,
    `Attack_IDs_Array` VARCHAR(14) CHARACTER SET utf8,
    `Image` VARCHAR(59) CHARACTER SET utf8
);
INSERT INTO composers VALUES
    (1,'Wolfgang Amadeus Mozart','1, 2, 3, 4','https://jamesp.ca/composermon/api/v1/images/mozart.png'),
    (2,'Ludwig van Beethoven','5, 6, 7, 8','https://jamesp.ca/composermon/api/v1/images/beethoven.png'),
    (3,'Johann Sebastian Bach','9, 10, 11, 12','https://jamesp.ca/composermon/api/v1/images/bach.png'),
    (4,'Johannes Brahms','13, 14, 15, 16','https://jamesp.ca/composermon/api/v1/images/brahms.png'),
    (5,'Frederic Chopin','17, 18, 19, 20','https://jamesp.ca/composermon/api/v1/images/chopin.png'),
    (6,'Claude Debussy','21, 22, 23, 24','https://jamesp.ca/composermon/api/v1/images/debussy.png'),
    (7,'Franz Joseph Haydn','25, 26, 27, 28','https://jamesp.ca/composermon/api/v1/images/haydn.png'),
    (8,'Giuseppe Tartini','29, 30, 31, 32','https://jamesp.ca/composermon/api/v1/images/tartini.png'),
    (9,'Pyotr Ilyich Tchaikovsky','33, 34, 35, 36','https://jamesp.ca/composermon/api/v1/images/tchaikovsky.png'),
    (10,'Trumpet Boy','37, 38, 39, 40','https://jamesp.ca/composermon/api/v1/images/trumpetboy.png'),
    (11,'Antonio Vivaldi','41, 42, 43, 44','https://jamesp.ca/composermon/api/v1/images/vivaldi.png'),
    (12,'Richard Wagner','45, 46, 47, 48','https://jamesp.ca/composermon/api/v1/images/wagner.png');