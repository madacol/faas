exports.up = pgm => {
    pgm.sql`
        CREATE TABLE pal_requests (
            pal_request_id SERIAL PRIMARY KEY,
            requester_id INTEGER NOT NULL REFERENCES users(user_id),
            requestee_id INTEGER NOT NULL REFERENCES users(user_id),
            status VARCHAR(255) NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `
};

exports.down = pgm => {
    pgm.sql`DROP TABLE pal_requests`;
}