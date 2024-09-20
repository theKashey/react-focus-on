import * as React from 'react';

import { hideOthers } from 'aria-hidden';

import { InteractivityDisabler } from './InteractivityDisabler';
import { EffectProps } from './types';
import { focusHiddenMarker } from './medium';
import { useEffect, useRef, useState } from 'react';

const extractRef = (ref: React.RefObject<any> | HTMLElement): HTMLElement =>
  'current' in ref ? ref.current : ref;

export function Effect({
  setLockProps,

  onEscapeKey,
  onClickOutside,
  shards,

  onActivation,
  onDeactivation,
  noIsolation
}: EffectProps) {
  const [activeNode, setActiveNode] = useState<HTMLElement | null | undefined>(
    undefined
  );

  const lastEventTarget = useRef<EventTarget>(null);
  const mouseTouches = useRef<number>(0);

  React.useEffect(
    () => {
      const onKeyDown = (event: KeyboardEvent) => {
        if (!event.defaultPrevented) {
          if (
            (event.code === 'Escape' ||
              event.key === 'Escape' ||
              event.keyCode === 27) &&
            onEscapeKey
          ) {
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
          shards
            .map(extractRef)
            .some(
              node =>
                (node && node.contains(event.target as any)) ||
                node === event.target
            )
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
    },
    [activeNode, onClickOutside, onEscapeKey]
  );

  useEffect(
    () => {
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
    },
    [!!activeNode]
  );

  useEffect(() => {
    let _undo = (): any => null;
    let unmounted = false;

    const onNodeActivation = (node: HTMLElement) => {
      if (!noIsolation) {
        _undo = hideOthers(
          [node, ...(shards || []).map(extractRef)],
          node.ownerDocument.body,
          focusHiddenMarker
        );
      }
      setActiveNode(() => node);
    };

    const onNodeDeactivation = () => {
      _undo();
      if (!unmounted) {
        setActiveNode(null);
      }
    };

    setLockProps({
      onMouseDown: (e: React.MouseEvent) => {
        lastEventTarget.current = e.target;
      },
      onTouchStart: (e: React.TouchEvent) => {
        lastEventTarget.current = e.target;
      },
      onActivation: onNodeActivation,
      onDeactivation: onNodeDeactivation
    });

    return () => {
      unmounted = true;
      setLockProps(false as any);
    };
  }, []);

  return <InteractivityDisabler />;
}
