exports.up = pgm => {
    pgm.sql`
        CREATE TYPE pay_pal_request_status AS ENUM ('pending', 'requester paid', 'pending requestee payment', 'completed', 'cancelled');
        CREATE TABLE pay_pal_requests (
            pay_pal_request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            pal_request_id UUID NOT NULL REFERENCES pal_requests(pal_request_id) ON DELETE CASCADE ON UPDATE CASCADE,
            stripe_requester_session_id VARCHAR(255),
            stripe_requestee_session_id VARCHAR(255),
            status pay_pal_request_status NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `
};

exports.down = pgm => {
    pgm.sql`
        DROP TABLE pay_pal_requests;
        DROP TYPE pay_pal_request_status;
    `;
}