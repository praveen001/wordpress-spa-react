import React from 'react';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  comments: {
    marginTop: theme.spacing.unit * 2
  },
  comment: {
    padding: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit} 0`
  },
  evenComment: {
    backgroundColor: '#ccc'
  },
  oddComment: {
    backgroundColor: '#fff'
  },
  reply: {
    marginLeft: theme.spacing.unit * 2
  }
});

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  hideReplies = (id) => {
    this.setState({
      [id]: false
    });
  }

  showReplies = (id) => {
    this.setState({
      [id]: true
    });
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

  printComment = (map, id, level) => {
    let replies = [], comment = map[id], { classes } = this.props;
    if (comment.replies.length != 0) {
      replies = comment.replies.map(id => {
        return this.printComment(map, id, level + 1);
      });
    }
    return (
      <Paper key={id} className={`${level % 2 == 0 ? classes.evenComment : classes.oddComment } ${classes.comment}`}>
        {comment.content.rendered}
        { this.state[id] ? <div className={classes.reply}>{replies}</div> : null }
        { this.state[id] ? <div onClick={e => this.hideReplies(id)}>Hide replies</div> : replies.length != 0 && <div onClick={e => this.showReplies(id)}>View replies</div> }
      </Paper>
    );
  }

  render() {
    let commentsMap = this.makeCommentsHash();
    console.log(this.makeCommentsHash());
    const { classes } = this.props;
    return (
      <div className={classes.comments}>
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