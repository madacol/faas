exports.up = pgm => {
    pgm.sql`
        CREATE TYPE user_verification_status AS ENUM ('unverified', 'pending', 'verified', 'rejected', 'requires_input');

        ALTER TABLE users
        ADD COLUMN verification_status user_verification_status NOT NULL DEFAULT 'unverified'
        ;

        -- Update all users already verified with 'is_verified' to the new column 'verification_status'
        UPDATE users
        SET verification_status = 'verified'
        WHERE is_verified = true
        ;
    `
};

exports.down = pgm => {
    pgm.sql`
        ALTER TABLE users
        DROP COLUMN verification_status
        ;

        DROP TYPE users_verification_status;
    `
}