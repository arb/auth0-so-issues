import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

const handleAuthentication = (hash, auth) => {
  if (/access_token|id_token|error/.test(hash)) {
    auth.handleAuthentication();
  }
};

class Callback extends Component {
  static propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string,
    }),
    auth: PropTypes.object.isRequired,
  };
  componentDidMount() {
    handleAuthentication(this.props.location.hash, this.props.auth);
  }
  render() {
    return (
      <div>
        <Spinner>
          <span>Logging in with Auth0...</span>
        </Spinner>
      </div>);
  }
}

export default Callback;
