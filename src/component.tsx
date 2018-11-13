import * as React from 'react';
import {Component} from 'react';
import {ScrollLocky} from 'react-scroll-locky';
import ReactFocusLock from 'react-focus-lock'
import {hideOthers} from 'aria-hidden';

type GapMode = 'padding' | 'margin';

export interface ReactFocusOnProps {
  enabled?: boolean;
  autoFocus?: boolean;
  onActivation?: (node: HTMLElement) => void;
  onDeactivation?: () => void;

  gapMode?: GapMode;

  onClickOutside?: () => void;
  onEscapeKey?: (event: Event) => void;
}

export class ReactFocusOn extends Component<ReactFocusOnProps> {
  private _undo?: () => void;

  onActivation = (node: HTMLElement) => {
    this._undo = hideOthers(node);
    const {onActivation} = this.props;
    if (onActivation) {
      onActivation(node);
    }
    node.addEventListener('keyup', this.onKeyPress);
  };

  onDeactivation = (node: HTMLElement) => {
    this._undo!();
    const {onDeactivation} = this.props;
    if (onDeactivation) {
      onDeactivation();
    }
    node.removeEventListener('keyup', this.onKeyPress);
  };

  onKeyPress = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }
    const code = event.key || event.keyCode;
    if ((event.code === 'Escape' || code === 27) && this.props.onEscapeKey) {
      this.props.onEscapeKey(event);
    }
  };

  render() {
    const {children, autoFocus, onClickOutside, gapMode, enabled = true} = this.props;
    return (
      <ScrollLocky
        enabled={enabled}
        onEscape={onClickOutside}
        gapMode={gapMode}
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