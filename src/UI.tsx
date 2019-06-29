import * as React from 'react';
import {SideCarComponent} from "use-sidecar";

import {RemoveScroll} from 'react-remove-scroll/UI';
import ReactFocusLock from 'react-focus-lock/UI'

import {EffectProps, ReactFocusOnSideProps} from "./types";
import {effectCar} from "./medium";

export function FocusOn(props: ReactFocusOnSideProps) {
  const [lockProps, setLockProps] = React.useState({});

  const {children, autoFocus, shards, enabled = true, scrollLock = true, focusLock = true, inert, sideCar, ...rest} = props;

  const SideCar: SideCarComponent<EffectProps> = sideCar;
  return (
    <>
      <RemoveScroll
        sideCar={sideCar}
        enabled={enabled && scrollLock}
        shards={shards}
        inert={inert}
      >
        {enabled && <SideCar
          {...rest}
          sideCar={effectCar}
          setLockProps={setLockProps}
          shards={shards}
        />}
        <ReactFocusLock
          sideCar={sideCar}
          disabled={!(lockProps && enabled && focusLock)}

          returnFocus
          autoFocus={autoFocus}

          shards={shards}

          lockProps={lockProps}
        >
          {children}
        </ReactFocusLock>
      </RemoveScroll>
    </>
  );
}

export * from './reExports';