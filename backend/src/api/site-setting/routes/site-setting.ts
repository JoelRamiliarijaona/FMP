export default {
  routes: [
    {
      method: 'GET',
      path: '/site-settings',
      handler: 'site-setting.find',
      config: {
        auth: false,
      },
    },
  ],
};
