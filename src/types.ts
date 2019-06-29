import * as React from "react";

export interface CommonProps {
  onEscapeKey?: (event: Event) => void;
  onClickOutside?: () => void;

  onActivation?: (node: HTMLElement) => void;
  onDeactivation?: () => void;

  noIsolation?: boolean;
  inert?: boolean;

  shards?: Array<React.RefObject<any> | HTMLElement>;
}

export interface ReactFocusOnProps extends CommonProps {
  enabled?: boolean;
  scrollLock?: boolean;
  focusLock?: boolean;

  autoFocus?: boolean;

  children: React.ReactNode;
}

export interface ReactFocusOnSideProps extends ReactFocusOnProps {
  sideCar: React.SFC<any>;
}

export interface EffectProps extends CommonProps {
  setLockProps(settings: object): void;
}