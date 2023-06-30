exports.up = pgm => {
    pgm.sql`
        ALTER TABLE users
        ADD COLUMN image_data_url TEXT
        ;
    `
};

exports.down = pgm => {
    pgm.sql`
        ALTER TABLE users
        DROP COLUMN image_data_url
        ;
    `
}