import * as React from 'react';

import { FocusOn as ReactFocusOn } from './UI.tsx';
import SideCar from './sidecar.ts';
import type { ReactFocusOnProps } from './types.tsx';

const RequireSideCar = (props: any) => {
  return <SideCar {...props} />;
};

export const FocusOn = React.forwardRef<HTMLElement, ReactFocusOnProps>(function ReactFocusOnForward(props, ref) {
  return <ReactFocusOn {...props} ref={ref} sideCar={RequireSideCar} />;
});
