exports.up = pgm => {
    pgm.sql`
        CREATE TABLE "sessions" (
            "session_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            "user_id" INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            "expire" timestamp(6) NOT NULL
        );

        CREATE INDEX "IDX_session_expire" ON "sessions" ("expire");
    `
};

exports.down = pgm => {
    pgm.sql`DROP TABLE sessions`;
}
