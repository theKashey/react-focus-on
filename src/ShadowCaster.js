import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ShadowCaster extends PureComponent {

  state = {
    animationEnd: 0,
    animationStart: 0
  };

  componentWillMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    const {width, height} = this.state;

    const {enabled, targets} = this.props;

    const placeHolders = targets.map(target => target.getPlaceholder()).filter(x => !!x);

    return (enabled && <div style={{pointerEvents: 'none'}}>
        <Shadow
          width={width}
          height={height}
          targets={targets}
        />
        {placeHolders}
      </div>
    )
  }
}

export default ShadowCaster;
