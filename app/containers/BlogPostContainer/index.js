import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadPost } from '../../actions/BlogPostActions';
import BlogPost from '../../components/BlogPost/BlogPost';

function mapStateToProps(state) {
  return {
    post: state.post
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPost
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);