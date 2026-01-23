import Stripe from 'stripe';

function getStripeInstance(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY || '';
  
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }

  return new Stripe(secretKey, {
    apiVersion: '2025-12-15.clover',
  });
}

export default {
  async createCheckoutSession(planId: string, customerEmail?: string, successUrl?: string, cancelUrl?: string) {
    try {
      const plan = await strapi.entityService.findOne('api::subscription-plan.subscription-plan', planId, {
        populate: '*',
      });

      if (!plan) {
        throw new Error(`Plan with id ${planId} not found`);
      }

      if (!plan.stripePriceId) {
        throw new Error(`Plan ${planId} does not have a Stripe Price ID configured`);
      }

      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: plan.stripePriceId,
            quantity: 1,
          },
        ],
        success_url: successUrl || `${baseUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${baseUrl}/subscription/cancel`,
        metadata: {
          planId: planId.toString(),
          planName: plan.name,
        },
      };

      if (customerEmail) {
        sessionParams.customer_email = customerEmail;
      }

      const stripe = getStripeInstance();
      const session = await stripe.checkout.sessions.create(sessionParams);

      return session;
    } catch (error) {
      strapi.log.error('Error creating Stripe checkout session:', error);
      throw error;
    }
  },

  async getCheckoutSession(sessionId: string) {
    try {
      const stripe = getStripeInstance();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return session;
    } catch (error) {
      strapi.log.error('Error retrieving Stripe checkout session:', error);
      throw error;
    }
  },

  constructWebhookEvent(payload: string | Buffer, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    }

    try {
      const stripe = getStripeInstance();
      const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      return event;
    } catch (error) {
      strapi.log.error('Webhook signature verification failed:', error);
      throw error;
    }
  },

  async handleWebhookEvent(event: Stripe.Event) {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
          break;

        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;

        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;

        case 'invoice.payment_succeeded':
          await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;

        case 'invoice.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;

        default:
          strapi.log.info(`Unhandled webhook event type: ${event.type}`);
      }

      return { received: true };
    } catch (error) {
      strapi.log.error('Error handling webhook event:', error);
      throw error;
    }
  },

  async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    strapi.log.info('Checkout session completed:', session.id);
    
    const planId = session.metadata?.planId;
    const customerEmail = session.customer_email || session.customer_details?.email;

    if (planId && customerEmail) {
      strapi.log.info(`Subscription created for plan ${planId}, email: ${customerEmail}`);
    }
  },

  async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    strapi.log.info('Subscription updated:', subscription.id);
  },

  async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    strapi.log.info('Subscription deleted:', subscription.id);
  },

  async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    strapi.log.info('Payment succeeded for invoice:', invoice.id);
  },

  async handlePaymentFailed(invoice: Stripe.Invoice) {
    strapi.log.warn('Payment failed for invoice:', invoice.id);
  },
};
