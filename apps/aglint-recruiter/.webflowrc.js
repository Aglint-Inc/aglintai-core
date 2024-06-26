module.exports = {
  host: 'https://api.webflow.com',
  rootDir: process.env.WF_ROOT,
  siteId: process.env.WF_SITE,
  authToken: process.env.WF_AUTH, // An environment variable is recommended for this field.
  cssModules: true,
  allowTelemetry: true,
  // components: "/^(?!Scr|Assessment).*/i"
};

// git ls-files -d | xargs git checkout --