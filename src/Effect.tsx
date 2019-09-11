import * as React from 'react';

import {hideOthers} from 'aria-hidden';

import {InteractivityDisabler} from "./InteractivityDisabler";
import {EffectProps} from "./types";
import {focusHiddenMarker} from "./medium";

const extractRef = (ref: React.RefObject<any> | HTMLElement): HTMLElement => (
  ('current' in ref) ? ref.current : ref
);

export function Effect(
  {
    setLockProps,

    onEscapeKey,
    onClickOutside,
    shards,

    onActivation,
    onDeactivation,
    noIsolation
  }: EffectProps) {
  React.useEffect(() => {
    let _undo = () => {
      return
    };
    let lastEventTarget: EventTarget;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return;
      }
      if ((event.code === 'Escape' || event.key === 'Escape' || event.keyCode === 27) && onEscapeKey) {
        onEscapeKey(event);
      }
    };

    const onClick = (event: MouseEvent | TouchEvent) => {
      if (event.defaultPrevented || event.target === lastEventTarget) {
        return;
      }
      if (
        shards &&
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

    const onNodeActivation = (node: HTMLElement) => {
      _undo = hideOthers(
        [node, ...(shards || []).map(extractRef)],
        document.body,
        noIsolation ? undefined : focusHiddenMarker
      );
      if (onActivation) {
        onActivation(node);
      }
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('click', onClick);
      document.addEventListener('touchend', onClick);
    };

    const onNodeDeactivation = () => {
      _undo();
      if (onDeactivation) {
        onDeactivation();
      }
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
      document.removeEventListener('touchend', onClick);
    };

    setLockProps({
      onClick: (e: React.MouseEvent) => {
        lastEventTarget = e.target
      },
      onTouchEnd: (e: React.TouchEvent) => {
        lastEventTarget = e.target
      },
      onActivation: onNodeActivation,
      onDeactivation: onNodeDeactivation,
    });

  }, []);

  return (
    <InteractivityDisabler/>
  );
}
