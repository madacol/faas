exports.up = pgm => {
    pgm.sql`
        WITH inserted_user as (
            INSERT INTO users (username, name, password_hash, email, lastname) VALUES ('master', 'master', '$argon2id$v=19$m=65536,t=12,p=4$SKVuXEEnjHrkSl6GKWGMFA$DCX+rCN5rNqMUoN5f7kw8tXy3+FSjHCDERNS3Y3YbsE','', 'master') RETURNING user_id
        ), inserted_role as (
            INSERT INTO roles (name) VALUES ('master') RETURNING role_id
        ), t as (
            INSERT INTO join_users_roles (user_id, role_id)
            SELECT user_id, role_id FROM inserted_user, inserted_role
        )
        INSERT INTO join_roles_permissions (role_id, permission_id)
        SELECT role_id, permission_id FROM inserted_role, permissions;
    `
};

exports.down = pgm => {
    pgm.sql(
        `DELETE FROM users WHERE username = 'master';
        DELETE FROM roles WHERE name = 'master';`
    )
};
