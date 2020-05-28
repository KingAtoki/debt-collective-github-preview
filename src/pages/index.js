import React from "react"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/Layout"
import RepoCard from "../components/RepoCard"

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}))

const Home = ({
  data: {
    github: {
      organization: { repositories: { nodes: repos } = {} },
    },
  },
}) => {
  const classes = useStyles()
  return (
    <Layout>
      <Grid container className={classes.root} spacing={2}>
        {repos.map(repo => (
          <Grid item xs={12} sm={6} md={4} key={repo.url}>
            <RepoCard repo={repo} key={repo.url} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default Home

export const query = graphql`
  {
    github {
      organization(login: "debtcollective") {
        repositories(first: 10) {
          nodes {
            description
            url
            name
            mentionableUsers(first: 10) {
              nodes {
                avatarUrl
                bio
                email
                name
              }
            }
            createdAt
          }
        }
      }
    }
  }
`
