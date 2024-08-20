import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import SavedBooks from './components/SavedBooks';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/signup' component={SignupForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;