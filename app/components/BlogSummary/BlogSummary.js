import React from 'react';
import renderHTML from 'react-render-html';
import { History } from '../../Store';

import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  post: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 2,
    width: `calc(33% - ${theme.spacing.unit * 2}px)`,
    flexDirection: 'column',
    border: '1px solid transparent',
    '&:hover': {
      border: '1px solid #ccc'
    }
  },
  postImage: {
    height: 250,
    padding: theme.spacing.unit * 2,
    backgroundColor: '#fcfcfc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > img': {
      maxHeight: '100%',
      maxWidth: '100%'
    }
  },
  postExcerpt: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  title: {
    color: '#363f45',
    fontSize: 20,
    textDecoration: 'none'
  },
  author: {
    color: '#bcbcbc',
    fontSize: 14,
    fontStyle: 'italic',
    display: 'inline-block',
    marginTop: 5
  }
});

class BlogSummary extends React.Component {

  goToPost = (e) => {
    e.preventDefault();
    History.push(`/${this.props.post.slug}`)
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.post}>
        <div className={classes.postImage}>
          {this.props.post._embedded['wp:featuredmedia'] && <img src={this.props.post._embedded['wp:featuredmedia'][0].source_url} />}
        </div>
        <article className={classes.postExcerpt}>
          <div>
            <Typography type='display1' component='a' href={this.props.post.slug} onClick={this.goToPost} className={classes.title}>{this.props.post.title.rendered}</Typography>
            {/* {renderHTML(this.props.post.excerpt.rendered)} */}
          </div>
          <div>
            <Typography type='body1' className={classes.author}>written by: {this.props.post._embedded.author[0].name}</Typography>
          </div>
        </article>
      </Paper>
    );
  }
}

export default withStyles(styles)(BlogSummary);