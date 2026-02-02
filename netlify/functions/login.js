import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function hashPassword(password, Salt) {
  return crypto
    .createHash("sha256")
    .update(Salt + password)
    .digest("hex");
}

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Username and password required" })
      };
    }

    const { data: user, error } = await supabase
      .from("teams")
      .select("team_id, hashed_password, Salt")
      .eq("team_id", username)
      .single();

    if (error || !user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials" })
      };
    }

    const hashedPassword = hashPassword(password, user.Salt);

    if (hashedPassword !== user.hashed_password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials" })
      };
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const { error: tokenError } = await supabase
      .from("tokens")
      .insert([{ token, team_id: username, expires_at: expiresAt }]);

    if (tokenError) {
      console.error("Token insert error:", tokenError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server error" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        token,
        username
      })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
};
