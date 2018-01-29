import React from 'react';
import Highlight from 'react-highlight';
import renderHTML from 'react-render-html';

import Comments from '../Comments/Comments';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import CodeSnippetStyles from '../../../node_modules/highlight.js/styles/vs2015.css';

const styles = theme => ({
  post: {
  },
  title: {
    fontSize: 36,
    fontWeight: 300
  },
  content: {
    padding: theme.spacing.unit * 2,
    '& > p': {
      fontSize: 22,
      letterSpacing: 0.6,
      color: '#30404a',
      '& > strong': {
        fontSize: 30,
        fontWeight: 400,
        color: '#000'
      }
    },
    '& > blockquote': {
      padding: '10px 28px',
      background: '#eee',
      borderRadius: 10,
      fontSize: 22,
      fontStyle: 'italic',
      marginLeft: 10
    }
  }
});

class BlogPost extends React.Component {
  componentDidMount() {
    this.init();
  }

  init = () => {
    this.props.loadPost(this.props.match.params.slug);
  }

  onComment = (author, parent, comment) => {

  }

  render() {
    const { classes } = this.props;
    if (this.props.post.loading) {
      return <Typography>Loading...</Typography>
    }

    let content = renderHTML(this.props.post.post.content.rendered);
    content = content.map(elem => {
      if (elem.type == 'code' || elem.type == 'pre') {
        return <Highlight className='javascript' key={elem.key}>{elem.props.children[0]}</Highlight>;
      }
      return elem;
    })

    return (
      <div className={classes.post}>
        <article>
          <Paper className={classes.content}>
            <Typography type='title' className={classes.title}>{this.props.post.post.title.rendered}</Typography>
            {content}
          </Paper>
        </article>
        <div className={classes.comments}>
          {/* <Comments comments={this.props.post.post._embedded.replies[0]} onComment={this.onComment} /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BlogPost);