import * as React from 'react';
import {Component} from 'react';
import {GHCorner} from 'react-gh-corner';
import {AppWrapper} from './styled';
import {FocusOn, FocusPane, AutoFocusInside, MoveFocusInside} from "../src";

export interface AppState {
  enabled: boolean;
}

const repoUrl = 'https://github.com/zzarcon/';
export default class App extends Component <{}, AppState> {
  state: AppState = {
    enabled: false
  };

  render() {
    return (
      <AppWrapper>
        <FocusPane>
          <GHCorner openInNewTab href={repoUrl}/>
          <button>outside</button>
          outside
          <FocusOn enabled={this.state.enabled}>
            inside
            <button>inside</button>

            <button onClick={() => this.setState({enabled: !this.state.enabled})}>toggle</button>
            <MoveFocusInside key={`k-${this.state.enabled}`}>
              <button>inside</button>
            </MoveFocusInside>
            <button>inside</button>
          </FocusOn>
          <button>outside</button>
          Example!
          {
            Array(100).fill(1).map((_, x) => <div key={`k${x}`}>{Array(100).fill(1).map((_, x) => <span
              key={`k${x}`}> *{x}</span>}</div>)
          }
        </FocusPane>
      </AppWrapper>
    )
  }
}