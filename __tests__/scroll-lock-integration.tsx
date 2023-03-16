import * as React from 'react';
import {configure, mount} from 'enzyme';
import {FocusOn} from '../src/UI';
import {sidecar} from "use-sidecar";
import { RemoveScroll } from 'react-remove-scroll/UI';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



const tick = () => new Promise(resolve => setTimeout(resolve, 10));

const car = sidecar(() => import ('../src/sidecar'));

describe('UI', () => {
    it('gap off', async () => {
        const wrapper = mount(
            <FocusOn sideCar={car}>content</FocusOn>
        );
        expect((wrapper).find(RemoveScroll).prop('gapMode')).toBe(undefined);
    });
    it('gap off', async () => {
        const wrapper = mount(
            <FocusOn sideCar={car} gapMode="padding">content</FocusOn>
        );
        expect((wrapper).find(RemoveScroll).prop('gapMode')).toBe('padding');
    });
});
