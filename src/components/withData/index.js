import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';

const Container = ({ children, name }) => (
  <div>
    <h1>{name}</h1>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
};

const withData = (WrappedComponent, name) => class extends Component {
  static propTypes = {
    shouldFetch: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    fetch: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    }).isRequired,
  };
  componentDidMount() {
    const { shouldFetch, fetchQuestions, auth } = this.props;
    if (shouldFetch) {
      fetchQuestions(auth);
    }
  }
  render() {
    const { loading, error } = this.props.fetch;
    if (loading) {
      return (
        <Container name={name}>
          <Spinner>
            <span>Loading data... Please be patient as there is a lot of data to load!</span>
          </Spinner>
        </Container>
      );
    }

    if (error) {
      return (
        <Container name={name}>
          <span>{error}</span>
        </Container>
      );
    }

    return (
      <Container name={name}>
        <WrappedComponent {...this.props} />
      </Container>
    );
  }
};

export default withData;
