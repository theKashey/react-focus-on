import { createSidecarMedium } from 'use-sidecar';

import type { EffectProps } from './types.ts';

export const effectCar = createSidecarMedium<EffectProps>();
export const focusHiddenMarker = 'data-focus-on-hidden';
