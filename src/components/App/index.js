import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../NavBar';
import routes from '../../routes';
import Auth from '../../auth';
import Callback from '../Callback';

const auth = new Auth();

const App = () => {
  const isAuthenticated = auth.isAuthenticated();
  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} />
      <div>
        <Switch>
          {routes.map(({ path, component: Component, secure }) => (
            <Route
              key={path}
              path={path}
              render={(props) => {
                if ((isAuthenticated && secure) || (!secure)) {
                  return <Component {...props} auth={auth} />;
                }
                return <Redirect to="/" />;
              }}
              exact
            />
          ))}
          <Route
            path="/callback"
            exact
            render={props => <Callback {...props} auth={auth} />}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
