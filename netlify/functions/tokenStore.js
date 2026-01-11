class TokenStore {
  constructor() {
    this.tokens = new Map(); // Map<token, {username, expiresAt}>
  }

  add(token, username, expiryHours = 24) {
    const expiresAt = Date.now() + (expiryHours * 60 * 60 * 1000);
    this.tokens.set(token, { username, expiresAt });
    this.cleanup();
  }

  isValid(token) {
    if (!this.tokens.has(token)) {
      return false;
    }

    const { expiresAt } = this.tokens.get(token);
    if (Date.now() > expiresAt) {
      this.tokens.delete(token);
      return false;
    }

    return true;
  }

  getUsername(token) {
    if (!this.isValid(token)) {
      return null;
    }
    return this.tokens.get(token).username;
  }

  cleanup() {
    const now = Date.now();
    for (const [token, data] of this.tokens.entries()) {
      if (now > data.expiresAt) {
        this.tokens.delete(token);
      }
    }
  }

  getUserTokens(username) {
    const userTokens = [];
    for (const [token, data] of this.tokens.entries()) {
      if (data.username === username && this.isValid(token)) {
        userTokens.push(token);
      }
    }
    return userTokens;
  }
}

module.exports = new TokenStore();

// Sort of like the "Common Memory for both netlify functions"
