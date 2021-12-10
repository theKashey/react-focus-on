import * as React from 'react';
import ReactFocusLock from 'react-focus-lock/UI';
import {ComponentProps} from "react";

export interface LockProps {
  onMouseDown?: ((e: React.MouseEvent) => void) | undefined;

  onTouchStart?: ((e: React.TouchEvent) => void) | undefined;

  onActivation?: ((node: HTMLElement) => void) | undefined;

  onDeactivation?: (() => void) | undefined;
}

export interface CommonProps {
  /**
   * action to perform on Esc key press
   */
  onEscapeKey?: ((event: Event) => void) | undefined;
  /**
   * action to perform on click outside
   */
  onClickOutside?: ((event: MouseEvent | TouchEvent) => void) | undefined;

  /**
   * callback on lock activation
   * @param node the main node
   */
  onActivation?: ((node: HTMLElement) => void) | undefined;
  /**
   * callback on lock deactivation
   */
  onDeactivation?: (() => void) | undefined;

  /**
   * [scroll-lock] control isolation
   * @see {@link https://github.com/theKashey/react-remove-scroll#usage}
   */
  noIsolation?: boolean | undefined;
  /**
   * [scroll-lock] full page inert (event suppression)
   * @default false
   * @see {@link https://github.com/theKashey/react-remove-scroll#usage}
   */
  inert?: boolean | undefined;
  /**
   * [scroll-lock] allows scroll based zoom
   * @default false
   * @see https://github.com/theKashey/react-remove-scroll#usage
   */
  allowPinchZoom?: boolean | undefined;

  /**
   * a list of elements which should be considered as a part of the lock
   */
  shards?: (Array<React.RefObject<any> | HTMLElement>) | undefined;
}

export interface ReactFocusOnProps extends CommonProps {
  /**
   * The main switch
   */
  enabled?: boolean | undefined;
  /**
   * Controls scroll lock behavior
   */
  scrollLock?: boolean | undefined;
  /**
   * Controls focus lock behavior
   */
  focusLock?: boolean | undefined;

  /**
   * [focus-lock] control autofocus
   * @default true
   */
  autoFocus?: boolean | undefined;
  /**
   * [focus-lock] control returnFocus
   * @default true
   */
  returnFocus?: ComponentProps<typeof ReactFocusLock>['returnFocus'] | undefined;

  /**
   * [focus-lock] allows "ignoring" focus on some elements
   * @see {@link https://github.com/theKashey/react-focus-lock#api}
   */
  shouldIgnore?: ((candidate: HTMLElement) => boolean) | undefined;

  /**
   * allows replacement of the host node
   * @default div
   */
  as?: string | React.ElementType | undefined;

  style?: React.CSSProperties | undefined;
  className?: string | undefined;
  children: React.ReactNode;
}

export interface ReactFocusOnSideProps extends ReactFocusOnProps {
  sideCar: React.SFC<any>;
}

export interface EffectProps extends CommonProps {
  setLockProps(settings: LockProps): void;
}
