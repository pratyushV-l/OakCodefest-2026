import fetch from "node-fetch";

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

function parseRepo(repoUrl) {
  const cleaned = repoUrl
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\.git$/, "")
    .replace(/\/$/, "");

  const match = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error("Invalid repo URL");

  return { owner: match[1], repo: match[2] };
}

/* ---------------- LANGUAGES ---------------- */
export async function getLanguages(owner, repo) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    { headers: GITHUB_HEADERS }
  );

  if (!res.ok) return {};
  return await res.json();
}

/* ---------------- CONTRIBUTORS ---------------- */
export async function getContributors(owner, repo) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
    { headers: GITHUB_HEADERS }
  );

  if (!res.ok) return [];
  const json = await res.json();

  return json.map(c => c.login);
}

/* ---------------- COMMITS + LINE CHANGE ---------------- */
export async function getCommitAndLines(owner, repo, maxPages = 5) {
  let page = 1;
  let commitCount = 0;
  let additions = 0;
  let deletions = 0;

  while (page <= maxPages) {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100&page=${page}`,
      { headers: GITHUB_HEADERS }
    );

    if (!res.ok) break;

    const commits = await res.json();
    if (!commits.length) break;

    commitCount += commits.length;

    /* fetch each commit details for stats */
    for (const c of commits) {
      const detailRes = await fetch(c.url, { headers: GITHUB_HEADERS });
      if (!detailRes.ok) continue;

      const detail = await detailRes.json();
      additions += detail.stats?.additions || 0;
      deletions += detail.stats?.deletions || 0;
    }

    page++;
  }

  return {
    commitCount,
    additions,
    deletions,
    lineChange: additions + deletions
  };
}

/* ---------------- REPO TREE ---------------- */
async function getRepoTree(owner, repo) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`,
    { headers: GITHUB_HEADERS }
  );

  if (!res.ok) return [];
  const json = await res.json();
  return json.tree || [];
}

/* ---------------- SEMICOLON COUNT ---------------- */

function isTextFile(path) {
  return /\.(js|ts|jsx|tsx|c|cpp|h|java|cs|py|go|rs|php|css|html|json)$/i.test(path);
}

async function getFileContent(owner, repo, path) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    { headers: GITHUB_HEADERS }
  );

  if (!res.ok) return "";

  const json = await res.json();
  if (!json.content) return "";

  return Buffer.from(json.content, "base64").toString("utf8");
}

export async function countSemicolons(owner, repo, maxFiles = 50) {
  const tree = await getRepoTree(owner, repo);

  let semicolons = 0;
  let processed = 0;

  for (const item of tree) {
    if (processed >= maxFiles) break;
    if (item.type !== "blob") continue;
    if (!isTextFile(item.path)) continue;

    const content = await getFileContent(owner, repo, item.path);
    semicolons += (content.match(/;/g) || []).length;

    processed++;
  }

  return semicolons;
}

/* ---------------- MASTER FUNCTION ---------------- */

export async function getFullGithubStats(repoUrl) {
  const { owner, repo } = parseRepo(repoUrl);

  const [languages, contributors, commitData, semicolons] =
    await Promise.all([
      getLanguages(owner, repo),
      getContributors(owner, repo),
      getCommitAndLines(owner, repo, 3),
      countSemicolons(owner, repo, 40),
    ]);

  return {
    languages,
    contributors,
    commits: commitData.commitCount,
    additions: commitData.additions,
    deletions: commitData.deletions,
    lineChange: commitData.lineChange,
    semicolons
  };
}