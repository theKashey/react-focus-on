import { hideOthers } from 'aria-hidden';
import * as React from 'react';

import { useEffect, useRef } from 'react';

import { InteractivityDisabler } from './InteractivityDisabler.tsx';
import { focusHiddenMarker } from './medium.ts';
import type { EffectProps } from './types.ts';

const extractRef = (ref: React.RefObject<any> | HTMLElement): HTMLElement => ('current' in ref ? ref.current : ref);

export function Effect({
  setLockProps,

  onEscapeKey,
  onClickOutside,
  shards,

  onActivation,
  onDeactivation,
  noIsolation,
  activeNode,
}: EffectProps) {
  const lastEventTarget = useRef<EventTarget | null>(null);
  const mouseTouches = useRef<number>(0);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.defaultPrevented) {
        if ((event.code === 'Escape' || event.key === 'Escape' || event.keyCode === 27) && onEscapeKey) {
          onEscapeKey(event);
        }
      }
    };

    const onMouseDown = (event: MouseEvent | TouchEvent) => {
      if (
        event.defaultPrevented ||
        event.target === lastEventTarget.current ||
        (event instanceof MouseEvent && event.button !== 0)
      ) {
        return;
      }

      if (
        shards &&
        shards.map(extractRef).some((node) => (node && node.contains(event.target as any)) || node === event.target)
      ) {
        return;
      }

      if (onClickOutside) {
        onClickOutside(event);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      onMouseDown(event);
      mouseTouches.current = event.touches.length;
    };

    const onTouchEnd = (event: TouchEvent) => {
      mouseTouches.current = event.touches.length;
    };

    if (activeNode) {
      activeNode.ownerDocument.addEventListener('keydown', onKeyDown);
      activeNode.ownerDocument.addEventListener('mousedown', onMouseDown);
      activeNode.ownerDocument.addEventListener('touchstart', onTouchStart);
      activeNode.ownerDocument.addEventListener('touchend', onTouchEnd);

      return () => {
        activeNode.ownerDocument.removeEventListener('keydown', onKeyDown);
        activeNode.ownerDocument.removeEventListener('mousedown', onMouseDown);
        activeNode.ownerDocument.removeEventListener('touchstart', onTouchStart);
        activeNode.ownerDocument.removeEventListener('touchend', onTouchEnd);
      };
    }

    return;
  }, [activeNode, onClickOutside, onEscapeKey]);

  useEffect(() => {
    if (activeNode) {
      if (onActivation) {
        onActivation(activeNode);
      }

      return () => {
        if (onDeactivation) {
          onDeactivation();
        }
      };
    }

    return;
  }, [!!activeNode]);

  useEffect(() => {
    if (noIsolation || !activeNode) {
      return;
    }

    return hideOthers(
      [activeNode, ...(shards || []).map(extractRef)],
      activeNode.ownerDocument.body,
      focusHiddenMarker
    );
  }, [activeNode, noIsolation]);

  // run this effect before any other to act before componentDidMount in focus-lock/react-clientside-effect
  useEffect(() => {
    setLockProps({
      onMouseDown: (e: React.MouseEvent) => {
        lastEventTarget.current = e.target;
      },
      onTouchStart: (e: React.TouchEvent) => {
        lastEventTarget.current = e.target;
      },
    });

    return () => {
      setLockProps(false as any);
    };
  }, []);

  return <InteractivityDisabler />;
}
