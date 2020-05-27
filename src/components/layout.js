import React from "react"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { teal } from "@material-ui/core/colors"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header"

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
  typography: {
    fontFamily: [
      "Libre Franklin",
      "Helvetica Neue",
      "Arial",
      "sans - serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
})

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      {
        github {
          organization(login: "debtcollective") {
            avatarUrl
            websiteUrl
          }
        }
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <ThemeProvider theme={theme}>
      <Header
        organization={data.github.organization}
        title={data.site.siteMetadata.title}
      />
      <div
        style={{
          background:
            "linear-gradient(125.85deg, #dbf8ff 15.46%, #f6faf8 45.89%, #fcfbf7 81.18%)",
          height: "1000px",
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  )
}
