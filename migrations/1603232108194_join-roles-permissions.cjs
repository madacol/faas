exports.up = pgm => {
    pgm.sql`
        CREATE TABLE join_roles_permissions (
            role_id INTEGER NOT NULL REFERENCES roles(role_id) ON DELETE CASCADE ON UPDATE CASCADE,
            permission_id INTEGER NOT NULL REFERENCES permissions(permission_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        ALTER TABLE join_roles_permissions
        ADD CONSTRAINT join_roles_permissions_pk PRIMARY KEY (role_id, permission_id);
    `
};

exports.down = pgm => {
    pgm.sql`DROP TABLE join_roles_permissions`;
}