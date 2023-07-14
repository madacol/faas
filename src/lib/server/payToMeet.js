import { STRIPE_SECRET_KEY } from '$env/static/private';

import Stripe from 'stripe'

const stripe = new Stripe(STRIPE_SECRET_KEY,{
    apiVersion: '2022-11-15',
});

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
                    currency: 'usd',
                    product_data: {
                        name: 'meet',
                    },
                    unit_amount: 499,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url,
        cancel_url,
    }); 
}