exports.up = pgm => {
    pgm.sql`
        ALTER TABLE users
        ADD COLUMN bio TEXT NOT NULL DEFAULT ''
        ;
    `
};

exports.down = pgm => {
    pgm.sql`
        ALTER TABLE users
        DROP COLUMN bio
        ;
    `
}