import React, { useRef, useState } from 'react';
import type { PropsWithChildren, FC } from 'react';

import { FocusOn, InFocusGuard, classNames } from '../src/index.ts';

const FocusPane: FC<PropsWithChildren<{}>> = ({ children }) => <div className={classNames.fullWidth}>{children}</div>;

const ScrollBox = React.forwardRef<any, PropsWithChildren<{}>>(({ children }, ref: any) => (
  <div ref={ref} style={{ overflow: 'scroll', height: '200px', width: '300px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
    <button>{children}</button>
    <ul>
      {Array(100)
        .fill(1)
        .map((_, index) => (
          <li key={index}>{index}</li>
        ))}
    </ul>
    <InFocusGuard>
      <button>{children}</button>
    </InFocusGuard>
  </div>
));

export const App = () => {
  const toggleRef = useRef<any>();
  const scrollRef = useRef<any>();

  const [enabled1, setEnabled1] = useState(false);
  const toggle1 = () => setEnabled1((e) => !e);

  const [enabled2, setEnabled2] = useState(false);
  const toggle2 = () => setEnabled2((e) => !e);
  const [shardRef] = useState([scrollRef]);

  return (
    <div>
      <FocusPane>
        <button>outside</button>
        outside
        <button onClick={() => alert('ok')}>test outside event</button>
        <button onClick={toggle1} ref={toggleRef}>
          toggle drop
        </button>
        <button onClick={toggle1}>toggle drop 2</button>
        {
          <div style={{ backgroundColor: '#EEE' }}>
            <FocusOn
              enabled={enabled1}
              scrollLock={true}
              onClickOutside={toggle1}
              onEscapeKey={toggle1}
              shards={shardRef}
              onActivation={() => console.log('activated')}
              onDeactivation={() => console.log('deactivated')}
              allowPinchZoom={true}
              className="test-class-name"
              style={{ color: 'inherit' }}
            >
              Holala!! {enabled1 ? 'on' : 'off'}
              <button onClick={() => alert('ok')}>test inside event</button>
              <a href="http://github.com">link</a>
              <button onClick={toggle1}>close</button>
              <ScrollBox>innerbox</ScrollBox>
            </FocusOn>
          </div>
        }
        <ScrollBox ref={scrollRef}>outer box</ScrollBox>
        <FocusOn enabled={enabled2} onEscapeKey={toggle2}>
          inside
          <button>inside</button>
          <button onClick={toggle2}>{enabled2 ? 'disable' : 'enable'}</button>
          <button>inside</button>
        </FocusOn>
        <button>outside</button>
        Example!
        {Array(100)
          .fill(1)
          .map((_, x) => (
            <div key={`k${x}`}>
              {Array(10)
                .fill(1)
                .map((_, x) => (
                  <span key={`k${x}`}> *{x}</span>
                ))}
            </div>
          ))}
      </FocusPane>
    </div>
  );
};

export default {};
