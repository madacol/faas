exports.up = pgm => {
    pgm.sql`
        CREATE TYPE pay_status AS ENUM ('pending', 'paid', 'cancelled');

        CREATE TABLE pay_requests (
            pay_request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            pal_request_id UUID NOT NULL REFERENCES pal_requests(pal_request_id) ON DELETE CASCADE ON UPDATE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
            status pay_status NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `
};

exports.down = pgm => {
    pgm.sql`
        DROP TABLE pay_requests;
        DROP TYPE pay_status;
    `;
}