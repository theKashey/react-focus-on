import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Effect} from '../src/Effect';

configure({adapter: new Adapter()});

describe('shard updates', () => {
  it('updates which nodes are excluded from isolation', () => {
    const activeNode = document.createElement('div');
    const firstShard = document.createElement('div');
    const secondShard = document.createElement('div');
    document.body.appendChild(activeNode);
    document.body.appendChild(firstShard);
    document.body.appendChild(secondShard);
    const wrapper = mount(<Effect activeNode={activeNode} shards={[firstShard]} setLockProps={() => {}} />);
    try {
      expect(firstShard.hasAttribute('aria-hidden')).toBe(false);
      expect(secondShard.getAttribute('aria-hidden')).toBe('true');
      wrapper.setProps({shards: [secondShard]});
      expect(firstShard.getAttribute('aria-hidden')).toBe('true');
      expect(secondShard.hasAttribute('aria-hidden')).toBe(false);
    } finally {
      wrapper.unmount();
      activeNode.remove();
      firstShard.remove();
      secondShard.remove();
    }
  });

  it('updates which nodes are excluded from outside clicks', () => {
    const activeNode = document.createElement('div');
    const firstShard = document.createElement('div');
    const secondShard = document.createElement('div');
    document.body.appendChild(activeNode);
    document.body.appendChild(firstShard);
    document.body.appendChild(secondShard);
    const onClickOutside = jest.fn();
    const wrapper = mount(<Effect activeNode={activeNode} shards={[firstShard]} setLockProps={() => {}} onClickOutside={onClickOutside} />);
    try {
      wrapper.setProps({shards: [secondShard]});
      secondShard.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
      expect(onClickOutside).not.toHaveBeenCalled();
      firstShard.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
      expect(onClickOutside).toHaveBeenCalledTimes(1);
    } finally {
      wrapper.unmount();
      activeNode.remove();
      firstShard.remove();
      secondShard.remove();
    }
  });
});
