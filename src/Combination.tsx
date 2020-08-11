import * as React from 'react';
import { FocusOn as ReactFocusOn } from './UI';
import { ReactFocusOnProps } from './types';
import SideCar from './sidecar';

const RequireSideCar = (props: any) => {
  return <SideCar {...props} />;
};

export const FocusOn = React.forwardRef<HTMLElement, ReactFocusOnProps>(
  (props, ref) => <ReactFocusOn {...props} ref={ref} sideCar={RequireSideCar} />
);
