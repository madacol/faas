exports.up = pgm => {
    pgm.sql`
        ALTER TYPE pay_status ADD VALUE 'captured' AFTER 'paid';
        ALTER TYPE pay_status ADD VALUE 'rejected';
    `
};

exports.down = pgm => {
}