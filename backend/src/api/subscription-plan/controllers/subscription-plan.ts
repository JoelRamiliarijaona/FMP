import { factories } from '@strapi/strapi';
import stripeService from '../../../services/stripe';

export default factories.createCoreController('api::subscription-plan.subscription-plan', ({ strapi }) => ({
  async createCheckoutSession(ctx) {
    try {
      const { id } = ctx.params;
      const { customerEmail, successUrl, cancelUrl } = ctx.request.query;

      if (!id) {
        return ctx.badRequest('Plan ID is required');
      }

      const email = typeof customerEmail === 'string' ? customerEmail : Array.isArray(customerEmail) ? customerEmail[0] : undefined;
      const success = typeof successUrl === 'string' ? successUrl : Array.isArray(successUrl) ? successUrl[0] : undefined;
      const cancel = typeof cancelUrl === 'string' ? cancelUrl : Array.isArray(cancelUrl) ? cancelUrl[0] : undefined;

      const session = await stripeService.createCheckoutSession(
        id,
        email,
        success,
        cancel
      );

      ctx.body = {
        sessionId: session.id,
        url: session.url,
      };
    } catch (error) {
      strapi.log.error('Error creating checkout session:', error);
      ctx.throw(500, error.message || 'Failed to create checkout session');
    }
  },

  async getCheckoutSession(ctx) {
    try {
      const { sessionId } = ctx.params;

      if (!sessionId) {
        return ctx.badRequest('sessionId is required');
      }

      const session = await stripeService.getCheckoutSession(sessionId);

      ctx.body = session;
    } catch (error) {
      strapi.log.error('Error retrieving checkout session:', error);
      ctx.throw(500, error.message || 'Failed to retrieve checkout session');
    }
  },

  async webhook(ctx) {
    try {
      const signatureHeader = ctx.request.headers['stripe-signature'];

      if (!signatureHeader) {
        return ctx.badRequest('Missing stripe-signature header');
      }

      const signature = typeof signatureHeader === 'string' ? signatureHeader : Array.isArray(signatureHeader) ? signatureHeader[0] : '';

      if (!signature) {
        return ctx.badRequest('Invalid stripe-signature header');
      }

      let payload: string | Buffer;
      
      const requestWithRawBody = ctx.request as any;
      
      if (requestWithRawBody.rawBody) {
        payload = requestWithRawBody.rawBody;
        strapi.log.debug('Using raw body from middleware');
      } else {
        const parsedBody = ctx.request.body;
        payload = typeof parsedBody === 'string' ? parsedBody : JSON.stringify(parsedBody);
        strapi.log.warn('⚠️ Using parsed body - webhook signature verification may fail');
      }

      const event = stripeService.constructWebhookEvent(payload, signature);

      await stripeService.handleWebhookEvent(event);

      ctx.body = { received: true };
    } catch (error) {
      strapi.log.error('Error processing webhook:', error);
      ctx.throw(400, `Webhook Error: ${error.message}`);
    }
  },
}));
