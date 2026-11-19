const githubCache = new Map();

function getGitHubRepository(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname !== "github.com") return null;

    const parts = parsed.pathname.split("/").filter(Boolean);

    if (parts.length < 2) return null;

    return {
      owner: parts[0],
      repo: parts[1].replace(/\.git$/, ""),
    };
  } catch {
    return null;
  }
}

async function fetchGitHubStats(url) {
  const repository = getGitHubRepository(url);

  if (!repository) return null;

  const key = `${repository.owner}/${repository.repo}`;

  if (githubCache.has(key)) {
    return githubCache.get(key);
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${key}`);

    if (!response.ok) return null;

    const data = await response.json();

    const stats = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      updated: data.updated_at,
    };

    githubCache.set(key, stats);

    return stats;
  } catch (error) {
    console.warn("GitHub API unavailable:", error);
    return null;
  }
}

function formatNumber(number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}
