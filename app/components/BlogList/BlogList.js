import React from 'react';

import Grid from 'material-ui/Grid';
import BlogSummary from '../BlogSummary/BlogSummary';
import withStyles from 'material-ui/styles/withStyles';
import { loadPostList } from '../../actions/BlogListActions';

const styles = theme => ({
  postListWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  }
});

class BlogList extends React.Component {
  componentDidMount() {
    document.title = 'Source Clone';
    if (this.props.list.postIds.length == 0) {
      this.init();
    }
  }

  static fetchData(dispatch) {
    return loadPostList(1)(dispatch);
  }

  init = () => {
    this.props.loadPostList(1);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={16} className={classes.postListWrap}>
        {
          this.props.list.postIds.map((postId, i) => {
            return <Grid item lg={4} md={6} sm={6} xs={12} style={{ display: 'flex' }} key={i}><BlogSummary post={this.props.list.posts[postId]} /></Grid>
          })
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(BlogList);