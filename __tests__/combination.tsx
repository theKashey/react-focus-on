import * as React from 'react';
import {configure, mount} from 'enzyme';
import {FocusOn} from '../src';
import * as Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const tick = () => new Promise(resolve => setTimeout(resolve, 10));

describe('Endpoint Combination', () => {
  afterAll(() => {
    document.body='';
  })
  it('smoke', async () => {
    const onActivation = jest.fn();
    const onDeactivation = jest.fn();

    const TestTarget = ({enabled}) => (
      <div>
        <button autoFocus>button1</button>
        <FocusOn enabled={enabled} inert onActivation={onActivation} onDeactivation={onDeactivation}>
          content
          <button>button2</button>
        </FocusOn>
      </div>
    );

    const wrapper = mount(<TestTarget enabled={false}/>, {attachTo:document.body});
    expect(wrapper.html()).toContain('content');

    expect(document.activeElement.innerHTML).toBe('button1');

    wrapper.setProps({enabled:true});
    expect(document.body.className).toBe('block-interactivity-0');
    await tick();
    expect(onActivation).toHaveBeenCalled();
    expect(document.activeElement.innerHTML).toBe('button2');

    wrapper.unmount();

    expect(onDeactivation).toHaveBeenCalled();
    expect(document.body.className).toBe('');
    await tick();
    expect(document.activeElement.innerHTML).toBe('button1');
  });
});
