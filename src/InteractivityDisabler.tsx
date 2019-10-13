import * as React from 'react';
import { styleSingleton } from 'react-style-singleton';
import { focusHiddenMarker } from './medium';

const Style = styleSingleton();

const styles = `
 [${focusHiddenMarker}] {
   pointer-events: none !important;
 }
`;

export const InteractivityDisabler: React.SFC = () => <Style styles={styles} />;
