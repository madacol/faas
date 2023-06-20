import { sql } from './lib/db';

/**
 * Custom redirect function
 * @param {string} location - The location to redirect to
 * @param {string} [body] - The response body
 * @returns {Response} The redirect response
 */
function redirect(location, body) {
    return new Response(body, {
        status: 303,
        headers: { location }
    });
}

const publicRoutes = [
    '/',
    '/login',
    '/signup',
];


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const session_id = event.cookies.get('session');
    const isPathProtected = !publicRoutes.includes(event.url.pathname);
    if (!session_id && isPathProtected) {
        return redirect(`/login?redirectTo=${event.url.pathname}`, 'Not authenticated user.');
    }

    const {rows: [user]} = await sql`
        SELECT
            users.user_id,
            users.name,
            users.email,
            sessions.expires_at < NOW() AS expired,
            ARRAY_REMOVE(ARRAY_AGG(role_id), NULL) AS roles,
            array_merge_agg(permissions) AS permissions
            -- ARRAY_AGG(DISTINCT unnest(permissions)) permissions
        FROM sessions
        JOIN users USING (user_id)
        LEFT JOIN join_users_roles USING (user_id)
        LEFT JOIN (
            SELECT
                role_id,
                roles.name,
                ARRAY_AGG(permissions.name) permissions
            FROM roles
            JOIN join_roles_permissions USING (role_id)
            JOIN permissions USING (permission_id)
            GROUP BY role_id
        ) roles USING (role_id)
        WHERE session_id = ${session_id}
        GROUP BY
            users.user_id,
            users.name,
            users.email,
            sessions.expires_at
            ;
    `;

    // Invalid session
    if (user?.expired) {
        await sql`
            DELETE FROM sessions
            WHERE session_id=${session_id}
            ;
        `;
        event.cookies.delete('session');

        if (isPathProtected) {
            return redirect(`/login?redirectTo=${event.url.pathname}`, 'Invalid session.');
        }
    }

    // Session expired
    if (!user && isPathProtected) {
        return redirect(`/login?redirectTo=${event.url.pathname}`, 'Session expired');
    }

    // User is logged in
    if (user && !user.expired) {
        event.locals.user = user;
        if (event.url.pathname === '/login' || event.url.pathname === '/signup') {
            return redirect('/', 'Already logged in.');
        }
    }

    return await resolve(event);
}