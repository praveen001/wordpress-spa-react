import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadPost, postComment } from '../../actions/BlogPostActions';
import BlogPost from '../../components/BlogPost/BlogPost';

function mapStateToProps(state) {
  return {
    post: state.post
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPost, postComment
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);