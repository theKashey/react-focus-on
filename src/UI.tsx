import * as React from 'react';
import ReactFocusLock from 'react-focus-lock/UI';
import { RemoveScroll } from 'react-remove-scroll/UI';
import type { SideCarComponent } from 'use-sidecar';

import { effectCar } from './medium.ts';
import type { EffectProps, ReactFocusOnSideProps, LockProps } from './types.ts';

const PREVENT_SCROLL = { preventScroll: true };

export const FocusOn = React.forwardRef<HTMLElement, ReactFocusOnSideProps>((props, parentRef) => {
  const [lockProps, setLockProps] = React.useState<LockProps>(false as any);
  const [activeNode, setActiveNode] = React.useState<HTMLElement | null>(null);

  const {
    children,
    autoFocus,
    shards,
    crossFrame,
    enabled = true,
    scrollLock = true,
    focusLock = true,
    returnFocus = true,
    inert,
    allowPinchZoom,
    sideCar,
    className,
    shouldIgnore,
    preventScrollOnFocus,
    style,
    as,
    gapMode,
    ...rest
  } = props;

  const SideCar: SideCarComponent<EffectProps> = sideCar;

  const restProps = lockProps;

  const appliedLockProps = {
    ...restProps,

    as,
    style,

    sideCar,

    shards,

    allowPinchZoom,
    gapMode,
    inert,

    enabled: enabled && scrollLock,
  } as const;

  const onActivation = React.useCallback((node: HTMLElement) => {
    setActiveNode(node);
  }, []);

  const onDeactivation = React.useCallback(() => {
    setActiveNode(null);
  }, []);

  return (
    <>
      {enabled ? (
        <SideCar {...rest} sideCar={effectCar} setLockProps={setLockProps} shards={shards} activeNode={activeNode} />
      ) : null}
      <ReactFocusLock
        ref={parentRef}
        sideCar={sideCar}
        disabled={!(enabled && focusLock)}
        returnFocus={returnFocus}
        autoFocus={autoFocus}
        shards={shards}
        crossFrame={crossFrame}
        onActivation={onActivation}
        onDeactivation={onDeactivation}
        className={className}
        whiteList={shouldIgnore}
        lockProps={appliedLockProps}
        focusOptions={preventScrollOnFocus ? PREVENT_SCROLL : undefined}
        // @ts-expect-error TS2322 Property 'forwardProps' is missing
        as={RemoveScroll}
      >
        {children}
      </ReactFocusLock>
    </>
  );
});

export * from './reExports.ts';
