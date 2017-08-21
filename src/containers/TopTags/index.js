import React from 'react';
import { connect } from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory';
import PropTypes from 'prop-types';

import * as selectors from '../../redux/reducers';
import { fetchQuestions, uxActions } from '../../redux/actions';
import withData from '../../components/withData';

export const TopTags = (props) => {
  const { data, changeFilter } = props;
  const { filter } = props.ux;

  return (
    <div>
      <p>The following graph shows the count of additoinal tags for StackOverflow issues tagged with `auth0`</p>
      <label>All
        <input type="radio" value="*" name="filter" checked={filter === '*'} onChange={() => { changeFilter('*'); }} />
      </label>
      <label>Top 10
        <input type="radio" value="top" name="filter" checked={filter === 'top'} onChange={() => { changeFilter('top'); }} />
      </label>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={10}
      >
        <VictoryAxis
          tickLabelComponent={
            <VictoryLabel
              angle={300}
              verticalAnchor="middle"
              textAnchor="end"
              dy={-0.5}
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
        <VictoryBar
          data={data}
          x="tag"
          y="value"
        />
      </VictoryChart>
    </div>
  );
};

TopTags.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    tag: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  ux: PropTypes.shape({
    filter: PropTypes.string,
  }).isRequired,
  changeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const fetch = selectors.getFetch(state);
  const ux = selectors.getUx(state);
  const shouldFetch = selectors.needData(state);
  const d = selectors.getData(state);
  const data = selectors.getTagCounts(d, ux);

  return {
    fetch,
    data,
    shouldFetch,
    ux,
  };
};

export default connect(mapStateToProps, { fetchQuestions, ...uxActions })(withData(TopTags, 'Top Tags'));
