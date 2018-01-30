import React from 'react';

import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

const styles = theme => ({
  paperTitle: {
    borderBottom: '1px solid #000',
    padding: `0 0 ${theme.spacing.unit}px 0`
  },
  title: {
    fontSize: 18,
    fontWeight: 500
  }
});

class PaperTitle extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paperTitle}>
        <Typography type='headline' className={classes.title}>{this.props.title}</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(PaperTitle);