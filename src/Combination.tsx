import * as React from 'react';
import { FocusOn as ReactFocusOn } from './UI';
import { ReactFocusOnProps } from './types';

const RequireSideCar = (props: any) => {
  // @ts-ignore
  const SideCar = require('./sidecar').default;
  return <SideCar {...props} />;
};

export const FocusOn = React.forwardRef<HTMLElement, ReactFocusOnProps>(
  (props, ref) => <ReactFocusOn {...props} ref={ref} sideCar={RequireSideCar} />
);
