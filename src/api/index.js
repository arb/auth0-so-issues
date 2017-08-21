const { Server } = require('hapi');
const bigquery = require('@google-cloud/bigquery');
const jwt = require('hapi-auth-jwt2');
const jwksRsa = require('jwks-rsa');
const credentials = require('./auth0-9d32608b88fe.json');

const server = new Server();

server.app.client = bigquery({
  projectId: 'auth0-177016',
  credentials: { ...credentials },
});

server.connection({
  port: 9000,
});

const validateUser = (decoded, request, callback) => {
  if (decoded && decoded.sub) {
    return callback(null, true, {
      scope: decoded.scope.split(' '),
    });
  }

  return callback(null, false);
};

server.register(jwt).then(() => {
  server.auth.strategy('jwt', 'jwt', 'required', {
    complete: true,
    // verify the access token against the
    // remote Auth0 JWKS 
    key: jwksRsa.hapiJwt2Key({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://arb.auth0.com/.well-known/jwks.json',
    }),
    verifyOptions: {
      audience: 'https://auth0-so-issues',
      issuer: 'https://arb.auth0.com/',
      algorithms: ['RS256'],
    },
    validateFunc: validateUser,
  });

  server.route({
    method: 'get',
    path: '/api/data',
    handler: (request, reply) => {
      server.app.client.query({
        query: `SELECT *
        FROM [bigquery-public-data:stackoverflow.posts_questions]
        WHERE
          tags CONTAINS 'auth0'
        ORDER BY creation_date
        LIMIT 4000
        `,
        autoPaginate: false,
        timeoutMs: 1000000000,
      }, (err, rows) => {
        // Can not just do `reply` as the callback 
        // because there are other, undocumented arguments passed back
        if (err) {
          console.error(err);
          return reply(err);
        }
        return reply(rows);
      });
    },
  });
}).then(() => {
  server.start(() => {
    console.log('API listening on 9000');
  });
});
