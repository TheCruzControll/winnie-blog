import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

import Home from './pages/home';
import Post from './pages/post';
import NoMatch from './pages/no-match';
import Create from './pages/create';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <nav>
        <Link to='/'>
          <h2>My React + Firebase Blog</h2>
        </Link>
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
  );
}

export default App;
