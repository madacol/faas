exports.up = pgm => {
    pgm.sql`
        CREATE TYPE pal_request_status AS ENUM ('pending', 'requester paid', 'requestee paid', 'cancelled', 'overpaid');

        ALTER TABLE pal_requests
        ALTER COLUMN status DROP DEFAULT,
        ALTER COLUMN status TYPE pal_request_status USING ('pending'::pal_request_status),
        ALTER COLUMN status SET DEFAULT 'pending'::pal_request_status;
    `
};

exports.down = pgm => {
    pgm.sql`
        ALTER TABLE pal_requests
        ALTER COLUMN status DROP DEFAULT,
        ALTER COLUMN status TYPE VARCHAR(255) USING (status::VARCHAR(255)),
        ALTER COLUMN status SET DEFAULT 'pending'
        ;

        DROP TYPE pal_request_status;
    `;
}