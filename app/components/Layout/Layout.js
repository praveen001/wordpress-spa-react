import React from 'react';

import AdSense from 'react-adsense';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import PaperTitle from '../PaperTitle/PaperTitle';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    display: 'flex'
  },
  articles: {
    flex: 1,
    margin: theme.spacing.unit * 2
  },
  sidebar: {
    width: '24%',
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
    '& > div': {
      padding: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      minHeight: 100
    }
  }
});

class Layout extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position='static'
        >
          <Toolbar>
            Source Clone
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <div className={classes.articles}>
            {this.props.children}
          </div>
          <aside className={classes.sidebar}>
            <Paper>
              <PaperTitle title='Social Media' />
            </Paper>
            <Paper>
              <PaperTitle title='Recent Posts' />
            </Paper>
            <Paper style={{position: 'sticky', top: 16}}>
              <AdSense.Google client='ca-pub-2201766662007361'
                slot='8424881597'
                format='auto' 
              />
            </Paper>
          </aside>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);