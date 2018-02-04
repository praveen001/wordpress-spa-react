import React from 'react';

import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  commentForm: {
    background: '#f6f6f6',
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  userDetails: {
    margin: `${theme.spacing.unit * 2}px 0`,
    display: 'flex',
    '& > div': {
      marginRight: theme.spacing.unit * 4
    }
  },
  comment: {
    margin: `${theme.spacing.unit * 2}px 0`,
    display: 'flex',
    '& > div': {
      flex: 1
    }
  }
});

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      comment: ''
    }
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.commentForm}>
        <Typography type='headline'>Write a comment</Typography>
        <div>
          <div className={classes.userDetails}>
            <TextField
              label='Name'
              onChange={this.onNameChange}
            />

            <TextField
              label='Email'
              onChange={this.onNameChange}
            />
          </div>

          <div className={classes.comment}>
            <TextField
              label='Comment'
              multiline={true}
              onChange={this.onNameChange}
            />
          </div>
          <Button color='primary' raised onClick={e => this.props.onComment(this.state)}>Submit</Button>
          <Button raised onClick={this.props.onCancel}>Cancel</Button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(CommentForm);