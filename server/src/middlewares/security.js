const helmet = require('helmet');
const ms = require('ms');
const uuid = require('node-uuid');

/**
 * Methods manipulating Headers
 */

const securityMiddleware = (app) => {
  // X-Frame-Options: https://github.com/helmetjs/frameguard
  app.use(helmet.frameguard({ action: 'deny' }));

  // X-XSS-Protection: https://github.com/helmetjs/x-xss-protection
  app.use(helmet.xssFilter());

  // Strict-Transport-Security: https://github.com/helmetjs/hsts
  app.use(
    helmet.hsts({
      maxAge: ms('365 days') / 1000,
      includeSubDomains: true,
      preload: true,
    })
  );
  
  // Disable etags for all requests
  app.disable('etag');

  // X-Powered-By: http://expressjs.com/en/4x/api.html#app.settings.table
  app.disable('x-powered-by');

  // X-Download-Options: https://github.com/helmetjs/ienoopen
  app.use(helmet.ieNoOpen());

  // X-Permitted-Cross-Domain-Policies https://github.com/helmetjs/crossdomain
  app.use(
    helmet.permittedCrossDomainPolicies({
      allowedPolicies: 'by-content-type',
    })
  );

  // X-Content-Type-Options: https://github.com/helmetjs/dont-sniff-mimetype
  app.use(helmet.noSniff());

  // Rewriting the header
  app.use(function headerRewriting(req, res, next) {
    res.header('X-powered-by', false);
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Content-Security-Policy: https://github.com/helmetjs/csp
  app.use(function nonceGenerator(req, res, next) {
    res.locals.nonce = uuid.v4();
    next();
  });

  /* eslint-disable quotes */
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self' https://www.google.com/recaptcha https://maps.googleapis.com *.gstatic.com *.google.com 'sha256-bo9tha6zSc3EpohqC68K4VzMQj+3QaDu1mM8QaiTkwQ='"],
        styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
        fontSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
        frameSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
        imgSrc: ["'data'", (req, res) => `'nonce-${res.locals.nonce}'`],
        baseUri: ["'self'"],
        connectSrc: ["'self'", "wss:"],
        frameAncestors: ["'none'"],
      },
      reportOnly: false,
    })
  );
  // X-DNS-Prefetch-Control: https://github.com/helmetjs/dns-prefetch-control
  app.use(helmet.dnsPrefetchControl({ allow: false }));

  // https://github.com/helmetjs/referrer-policy
  app.use(helmet.referrerPolicy({ policy: "same-origin" }));

  // https://helmetjs.github.io/docs/expect-ct/
  app.use(
    helmet.expectCt({
      enforce: true,
      maxAge: ms("1 day") / 1000,
    })
  );
};

module.exports = { securityMiddleware };
