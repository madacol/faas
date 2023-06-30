exports.up = pgm => {
    pgm.sql`
        UPDATE users
        SET email = CONCAT(username, '@example.com')
        WHERE email IS NULL;

        ALTER TABLE users
        ADD COLUMN birthday DATE,
        ADD COLUMN gender VARCHAR(32),
        DROP COLUMN username;
    `
};

/*
exports.down = pgm => {
    pgm.sql`
        ALTER TABLE users
        ADD COLUMN username VARCHAR(30),
        DROP COLUMN birthday,
        DROP COLUMN gender;

        UPDATE users
        SET username = email;

        ALTER TABLE users
        ALTER COLUMN username SET NOT NULL,
        ADD UNIQUE (username);
    `
};
*/
