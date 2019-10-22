const initializePendo = async (pendoKey, apiRoot) => {
  (function(p, e, n, d, o) {
    var v, w, x, y, z;
    o = p[d] = p[d] || {};
    o._q = [];
    v = ['initialize', 'identify', 'updateOptions', 'pageLoad'];
    for (w = 0, x = v.length; w < x; ++w)
      (function(m) {
        o[m] =
          o[m] ||
          function() {
            o._q[m === v[0] ? 'unshift' : 'push'](
              [m].concat([].slice.call(arguments, 0))
            );
          };
      })(v[w]);
    y = e.createElement(n);
    y.async = !0;
    y.src = 'https://cdn.pendo.io/agent/static/' + pendoKey + '/pendo.js';
    z = e.getElementsByTagName(n)[0];
    z.parentNode.insertBefore(y, z);
  })(window, document, 'script', 'pendo');

  // Get User info from API
  // TODO: Move this out of the pendo init and into a shared tools post-init
  //  that, upon successful user information, calls the proper init functions for
  //  both pendo and sentry with the same user info.
  const userQuery = await fetch(`${apiRoot}/v3/graphql`, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query {
          me {
            id
            name
            email
            organization {
              id
              name
            }
          }
        }
      `
    })
  });
  const response = await userQuery.json();
  let id, name, email, organizationId, organizationName;
  if (!response.errors) {
    const { me } = response.data;
    id = me.id;
    name = me.name;
    email = me.email;
    organizationId = me.organization.id;
    organizationName = me.organization.name;
  }

  //Initialize Pendo
  pendo.initialize({
    visitor: {
      id,
      name,
      email
    },
    account: {
      id: organizationId,
      name: organizationName
    }
  });
};

export default initializePendo;
