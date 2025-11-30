import * as React from 'react';
import { styleSingleton } from 'react-style-singleton';

import { focusHiddenMarker } from './medium.ts';

const Style = styleSingleton();

const styles = `
 [${focusHiddenMarker}] {
   pointer-events: none !important;
 }
`;

export const InteractivityDisabler: React.FC = () => <Style styles={styles} />;
