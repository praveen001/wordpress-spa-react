import React from 'react';
import { History } from '../../Store';

import AdSense from 'react-adsense';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import PaperTitle from '../PaperTitle/PaperTitle';
import withStyles from 'material-ui/styles/withStyles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: 26,
    fontWeight: 500
  },
  content: {
    display: 'flex'
  },
  articles: {
    margin: theme.spacing.unit * 2,
    width: `calc(76% - ${theme.spacing.unit * 2 * 3}px)`
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
            <a href='' onClick={e => History.push('/')} className={classes.logo}>Source Clone</a>
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