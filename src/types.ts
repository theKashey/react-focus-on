import * as React from "react";

export interface LockProps {
  onMouseDown?(e: React.MouseEvent): void;

  onTouchStart?(e: React.TouchEvent): void;

  onActivation?(node: HTMLElement): void;

  onDeactivation?(): void;
}

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
  returnFocus?: boolean | FocusOptions;

  children: React.ReactNode;
}

export interface ReactFocusOnSideProps extends ReactFocusOnProps {
  sideCar: React.SFC<any>;
}

export interface EffectProps extends CommonProps {
  setLockProps(settings: LockProps): void;
}
