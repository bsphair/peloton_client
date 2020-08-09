/* eslint-disable */
import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Login from 'components/login';
import Home from 'components/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';


const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(state => state.general.loginSuccessful);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const App = () => {
    return (
    <div className="App">
      {/*<Login />*/}
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          {/*<PrivateRoute exact path="/home">*/}
          {/*  <Home />*/}
          {/*</PrivateRoute>*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
