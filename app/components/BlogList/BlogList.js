import React from 'react';
import { History } from '../../Store';

import BlogSummary from '../BlogSummary/BlogSummary';
import { withStyles } from 'material-ui/styles';

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