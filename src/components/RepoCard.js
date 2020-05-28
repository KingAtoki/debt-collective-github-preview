import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Popover,
} from "@material-ui/core"
import { red } from "@material-ui/core/colors"
import { Favorite, Code, ExpandMore } from "@material-ui/icons"
import { formatDate } from "../helpers/formatDate"

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    minHeight: 225,
    backgroundColor: "#F6FAF8",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  typography: {
    padding: theme.spacing(2),
  },
  userIcons: {
    display: "flex",
    flexWrap: "row wrap",
  },
}))

const RepoCard = ({
  repo: { name, createdAt, description, url, mentionableUsers },
}) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [clickedIcon, setClickedIcon] = useState(null)

  const handleClick = (event, name) => {
    setAnchorEl(event.currentTarget)
    name === clickedIcon ? setClickedIcon(null) : setClickedIcon(name)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="Repo first letter" className={classes.avatar}>
            {name[0].toUpperCase()}
          </Avatar>
        }
        title={name}
        subheader={formatDate(createdAt)}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="like this repo"
          onClick={e => handleClick(e, null)}
        >
          <Favorite />
        </IconButton>
        <Popover
          id="like popover"
          open={clickedIcon === null && !!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography className={classes.typography}>
            {name} loves you too!
          </Typography>
        </Popover>
        <a href={url} rel="noopener noreferrer" target="_blank">
          <IconButton aria-label="github link">
            <Code />
          </IconButton>
        </a>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography className={classes.typography}>
            I don't have write access to this repo to list the collaborators,
            but GitHub gives me "mentionableUsers" so as long as they have a
            "name", here they are!
          </Typography>
          <div className={classes.userIcons}>
            {mentionableUsers.nodes.map(
              user =>
                user.name && (
                  <div key={user.name}>
                    <IconButton
                      aria-label="user icon"
                      onClick={e => handleClick(e, user.name)}
                    >
                      <Avatar alt={user.name} src={user.avatarUrl} />
                    </IconButton>
                    <Popover
                      id={user.name}
                      open={!!anchorEl && user.name === clickedIcon}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography
                        variant="overline"
                        className={classes.typography}
                      >
                        Name
                      </Typography>
                      <Typography className={classes.typography}>
                        {user.name}
                      </Typography>
                      <Typography
                        variant="overline"
                        className={classes.typography}
                      >
                        Bio
                      </Typography>
                      <Typography className={classes.typography}>
                        {user.bio || "No bio for this user :("}
                      </Typography>
                    </Popover>
                  </div>
                )
            )}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default RepoCard
