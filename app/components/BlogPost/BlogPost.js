import React from 'react';
import Highlight from 'react-highlight';
import renderHTML from 'react-render-html';

import Comments from '../Comments/Comments';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

const styles = theme => ({
  post: {
  },
  title: {
    fontSize: 36,
    fontWeight: 600
  },
  featuredImage: {
    height: 250,
    textAlign: 'center',
    '& > img': {
      maxHeight: '100%'
    }
  },
  content: {
    padding: theme.spacing.unit * 2,
    '& p': {
      fontSize: 18,
      letterSpacing: 0.6,
      color: 'rgba(0, 0, 0, 0.87)',
      lineHeight: '28px',
      '& > strong': {
        fontSize: 26,
        fontWeight: 500,
        color: 'rgba(0, 0, 0, 0.87)',
        display: 'inline-block',
        marginTop: 20
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
    });

    let featuredImage = <div className={classes.featuredImage}>
      <img src={this.props.post.post._embedded['wp:featuredmedia'][0].source_url} />
    </div>

    return (
      <div className={classes.post}>
        <article>
          <Paper className={classes.content}>
            <Typography type='title' className={classes.title}>{this.props.post.post.title.rendered}</Typography>
            {featuredImage}
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