// @ts-nocheck
import { WEBHOOK_SECRET } from "$env/static/private";
import { sql } from "$lib/server/db";
import { sendMail } from "$lib/server/sendMail.js";
import { stripe } from "$lib/server/stripe.js";
import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export async function POST({ locals, request  }) {
    let event;

    // Verify the event came from Stripe
    try {
        const sig = request.headers.get('stripe-signature');
        if (!sig) throw error(400, 'Missing stripe-signature header');

        const body = await request.text();
        event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    } catch (err) {
        // On error, log and return the error message
        console.error(`❌ Error message: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`);
    }

    // Successfully constructed event
    switch (event.type) {
        case 'file.created': {

            break;
        }
        case 'identity.verification_session.processing': {

            break;
        }
        case 'identity.verification_session.verified': {
            // All the verification checks passed
            const verificationSession = event.data.object;

            console.log('Verification check passed: ' + verificationSession.id);

            // Update your user's identity status in your database
            const { rows: [user] } = await sql`
                UPDATE users
                SET is_verified = true
                WHERE user_id = ${verificationSession.metadata.user_id}
                RETURNING name, lastname, email
                ;
            `;

            sendMail(
                user.email,
                'Your identity has been verified',
                `Hi ${user.name} ${user.lastname},\n\n`
                    + `Your identity has been verified.\n\n`
                    + `Thanks,\n`
                    + `The Friendpals team`
            );

            break;
        }
        case 'identity.verification_session.requires_input': {
          // At least one of the verification checks failed
            const verificationSession = event.data.object;

            console.log('Verification check failed: ' + verificationSession.last_error.reason);

            const { rows: [user] } = await sql`
                SELECT name, lastname, email
                FROM users
                WHERE user_id = ${verificationSession.metadata.user_id}
                ;
            `;

            sendMail(
                user.email,
                'Your identity verification failed',
                `Hi ${user.name} ${user.lastname},\n\n`
                    + `Your identity verification failed because "${verificationSession.last_error.reason}".\n\n`
                    + `Please try again.\n\n`
                    + `Thanks,\n`
                    + `The Friendpals team`
            );

            // Handle specific failure reasons
            switch (verificationSession.last_error.code) {
                case 'document_unverified_other': {
                    // The document was invalid
                    break;
                }
                case 'document_expired': {
                    // The document was expired
                    break;
                }
                case 'document_type_not_supported': {
                    // document type not supported
                    break;
                }
                default: {
                    // ...
                    break;
                }
            }
            break;
        }
    }

    return json({received: true});
}
