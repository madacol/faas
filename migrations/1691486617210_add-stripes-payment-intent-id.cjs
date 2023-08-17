exports.up = pgm => {
    pgm.sql`
        ALTER TABLE pay_requests
        ADD COLUMN payment_intent_id VARCHAR(255)
        ;
    `
};

exports.down = pgm => {
    pgm.sql`
        ALTER TABLE pay_requests
        DROP COLUMN payment_intent_id
        ;
    `
}