import * as React from 'react';
import { SideCarComponent } from 'use-sidecar';

import { RemoveScroll } from 'react-remove-scroll/UI';
import ReactFocusLock from 'react-focus-lock/UI';

import { EffectProps, ReactFocusOnSideProps, LockProps } from './types';
import { effectCar } from './medium';

export const FocusOn = React.forwardRef<HTMLElement, ReactFocusOnSideProps>(
  (props, parentRef) => {
    const [lockProps, setLockProps] = React.useState<LockProps>(false as any);

    const {
      children,
      autoFocus,
      shards,
      enabled = true,
      scrollLock = true,
      focusLock = true,
      returnFocus = true,
      inert,
      allowPinchZoom,
      sideCar,
      className,
      shouldIgnore,
      style,
      ...rest
    } = props;

    const SideCar: SideCarComponent<EffectProps> = sideCar;

    const { onActivation, onDeactivation, ...restProps } = lockProps;

    return (
      <>
        <ReactFocusLock
          ref={parentRef}
          sideCar={sideCar}
          disabled={!(lockProps && enabled && focusLock)}
          returnFocus={returnFocus}
          autoFocus={autoFocus}
          shards={shards}
          onActivation={onActivation}
          onDeactivation={onDeactivation}
          className={className}
          as={RemoveScroll}
          whiteList={shouldIgnore}
          lockProps={{
            ...restProps,
            sideCar,
            shards,
            allowPinchZoom,
            inert,
            style,
            enabled: enabled && scrollLock,
          }}
        >
          {children}
        </ReactFocusLock>
        {enabled && (
          <SideCar
            {...rest}
            sideCar={effectCar}
            setLockProps={setLockProps}
            shards={shards}
          />
        )}
      </>
    );
  }
);

export * from './reExports';
