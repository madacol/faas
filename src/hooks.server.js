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
    if (!session_id && !publicRoutes.includes(event.url.pathname)) {
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
                ARRAY_AGG(permission_id) permissions
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

    // Session expired
    if ((!user || user.expired) && !publicRoutes.includes(event.url.pathname)) {
        return redirect(`/login?redirectTo=${event.url.pathname}`, 'Session expired or invalid session.');
    }

    // User is logged in
    if (user && !user.expired) {
        event.locals.user = user;
    }

    // if logged in, but trying to access /login or /signup, redirect to /
    if (user && ['/login', '/signup' ].includes(event.url.pathname)) {
        return redirect('/', 'Already logged in.');
    }

    return await resolve(event);
}