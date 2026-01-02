const crypto = require('crypto');
const tokenStore = require('./tokenStore');

// In a real app, store these in a database
// For demo purposes, we're using an in-memory object
// Password is 'password123' hashed with salt
const USERS = {
  'testuser': {
    passwordHash: '847d001c90d458701bcdb402bd60f5e6d4179eca6930a996de756d1b1c67690a',
    salt: 'randomsalt123'
  }
};

function hashPassword(password, salt) {
  return crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Allow': 'POST'
      },
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Username and password required' })
      };
    }

    const user = USERS[username];
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    const hashedPassword = hashPassword(password, user.salt);
    if (hashedPassword !== user.passwordHash) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }
    const token = generateToken();
    tokenStore.add(token, username, 24);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        token: token,
        username: username
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
