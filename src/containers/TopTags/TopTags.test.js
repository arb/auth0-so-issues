/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { TopTags } from './index';

describe('<TopTags />', () => {
  it('calls changeFilter on radion button clicks', () => {
    const changeFilter = jest.fn();
    const wrapper = shallow(<TopTags
      changeFilter={changeFilter}
      ux={{
        filter: '*',
      }}
    />);
    wrapper.find('input').at(1).simulate('change');
    expect(changeFilter).toHaveBeenCalledWith('top');
  });
});
