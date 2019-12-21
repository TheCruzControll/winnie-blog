import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from './pages/home';
import Post from './pages/post';
import NoMatch from './pages/no-match';
import Create from './pages/create';
import Login from './pages/login';
import Navbar from './components/navbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#547c63'
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
        <Navbar />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/create' component={Create} />
            <Route path='/about' component={NoMatch} />
            <Route path='/login' component={Login} />
            <Route path='/404' component={NoMatch} />
            <Route path='/:slug' component={Post} />
          </Switch>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
