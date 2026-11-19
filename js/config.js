window.SITE_CONFIG = {
  name: "TheSuperEevee",

  // "/" for a custom domain or root deployment.
  basePath: "/",

  github: "https://github.com/Thesupereevee1",

  description: "Software, projects, experiments, and open-source development.",

  projects: {
    homepageMode: "all",
    pinnedCount: 4,
  },
};

window.siteUrl = function (path = "") {
  const base = window.SITE_CONFIG.basePath;
  return base + path.replace(/^\/+/, "");
};
