import { exportSidecar } from 'use-sidecar';

import 'react-focus-lock/sidecar';
import 'react-remove-scroll/sidecar';

import { Effect } from './Effect.tsx';
import { effectCar } from './medium.ts';

export default exportSidecar(effectCar, Effect);
