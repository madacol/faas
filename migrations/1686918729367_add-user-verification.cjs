exports.up = pgm => {
    pgm.sql`
        ALTER TABLE users
        ADD COLUMN is_verified BOOLEAN NOT NULL DEFAULT FALSE
        ;
    `
};

exports.down = pgm => {
    pgm.sql`
        ALTER TABLE users
        DROP COLUMN is_verified
        ;
    `
}