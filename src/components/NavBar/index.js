import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../routes';

import './NavBar.css';

const NavBar = ({ isAuthenticated }) => (
  <div id="navBar">
    <ul>
      {routes.map(({ path, name, secure }) => {
        if ((secure && isAuthenticated) || (!secure)) {
          return (
            <li key={path}><NavLink strict exact to={path}>{name}</NavLink></li>
          );
        }
        return null;
      })}
    </ul>
  </div>
);

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default NavBar;
