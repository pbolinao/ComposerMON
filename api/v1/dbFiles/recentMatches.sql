CREATE TABLE IF NOT EXISTS recentMatches (
    `ID` SERIAL Primary Key,
    `Player_1` VARCHAR(255) CHARACTER SET utf8,
    `Player_2` VARCHAR(255) CHARACTER SET utf8,
    `Winner` VARCHAR(255) CHARACTER SET utf8
);