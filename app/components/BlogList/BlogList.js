import React from 'react';

import BlogSummary from '../BlogSummary/BlogSummary';
import withStyles from 'material-ui/styles/withStyles';
import { loadPostList } from '../../actions/BlogListActions';

const styles = theme => ({
  postListWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

class BlogList extends React.Component {
  componentDidMount() {
    this.init();
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
      <div className={classes.postListWrap}>
        {
          this.props.list.postIds.map((postId, i) => {
            return <BlogSummary key={i} post={this.props.list.posts[postId]} />
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(BlogList);