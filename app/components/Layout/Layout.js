import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'

import AdSense from 'react-adsense';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
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
    width: '100%',
    margin: 0
  },
  articles: {
  },
  sidebar: {
    '& > div': {
      padding: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      minHeight: 100
    }
  }
});

class Layout extends React.Component {
  
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  goToHome = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position='static'
        >
          <Toolbar>
            <a href='https://sourceclone.com/' className={classes.logo} onClick={this.goToHome}>Source Clone</a>
          </Toolbar>
        </AppBar>
        <Grid container spacing={16} className={classes.content}>
          <Grid item xs={12} md={9} lg={9} className={classes.articles}>
            {this.props.children}
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <aside className={classes.sidebar}>
              {/* <Paper>
                <PaperTitle title='Social Media' />
              </Paper>
              <Paper>
                <PaperTitle title='Recent Posts' />
              </Paper> */}
              <Paper style={{position: 'sticky', top: 16}}>
                <AdSense.Google client='ca-pub-2201766662007361'
                  slot='8424881597'
                  format='auto' 
                />
              </Paper>
            </aside>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Layout));