import { stripe } from "./stripe";

/**
 * 
 * @param {string} success_url 
 * @param {string} cancel_url 
 * @returns 
 */
export async function payToMeet(success_url, cancel_url) {
    console.log({success_url, cancel_url});
    return await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: 'friendpal meet',
                    },
                    unit_amount: 599,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        payment_intent_data: {
          capture_method: 'manual',
        },
        success_url,
        cancel_url,
    }); 
}