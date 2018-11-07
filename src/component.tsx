import * as React from 'react';
import {Component} from 'react';
import {ScrollLocky} from 'react-scroll-locky';
import ReactFocusLock from 'react-focus-lock'
import {hideOthers} from 'aria-hidden';

export interface ReactFocusOnProps {
  enabled?: boolean;
  autoFocus?: boolean;
  onActivation?: (node: HTMLElement) => void;
  onDeactivation?: () => void;
  onClickOutside?: () => void;
}

export class ReactFocusOn extends Component<ReactFocusOnProps> {
  private _undo?: () => void;

  onActivation = (node: HTMLElement) => {
    this._undo = hideOthers(node);
    const {onActivation} = this.props;
    if (onActivation) {
      onActivation(node);
    }
  };

  onDeactivation = () => {
    this._undo!();
    const {onDeactivation} = this.props;
    if (onDeactivation) {
      onDeactivation();
    }
  };

  render() {
    const {children, autoFocus, onClickOutside, enabled = true} = this.props;
    return (
      <ScrollLocky
        enabled={enabled}
        onEscape={onClickOutside}
      >
        <ReactFocusLock
          autoFocus={autoFocus}
          onActivation={this.onActivation}
          onDeactivation={this.onDeactivation}
          disabled={!enabled}
        >
          {children}
        </ReactFocusLock>
      </ScrollLocky>
    );
  }
}