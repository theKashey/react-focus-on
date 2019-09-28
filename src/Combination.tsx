import * as React from 'react';
import {FocusOn as ReactFocusOn} from "./UI";
import {ReactFocusOnProps} from './types';

const RequireSideCar = (props: any) => {
  const now = performance.now();
  const SideCar = require('./sidecar').default;
  console.log('initialization:', performance.now() - now);
  return <SideCar {...props} />;
};

export function FocusOn(props: ReactFocusOnProps) {
  return (
    <ReactFocusOn
      {...props}
      sideCar={RequireSideCar}
    />
  );
}