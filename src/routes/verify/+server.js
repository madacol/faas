import { stripe } from "$lib/server/stripe.js";
import { json } from "@sveltejs/kit";

export async function POST({ locals }) {
    // In the route handler for /create-verification-session:
    // Authenticate your user.

    // Create the session.
    const verificationSession = await stripe.identity.verificationSessions.create({
        type: 'document',
        metadata: {
            user_id: locals.user.user_id,
        },
    });

    // Return only the client secret to the frontend.
    const clientSecret = verificationSession.client_secret;

    return json(clientSecret);
}