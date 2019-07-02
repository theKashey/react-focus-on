import * as React from 'react';
import {configure, mount} from 'enzyme';
import {FocusOn} from '../src';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const tick = () => new Promise(resolve => setTimeout(resolve, 10));

describe('Endpoint UI', () => {
  it('smoke', async () => {
    const onActivation = jest.fn();
    const onDeactivation = jest.fn();

    const ref = React.createRef();
    const wrapper = mount(
      <div>
        <FocusOn inert onActivation={onActivation} onDeactivation={onDeactivation}>content</FocusOn>
        <div ref={ref}>outer</div>
      </div>
    );
    expect(wrapper.html()).toContain('content');
    expect(document.body.className).toBe('block-interactivity-0');
    await tick();
    expect(onActivation).toHaveBeenCalled();
    expect(ref.current.outerHTML).toBe('<div>outer</div>');

    wrapper.unmount();
    expect(onDeactivation).toHaveBeenCalled();
    expect(document.body.className).toBe('');
  });
});
