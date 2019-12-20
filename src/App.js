import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import { Grid, Container, Toolbar, Typography, Link } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Home from './pages/home';
import Post from './pages/post';
import NoMatch from './pages/no-match';
import Create from './pages/create';
import Login from './pages/login';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#679186'
    },
    secondary: {
      main: '#ffb4ac'
    }
  },
  status: {
    danger: 'orange'
  },
  typography: {
    fontFamily: 'Source Sans Pro',
    h1: {
      fontSize: 48,
      fontFamily: 'Playfair Display',
      fontWeight: 700,
      color: 'black'
    },
    h2: {
      fontFamily: 'Playfair Display'
    },
    h3: {
      fontFamily: 'Playfair Display'
    },
    h4: {
      fontFamily: 'Playfair Display'
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <nav>
          <Container>
            <Grid
              container
              direction='row'
              justify='flex-end'
              alignItems='center'
            >
              <Toolbar variant='dense'>
                <Typography variant='h5'>
                  <Link underline='none' color='inherit'>
                    Home
                  </Link>
                </Typography>
                <Typography variant='h5'>
                  <Link underline='none' color='inherit'>
                    About
                  </Link>
                </Typography>
                <Typography variant='h5'>
                  <Link underline='none' color='inherit'>
                    Blog
                  </Link>
                </Typography>
              </Toolbar>
            </Grid>
          </Container>
        </nav>

        <main>
          <Switch>
            <Route path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <ProtectedRoute path='/create' component={Create} />
            <Route path='/:slug' component={Post} />
            <Route path='/404' component={NoMatch} />
          </Switch>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
