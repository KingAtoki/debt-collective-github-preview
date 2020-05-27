module.exports = {
  siteMetadata: {
    title: "Debt Collective GitHub",
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: `Bearer ${process.env.GATSBY_GITHUB_TOKEN}`,
        },
      },
    },
    `gatsby-plugin-material-ui`,
  ],
}
