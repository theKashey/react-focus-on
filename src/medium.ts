import { createSidecarMedium } from 'use-sidecar';
import {EffectProps} from "./types";

export const effectCar = createSidecarMedium<EffectProps>();
export const focusHiddenMarker = 'data-focus-on-hidden';
