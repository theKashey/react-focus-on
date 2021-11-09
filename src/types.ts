import * as React from 'react';
import ReactFocusLock from 'react-focus-lock/UI';
import {ComponentProps} from "react";

export interface LockProps {
  onMouseDown?(e: React.MouseEvent): void;

  onTouchStart?(e: React.TouchEvent): void;

  onActivation?(node: HTMLElement): void;

  onDeactivation?(): void;
}

export interface CommonProps {
  /**
   * action to perform on Esc key press
   */
  onEscapeKey?: (event: Event) => void;
  /**
   * action to perform on click outside
   */
  onClickOutside?: (event: MouseEvent | TouchEvent) => void;

  /**
   * callback on lock activation
   * @param node the main node
   */
  onActivation?: (node: HTMLElement) => void;
  /**
   * callback on lock deactivation
   */
  onDeactivation?: () => void;

  /**
   * [scroll-lock] control isolation
   * @see {@link https://github.com/theKashey/react-remove-scroll#usage}
   */
  noIsolation?: boolean;
  /**
   * [scroll-lock] full page inert (event suppression)
   * @default false
   * @see {@link https://github.com/theKashey/react-remove-scroll#usage}
   */
  inert?: boolean;
  /**
   * [scroll-lock] allows scroll based zoom
   * @default false
   * @see https://github.com/theKashey/react-remove-scroll#usage
   */
  allowPinchZoom?: boolean;

  /**
   * a list of elements which should be considered as a part of the lock
   */
  shards?: Array<React.RefObject<any> | HTMLElement>;
}

export interface ReactFocusOnProps extends CommonProps {
  /**
   * The main switch
   */
  enabled?: boolean;
  /**
   * Controls scroll lock behavior
   */
  scrollLock?: boolean;
  /**
   * Controls focus lock behavior
   */
  focusLock?: boolean;

  /**
   * [focus-lock] control autofocus
   * @default true
   */
  autoFocus?: boolean;
  /**
   * [focus-lock] control returnFocus
   * @default true
   */
  returnFocus?: ComponentProps<typeof ReactFocusLock>['returnFocus'];

  /**
   * [focus-lock] allows "ignoring" focus on some elements
   * @see {@link https://github.com/theKashey/react-focus-lock#api}
   */
  shouldIgnore?: (candidate: HTMLElement) => boolean;

  /**
   * allows replacement of the host node
   * @default div
   */
  as?: string | React.ElementType;

  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

export interface ReactFocusOnSideProps extends ReactFocusOnProps {
  sideCar: React.SFC<any>;
}

export interface EffectProps extends CommonProps {
  setLockProps(settings: LockProps): void;
}
