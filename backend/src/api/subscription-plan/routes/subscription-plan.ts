export default {
  routes: [
    {
      method: 'GET',
      path: '/subscription-plans',
      handler: 'subscription-plan.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/subscription-plans/:id',
      handler: 'subscription-plan.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/subscription-plans/:id/checkout',
      handler: 'subscription-plan.createCheckoutSession',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/subscription-plans/checkout/session/:sessionId',
      handler: 'subscription-plan.getCheckoutSession',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/subscription-plans/webhook',
      handler: 'subscription-plan.webhook',
      config: {
        auth: false,
      },
    },
  ],
};
