import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadPostList } from '../../actions/BlogListActions';
import BlogList from '../../components/BlogList/BlogList';

function mapStateToProps(state) {
  return {
    list: state.list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPostList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);