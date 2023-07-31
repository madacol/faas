import { sql } from "$lib/server/db";
import { sendMail } from "$lib/server/sendMail.js";

export async function load({ params, url }) {
    const {rows: pay_requests} = await sql`
        WITH new_pay_request AS (
            UPDATE pay_requests
            SET status = 'paid'
            WHERE pay_request_id = ${params.pay_request_id}
                AND status = 'pending'
            RETURNING pal_request_id, status
        ) SELECT
                pals.users,
                pay_requests.status,
                requestee_id,
                requester_id
            FROM pal_requests
            LEFT JOIN (
                SELECT pal_request_id, status FROM pay_requests
                UNION ALL
                SELECT pal_request_id, status FROM new_pay_request
            ) AS pay_requests USING (pal_request_id)
            JOIN (
                SELECT
                    ARRAY_AGG(
                        JSONB_BUILD_OBJECT(
                            'user_id', user_id,
                            'name', name,
                            'lastname', lastname,
                            'email', email
                        )
                    ) AS users,
                    pal_request_id
                FROM pal_requests
                JOIN users ON (requestee_id = user_id) OR (requester_id = user_id)
                WHERE pal_request_id = ${params.pal_request_id}
                GROUP BY pal_request_id
            ) AS pals USING (pal_request_id)
        ;
    `;

    const paidCount = pay_requests.filter(pay_request => pay_request.status === 'paid').length;

    // @ts-ignore
    const requestee = pay_requests[0].users.find(user => user.user_id === pay_requests[0].requestee_id);
    // @ts-ignore
    const requester = pay_requests[0].users.find(user => user.user_id === pay_requests[0].requester_id);

    switch (paidCount) {
        case 1:

            // requester just paid

            const meet_url = `${url.origin}/pal_request/${params.pal_request_id}`;
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

        case 2:

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
            console.error({paidCount, pay_requests});
            throw new Error('Something went really wrong!');
    }
}