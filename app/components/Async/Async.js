import React from 'react';

import CircularProgress from 'material-ui/Progress/CircularProgress';

class Async extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      LoadedComponent: null,
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  load(props) {
    this.state = {
      LoadedComponent: null,
    };

    props.load().then(mod => {
      this.setState({
        LoadedComponent: mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    const { LoadedComponent } = this.state;
    return LoadedComponent ? <LoadedComponent {...this.props.props} /> : <CircularProgress />;
  }
}

export default Async;