import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const { token } = JSON.parse(event.body);

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Token required" })
      };
    }

    const { data, error } = await supabase
      .from("tokens")
      .select("team_id, expires_at")
      .eq("token", token)
      .single();

    if (error || !data) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          valid: false,
          error: "Invalid or expired token"
        })
      };
    }

    if (new Date(data.expires_at) < new Date()) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          valid: false,
          error: "Invalid or expired token"
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: true,
        username: data.team_id
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
