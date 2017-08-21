/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import withData from './index';

const Comp = withData(() => (<div>hello world</div>), 'test');

describe('<withData />', () => {
  it('shows a spinner if loading is true', () => {
    const wrapper = shallow(<Comp fetch={{
      loading: true,
      error: null,
    }}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('shows an error if present', () => {
    const wrapper = shallow(<Comp fetch={{
      loading: false,
      error: 'There was an error getting data',
    }}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders the component only if there are no errors and loading is false', () => {
    const wrapper = mount(<Comp fetch={{
      loading: false,
      error: null,
    }}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('will get data if needed', () => {
    const fetchQuestions = jest.fn();
    mount(<Comp
      fetch={{
        loading: false,
        error: null,
      }}
      shouldFetch
      fetchQuestions={fetchQuestions}
    />, {
      lifecycleExperimental: true,
    });
    expect(fetchQuestions).toHaveBeenCalled();
  });
});
