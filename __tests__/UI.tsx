import * as React from 'react';
import {configure, mount} from 'enzyme';
import {FocusOn} from '../src/UI';
import {sidecar} from "use-sidecar";
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const tick = () => new Promise(resolve => setTimeout(resolve, 10));

const car = sidecar(() => import ('../src/sidecar'));

describe('UI', () => {
  it('smoke', async () => {
    const wrapper = mount(
      <FocusOn sideCar={car}>content</FocusOn>
    );
    expect(wrapper.html()).toContain('content');
    await tick();
    expect(wrapper.html()).toContain('content');
  });
});
