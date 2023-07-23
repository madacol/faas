import { redirect } from '@sveltejs/kit';

export async function load({locals, url}) {

    if (locals.user) {
        // if user is not verified, redirect to the verify page
        if (!locals.user.is_verified && !url.pathname.startsWith('/verify')) {
            throw redirect(303, '/verify');
        }
    }

    return {
        user: locals.user
    }
}