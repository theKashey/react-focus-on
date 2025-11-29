import * as React from 'react';

import { hideOthers } from 'aria-hidden';

import { InteractivityDisabler } from './InteractivityDisabler';
import { EffectProps } from './types';
import { focusHiddenMarker } from './medium';
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  useCallback,
} from 'react';

const extractRef = (ref: React.RefObject<any> | HTMLElement): HTMLElement =>
  'current' in ref ? ref.current : ref;

export function Effect({
  setLockProps,

  onEscapeKey,
  onClickOutside,
  shards,

  onActivation,
  onDeactivation,
  noIsolation,
}: EffectProps) {
  const [activeNode, setActiveNode] = useState<HTMLElement | null | undefined>(
    undefined
  );

  const lastEventTarget = useRef<EventTarget | null>(null);
  const mouseTouches = useRef<number>(0);

  // Track if component is hydrated to prevent hydration errors
  // Returns false during SSR/hydration, true after hydration
  const isHydrated = useSyncExternalStore(
    useCallback(() => () => {}, []),
    () => true,
    () => false
  );

  const pendingLockPropsRef = useRef<any>(null);

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
              (node) =>
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
          activeNode.ownerDocument.removeEventListener(
            'mousedown',
            onMouseDown
          );
          activeNode.ownerDocument.removeEventListener(
            'touchstart',
            onTouchStart
          );
          activeNode.ownerDocument.removeEventListener('touchend', onTouchEnd);
        };
      }
      return undefined;
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
      return undefined;
    },
    [!!activeNode]
  );

  useEffect(
    () => {
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

      const lockPropsValue = {
        onMouseDown: (e: React.MouseEvent) => {
          lastEventTarget.current = e.target;
        },
        onTouchStart: (e: React.TouchEvent) => {
          lastEventTarget.current = e.target;
        },
        onActivation: onNodeActivation,
        onDeactivation: onNodeDeactivation,
      };

      // Only call setLockProps after hydration is complete
      if (isHydrated) {
        setLockProps(lockPropsValue);
      } else {
        pendingLockPropsRef.current = lockPropsValue;
      }

      return () => {
        unmounted = true;
        if (isHydrated) {
          setLockProps(false as any);
        } else {
          pendingLockPropsRef.current = false as any;
        }
      };
    },
    [isHydrated]
  );

  // Apply pending lock props after hydration
  useEffect(
    () => {
      if (isHydrated && pendingLockPropsRef.current !== null) {
        setLockProps(pendingLockPropsRef.current);
        pendingLockPropsRef.current = null;
      }
    },
    [isHydrated]
  );

  return <InteractivityDisabler />;
}
