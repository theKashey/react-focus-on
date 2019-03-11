import * as React from 'react';
import {Component} from 'react';
import {RemoveScroll} from 'react-remove-scroll';
import ReactFocusLock from 'react-focus-lock'
import {hideOthers} from 'aria-hidden';
import {focusHiddenMarker, InteractivityDisabler} from "./InteractivityDisabler";

export interface ReactFocusOnProps {
  enabled?: boolean;
  scrollLock?: boolean;
  focusLock?: boolean;

  autoFocus?: boolean;
  onActivation?: (node: HTMLElement) => void;
  onDeactivation?: () => void;

  onClickOutside?: () => void;
  onEscapeKey?: (event: Event) => void;

  noIsolation?: boolean;

  shards?: Array<React.RefObject<any> | HTMLElement>;
}

const extractRef = (ref: React.RefObject<any> | HTMLElement): HTMLElement => (
  ('current' in ref) ? ref.current : ref
);

export class ReactFocusOn extends Component<ReactFocusOnProps> {
  private _undo?: () => void;

  private lockProps = {
    onClick: (e: React.MouseEvent) => e.preventDefault(),
  };

  private onActivation = (node: HTMLElement) => {
    this._undo = hideOthers(
      [node, ...(this.props.shards || []).map(extractRef)],
      document.body,
      this.props.noIsolation ? undefined : focusHiddenMarker
    );
    const {onActivation} = this.props;
    if (onActivation) {
      onActivation(node);
    }
    document.addEventListener('keyup', this.onKeyPress);
    document.addEventListener('click', this.onClick);
  };

  private onDeactivation = (node: HTMLElement) => {
    this._undo!();
    const {onDeactivation} = this.props;
    if (onDeactivation) {
      onDeactivation();
    }
    document.removeEventListener('keyup', this.onKeyPress);
    document.removeEventListener('click', this.onClick);
  };

  private onKeyPress = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }
    const code = event.key || event.keyCode;
    if ((event.code === 'Escape' || code === 'Escape' || code === 27) && this.props.onEscapeKey) {
      this.props.onEscapeKey(event);
    }
  };

  private onClick = (event: MouseEvent) => {
    const {shards = [], onClickOutside} = this.props;
    if (event.defaultPrevented) {
      return;
    }
    if (
      shards
        .map(extractRef)
        .some(node => node && node.contains(event.target as any) || node === event.target)
    ) {
      return;
    }
    if (onClickOutside) {
      onClickOutside();
    }
  };

  render() {
    const {children, autoFocus, shards, enabled = true, scrollLock = true, focusLock = true} = this.props;
    return (
      <>
        <RemoveScroll
          enabled={enabled && scrollLock}
          shards={shards}
        >
          <InteractivityDisabler/>
          <ReactFocusLock
            returnFocus
            autoFocus={autoFocus}
            onActivation={this.onActivation}
            onDeactivation={this.onDeactivation}
            disabled={!(enabled && focusLock)}
            shards={shards}

            lockProps={this.lockProps}
          >
            {children}
          </ReactFocusLock>
        </RemoveScroll>
      </>
    );
  }
}
