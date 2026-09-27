module.exports = {
  setupEleventy(eleventyConfig) {
    eleventyConfig.addFilter("rabbit34FooterCommit", (value) => {
      if (typeof value !== "string") return null;
      const sha = value.trim();
      // Only complete Git object IDs are accepted; never interpolate arbitrary env text.
      if (!/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/i.test(sha)) return null;
      return {
        short: sha.slice(0, 7),
        url: `https://github.com/rabbit34x/garden/commit/${sha}`,
      };
    });
  },
};
