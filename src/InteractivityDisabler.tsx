import * as React from 'react';
import {styleSinglentone} from 'react-style-singleton';

const Style = styleSinglentone();

export const focusHiddenMarker = 'data-focus-on-hidden';

const styles = `
 [${focusHiddenMarker}] {
   pointer-events: none !important;
 }
`;

export const InteractivityDisabler: React.SFC = () => (
  <Style styles={styles}/>
)