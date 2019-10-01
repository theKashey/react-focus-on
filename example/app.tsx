import * as React from 'react';
import {Component} from 'react';
import {Toggle} from 'react-powerplug';
import {FocusOn, MoveFocusInside, InFocusGuard, classNames} from "../src";

export interface AppState {
  enabled: boolean;
}

const FocusPane = ({children}) => <div className={classNames.fullWidth}>{children}</div>;

const ScrollBox = React.forwardRef(({children}, ref: any) => (
  <div ref={ref} style={{overflow: 'scroll', height: '200px', width: '300px', backgroundColor: 'rgba(0,0,0,0.3)'}}>
    <button>{children}</button>
    <ul>
      {Array(100).fill(1).map((_, index) => <li>{index}</li>)}
    </ul>
    <InFocusGuard>
      <button>{children}</button>
    </InFocusGuard>
  </div>
));

const repoUrl = 'https://github.com/zzarcon/';
export default class App extends Component <{}, AppState> {
  state: AppState = {
    enabled: false
  };

  toggleRef = React.createRef<any>();
  scrollRef = React.createRef<any>()

  toggle = () => this.setState({enabled: !this.state.enabled});

  render() {
    return (
      <Toggle>
        {({on, toggle}) => (
          <div>
            <FocusPane>
              <button>outside</button>
              outside
              <button onClick={()=>alert('ok')}>test outside event</button>
              <button onClick={toggle} ref={this.toggleRef}>toggle drop</button>
              <button onClick={toggle}>toggle drop 2</button>
              {on && <div style={{backgroundColor: '#EEE'}}>
                <FocusOn
                  scrollLock={true}
                  onClickOutside={toggle}
                  onEscapeKey={toggle}
                  shards={[this.toggleRef, this.scrollRef]}
                  onActivation={() => console.log("activated")}
                  onDeactivation={() => console.log("deactivated")}
                >
                  Holala!!
                  <button onClick={()=>alert('ok')}>test inside event</button>
                  <a href="http://github.com">link</a>
                  <button onClick={toggle}>close</button>
                  <ScrollBox>innerbox</ScrollBox>
                </FocusOn>
              </div>}


              <ScrollBox ref={this.scrollRef}>outer box</ScrollBox>


              <FocusOn
                enabled={this.state.enabled}
                // onClickOutside={this.toggle}
                onEscapeKey={this.toggle}
              >
                inside
                <button>inside</button>

                <button onClick={this.toggle}>{this.state.enabled ? 'disable' : 'enable'}</button>
                <MoveFocusInside key={`k-${this.state.enabled}`}>
                  <button>inside</button>
                </MoveFocusInside>
                <button>inside</button>
              </FocusOn>
              <button>outside</button>
              Example!
              {
                Array(100).fill(1).map((_, x) =>
                  <div key={`k${x}`}>
                    {Array(10).fill(1).map((_, x) => <span key={`k${x}`}> *{x}</span>)}
                  </div>
                )
              }
            </FocusPane>
          </div>
        )}
      </Toggle>
    )
  }
}