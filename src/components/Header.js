import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, Typography, ButtonBase } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary,
  },
  title: {
    flexGrow: 1,
  },
}))

const Header = ({ organization, title }) => {
  const classes = useStyles()
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <ButtonBase>
          <a
            href={organization.websiteUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src={organization.avatarUrl}
              alt="debt collective logo"
              width="40px"
            />
          </a>
        </ButtonBase>
      </Toolbar>
    </AppBar>
  )
}

export default Header
