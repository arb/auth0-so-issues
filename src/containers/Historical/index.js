import React from 'react';
import { connect } from 'react-redux';
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryLine,
} from 'victory';
import PropTypes from 'prop-types';

import * as selectors from '../../redux/reducers';
import { fetchQuestions, uxActions } from '../../redux/actions';
import withData from '../../components/withData';

export const Historical = ({ data }) => (
  <div>
    <p>The following graph shows the number of StackOverflow issues opened over time. They are grouped by year and month.</p>
    <VictoryChart
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        tickLabelComponent={
          <VictoryLabel
            angle={300}
            verticalAnchor="middle"
            textAnchor="end"
            style={{
              fontSize: 3,
            }}
          />
        }
      />
      <VictoryAxis
        dependentAxis
        tickFormat={x => `${x} issues`}
        style={{
          tickLabels: {
            fontSize: 5,
          },
        }}
      />
      <VictoryLine
        data={data}
        x="date"
        y="count"
      />
    </VictoryChart>
  </div>
);

Historical.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    count: PropTypes.number,
  })).isRequired,
};

const mapStateToProps = (state) => {
  const fetch = selectors.getFetch(state);
  const d = selectors.getData(state);
  const data = selectors.getTimeCounts(d);
  const shouldFetch = selectors.needData(state);

  return {
    fetch,
    data,
    shouldFetch,
  };
};

export default connect(mapStateToProps, { fetchQuestions, ...uxActions })(withData(Historical, 'Historical'));
