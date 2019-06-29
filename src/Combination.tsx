import * as React from 'react';
import {FocusOn as ReactFocusOn} from "./UI";
import {ReactFocusOnProps} from './types';

import sideCar from './sidecar';

export function FocusOn(props: ReactFocusOnProps) {
  return (
    <ReactFocusOn
      {...props}
      sideCar={sideCar}
    />
  );
}