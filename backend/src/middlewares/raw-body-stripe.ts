export default () => {
  return async (ctx, next) => {
    if (ctx.path === '/api/subscription-plans/webhook' && ctx.method === 'POST') {
      const getRawBody = require('raw-body');
      
      try {
        const rawBody = await getRawBody(ctx.req, {
          encoding: 'utf8',
          limit: '10mb',
        });
        
        const requestWithRawBody = ctx.request as any;
        requestWithRawBody.rawBody = rawBody;
        
        strapi.log.debug('Raw body captured for Stripe webhook');
      } catch (error) {
        strapi.log.error('Error reading raw body for Stripe webhook:', error);
      }
    }
    
    await next();
  };
};
