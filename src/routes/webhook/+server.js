// @ts-nocheck
import { WEBHOOK_SECRET } from "$env/static/private";
import { sql } from "$lib/server/db";
import { sendMail } from "$lib/server/sendMail.js";
import { stripe } from "$lib/server/stripe.js";
import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export async function POST({ request, url }) {
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
            const verificationSession = event.data.object;
            await sql`
                UPDATE users
                SET verification_status = 'pending'
                WHERE user_id = ${verificationSession.metadata.user_id}
                RETURNING name, lastname, email
                ;
            `;
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
                    , verification_status = 'verified'
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
                UPDATE users
                SET verification_status = 'requires_input'
                WHERE user_id = ${verificationSession.metadata.user_id}
                RETURNING name, lastname, email
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
        case 'charge.succeeded': {
            const { payment_intent, metadata } = event.data.object;
            const pay_request_id = metadata.pay_request_id;
            const { rows: [pal_request] } = await sql`
                WITH new_pay_request AS (
                    UPDATE pay_requests
                    SET status = 'paid'
                        , payment_intent_id = ${payment_intent}
                    WHERE pay_request_id = ${pay_request_id}
                        AND (status = 'pending' OR status = 'rejected')
                    RETURNING pal_request_id, status
                ), updated_pal_request AS (
                    UPDATE pal_requests
                    SET status =
                        CASE
                            WHEN (status = 'pending') THEN 'requester paid'
                            WHEN (status = 'requester paid') THEN 'requestee paid'
                            WHEN (status = 'requestee paid') THEN 'overpaid'
                            ELSE status
                        END
                    WHERE pal_request_id = (SELECT pal_request_id FROM new_pay_request)
                        AND status != 'cancelled'
                    RETURNING pal_request_id, status, requestee_id, requester_id
                ) SELECT
                        pal_request_id,
                        status,
                        requestee_id,
                        requester_id,
                        JSONB_OBJECT_AGG(
                            CASE
                                WHEN (requestee_id = user_id) THEN 'requestee'
                                WHEN (requester_id = user_id) THEN 'requester'
                            END,
                            JSONB_BUILD_OBJECT(
                                'user_id', user_id,
                                'name', name,
                                'lastname', lastname,
                                'email', email
                            )
                        ) AS users
                    FROM updated_pal_request
                    JOIN users ON (requestee_id = user_id) OR (requester_id = user_id)
                    GROUP BY pal_request_id, status, requestee_id, requester_id
                ;
            ;`

            let {requestee, requester} = pal_request.users

            if (pal_request.requestee_id === pal_request.requester_id) {
                requester = requestee; // temporary
                // requester and requestee are the same person
                // this should never happen
                console.error('requester and requestee are the same person');
                // break;
            }

            const {status, pal_request_id} = pal_request;

            switch (status) {
                case 'requester paid':

                    // requester just paid

                    const meet_url = `${url.origin}/pal_request/${pal_request_id}`;
                    const in_7_days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

                    /**
                     * Mary is the requester, Rachel is the requestee.
                     * 
                     * Subject: Rachel knows you're interested on Friendpals!
                     * 
                     * Hey Mary,
                     * 
                     * We've notified Rachel that you're interested in meeting her on Friendpals. She's aware and has until [Date | Time] to make the payment of 5.99 CAD. In case Rachel doesn't make the payment within the specified timeframe, we'll refund your money. Stay positive, and let's see what happens!
                     * 
                     * Fingers crossed for a potential friendship!
                     * 
                     * Warm regards,
                     * The Friendpals Team
                     */
                    sendMail(
                        requester.email,
                        `${requestee.name} knows you're interested on Friendpals!`,
                        `Hey ${requester.name},\n\n`
                            + `We've notified ${requestee.name} that you're interested in meeting them on Friendpals.\n`
                            + `${requestee.name} has 7 days (until ${in_7_days}) to decide to meet you.\n\n`
                            + `In case ${requestee.name} doesn't make the payment within the specified timeframe, we'll refund your money.\n\n`
                            + `Stay positive, and let's see what happens!\n`
                            + `Fingers crossed for a potential friendship!\n\n`
                            + `Warm regards,\n`
                            + `The Friendpals Team`
                    );

                    /**
                     * Subject: Mary is excited to meet you on Friendpals!
                     * 
                     * Hey Rachel!
                     * 
                     * Big news! Mary, your potential friend on Friendpals, paid 5.99 CAD to meet you. She's genuinely interested in getting to know you better. To proceed, kindly make a payment of 5.99 CAD too. Once your payment is made, we'll share Mary's contact info. Hurry, you have until [Date and Time] to make the payment. Let's make this friendship happen!
                     * 
                     * Cheers,
                     * The Friendpals Team
                     */
                    sendMail(
                        requestee.email,
                        `${requester.name} is excited to meet you on Friendpals!`,
                        `Hey ${requestee.name}!\n\n`
                            + `Big news! ${requester.name}, your potential friend on Friendpals, paid 5.99 CAD to meet you. ${requester.name} is genuinely interested in getting to know you better.\n\n`
                            + `To meet ${requester.name}, go into this link ${meet_url} , and kindly make a payment of 5.99 CAD too.\n\n`
                            + `Once your payment is made, we'll share to you ${requester.name}'s contact info. You have 7 days (until ${in_7_days}) to make the payment. Let's make this friendship happen!\n\n`
                            + `Cheers,\n`
                            + `The Friendpals Team`
                    );

                    break;

                case 'requestee paid':

                    // requestee just paid

                    /**
                     * Subject: Rachel can't wait to meet you too!
                     * 
                     * Hey Mary!
                     * 
                     * Fantastic news! Rachel, the potential friend you're eager to meet on Friendpals, has also paid 5.99 CAD to meet you. It's official – she's just as excited as you are!
                     * 
                     * Here's Rachel's contact info:
                     * 
                     * Full name: Rachel Smith
                     * Email: [email]
                     * 
                     * Let's make this friendship a reality!
                     * 
                     * Cheers,
                     * 
                     * The Friendpals Team
                     */
                    sendMail(
                        requester.email,
                        `${requestee.name} can't wait to meet you too!`,
                        `Hey ${requester.name}!\n\n`
                            + `Fantastic news! ${requestee.name}, the potential friend you're eager to meet on Friendpals, has also paid 5.99 CAD to meet you.\n`
                            + `It's official – ${requestee.name} is just as excited as you are!\n\n`
                            + `Here's ${requestee.name}'s contact info:\n\n`
                            + `Full name: ${requestee.name} ${requestee.lastname}\n`
                            + `Email: ${requestee.email}\n\n`
                            + `Let's make this friendship a reality!\n\n`
                            + `Cheers,\n`
                            + `The Friendpals Team`
                    );

                    /**
                     * Subject: You're now connected with Mary on Friendpals!
                     * 
                     * Hey Rachel!
                     * 
                     * Congratulations! You're now connected with Mary, your potential friend on Friendpals. Here's Mary's contact info:
                     * 
                     * Full name: Mary Smith
                     * Email: [email]
                     * 
                     * We wish you a meaningful friendship!
                     * 
                     * Cheers,
                     * The Friendpals Team
                     */
                    sendMail(
                        requestee.email,
                        `You're now connected with ${requester.name} on Friendpals!`,
                        `Hey ${requestee.name}!\n\n`
                            + `Congratulations! You're now connected with ${requester.name}, your potential friend on Friendpals. Here's ${requester.name}'s contact info:\n\n`
                            + `Full name: ${requester.name} ${requester.lastname}\n`
                            + `Email: ${requester.email}\n\n`
                            + `We wish you a meaningful friendship!\n\n`
                            + `Cheers,\n`
                            + `The Friendpals Team`
                    );

                    // send a safety email to both users

                    /**
                     * Subject: Safety tips for meeting new people
                     * 
                     * **Social media research:** Verify information using resources like Check People and social media profiles.
                     * 
                     * **Meet in public places:** Always choose public locations for first-time meetings.
                     * 
                     * **Limit personal information:** Keep your profile topline and avoid sharing intimate details until trust is established.
                     * 
                     * **No money requests:** Never send money to strangers online, and report pushy or threatening behavior.
                     * 
                     * **Exercise caution with photos:** Avoid sharing location-revealing pictures or intimate photos at early stage.
                     * 
                     * **Protect your privacy:** Refrain from sharing your exact residential address.
                     * 
                     * **Seek support when needed:** Block and report anyone who makes you uncomfortable, and confide in a trusted friend or family member.
                     * 
                     * **Inform someone:** Share meeting details with a trusted person and consider enabling geotracking on your phone.
                     * 
                     * Wishing you a safe and meaningful friendship!
                     * 
                     * All the best,
                     * The Friendpals Team
                     */
                    sendMail(
                        [requestee.email, requester.email],
                        `Safety tips for meeting new people`,
                        `Social media research: Verify information using resources like social media profiles.\n\n`
                            + `Meet in public places: Always choose public locations for first-time meetings.\n\n`
                            + `Limit personal information: Keep your profile topline and avoid sharing intimate details until trust is established.\n\n`
                            + `No money requests: Never send money to strangers online, and report pushy or threatening behavior.\n\n`
                            + `Exercise caution with photos: Avoid sharing location-revealing pictures or intimate photos at early stage.\n\n`
                            + `Protect your privacy: Refrain from sharing your exact residential address.\n\n`
                            + `Seek support when needed: Block and report anyone who makes you uncomfortable, and confide in a trusted friend or family member.\n\n`
                            + `Inform someone: Share meeting details with a trusted person and consider enabling geotracking on your phone.\n\n`
                            + `Wishing you a safe and meaningful friendship!\n\n`
                            + `All the best,\n`
                            + `The Friendpals Team`
                    );
                    break;
                default:
                    console.error({pal_request});
                    throw new Error('Something went really wrong!');
            }

            break;
        }
        case 'payment_intent.canceled': {
            const { pay_request_id } = event.data.object.metadata;

            await sql`
                UPDATE pay_requests
                SET status = 'cancelled'
                WHERE pay_request_id = ${pay_request_id}
                RETURNING *
            ;`
            break;
        }
    }

    return json({received: true});
}
