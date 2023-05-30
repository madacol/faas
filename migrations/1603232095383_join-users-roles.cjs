exports.up = pgm => {
    pgm.sql`
        CREATE TABLE join_users_roles (
            user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            role_id INTEGER NOT NULL REFERENCES roles(role_id) ON DELETE CASCADE
        );

        ALTER TABLE join_users_roles
        ADD CONSTRAINT join_users_roles_pk PRIMARY KEY (user_id, role_id);
    `
};

exports.down = pgm => {
    pgm.sql`DROP TABLE join_users_roles`;
}