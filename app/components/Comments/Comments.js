import React from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';
import CommentForm from '../CommentForm/CommentForm';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Portal from 'material-ui/Portal';
import ReplyIcon from 'material-ui-icons/Reply';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';

const styles = theme => ({
  comments: {
    marginTop: theme.spacing.unit * 2
  },
  comment: {
    padding: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit} 0`
  },
  reply: {
    width: '100%'
  },
  commentHeader: {
    paddingBottom: 0
  },
  commentBody: {
    padding: `0px ${theme.spacing.unit * 2}`
  },
  avatar: {
    marginRight: theme.spacing.unit * 2
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  commentContainerEven: {
    backgroundColor: '#f6f6f6',
    marginBottom: theme.spacing.unit * 2
  },
  commentContainerOdd: {
    marginBottom: theme.spacing.unit * 2
  },
  actionContainer: {
    padding: theme.spacing.unit * 2,
    height: 'auto',
    display: 'block'
  }
});

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.containers = {};

    this.state = {
      expanded: {},
      commentFormLocation: undefined
    };
  }
  
  makeCommentsHash = () => {
    let commentsMap = {}, repliesMap = {};

    this.props.comments.forEach(comment => {
      commentsMap[comment.id] = { ...comment, replies: repliesMap[comment.id] ? repliesMap[comment.id] : [] };

      if (comment.parent && commentsMap[comment.parent] == undefined) {
        if (repliesMap[comment.parent] == undefined) {
          repliesMap[comment.parent] = [];
        }
        repliesMap[comment.parent].push(comment.id);
      } else if (comment.parent && commentsMap[comment.parent] != undefined) {
        commentsMap[comment.parent].push(comment.id);
      }
    });
    return commentsMap;
  }

  handleExpandClick = (id) => {
    this.setState({
      expanded: {...this.state.expanded, [id]: this.state.expanded[id] ? false : true }
    })
  }

  getDate = (date) => {
    let d = new moment(date);
    return d.format('MMMM Do YYYY, h:mm a');
  }

  mountCommentForm = (id) => {
    this.setState({
      commentFormLocation: id
    });
  }

  printComment = (map, id, level) => {
    let replies = [], comment = map[id], { classes } = this.props;
    if (comment.replies.length != 0) {
      replies = comment.replies.map(id => {
        return this.printComment(map, id, level + 1);
      });
    }
    return (
      <Card key={id} className={ level % 2 == 0 ? classes.commentContainerEven : classes.commentContainerOdd}>
        <CardHeader
          avatar={<Avatar alt={comment.author_name} src={comment.author_avatar_urls[48]} className={classes.avatar} />}
          title={comment.author_name}
          subheader={this.getDate(comment.date)}
          className={classes.commentHeader}
        />
        <CardContent className={classes.commentBody}>
          {renderHTML(comment.content.rendered)}
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing className={classes.actionContainer}>
          <Button aria-label="Write a reply" color="primary" raised onClick={e => this.mountCommentForm(id)}>
            <ReplyIcon />&nbsp; Reply
          </Button>
          {replies.length != 0 && <Badge className={classes.badge} badgeContent={replies.length} color="primary"><Button
            raised
            onClick={ e => this.handleExpandClick(id) }
            aria-expanded={this.state.expanded[id]}
            aria-label="Show replies"
            className={classes.expand}
          >
            <CommentIcon />&nbsp; {this.state.expanded[id] ? 'Hide' : 'View'} replies
          </Button></Badge> }
          <div ref={node => this.containers[id] = node}></div>
        </CardActions>
        <Collapse in={this.state.expanded[id]} timeout="auto" unmountOnExit>
          <CardContent>
            <div className={classes.reply}>{replies}</div>
          </CardContent>
        </Collapse>
      </Card>
    );
  }

  onCommentCancel = () => {
    this.setState({
      commentFormLocation: undefined
    })
  }

  onComment = (comment) => {
    this.props.onComment(this.state.commentFormLocation ? this.state.commentFormLocation : 0, comment);
  }

  render() {
    let commentsMap = this.makeCommentsHash();
    console.log(this.makeCommentsHash());
    const { classes } = this.props;
    return (
      <div className={classes.comments}>
        { this.state.commentFormLocation != undefined && <Portal container={this.containers[this.state.commentFormLocation]}><CommentForm onComment={this.onComment} onCancel={this.onCommentCancel}/></Portal> }
        {
          Object.keys(commentsMap).filter(id => commentsMap[id].parent == 0).map((id, i) => {
            return this.printComment(commentsMap, id, 1)
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(Comments);