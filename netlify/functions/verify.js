const tokenStore = require('./tokenStore');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Allow': 'POST' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { token } = JSON.parse(event.body);

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Token required' })
      };
    }

    if (tokenStore.isValid(token)) {
      const username = tokenStore.getUsername(token);
      return {
        statusCode: 200,
        body: JSON.stringify({
          valid: true,
          username: username
        })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({
          valid: false,
          error: 'Invalid or expired token'
        })
      };
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
