export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    resolve: './src/middlewares/raw-body-stripe',
  },
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '10mb',
      formLimit: '10mb',
      textLimit: '10mb',
      formidable: {
        maxFileSize: 200 * 1024 * 1024,
      },
      enabledTypes: ['json', 'form', 'text', 'xml'],
      patchKoa: true,
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
