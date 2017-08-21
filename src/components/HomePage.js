import React from 'react';
import PropTypes from 'prop-types';

const HomePage = ({ auth }) => {
  const isAuthenticated = auth.isAuthenticated();

  if (!isAuthenticated) {
    return (
      <div>
        <p>You need to log in with Auth0 to use this application. Surely you´ve got an account already!</p>
        <button onClick={() => {
          auth.login();
        }}
        >
          Log In
        </button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => {
        auth.logout();
      }}
      >Log Out</button>
      <p>This is the home page. It doesn´t really do anything and is acting more as a placeholder than anything.</p>
      <p>
        So this app uses the following technologies:
      </p>
      <ul>
        <li>react</li>
        <li>redux</li>
        <li>hapi</li>
        <li>create react app </li>
        <li>victory</li>
        <li>google big data</li>
        <li>auth0 (hosted option)</li>
      </ul>
    </div>
  );
};

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default HomePage;
