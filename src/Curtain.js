import React from 'react';
import PropTypes from 'prop-types';

const Curtain = ({width, height, shapes, backgroundColor, onClick, affectUI, generatePath}) => (
  <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} style={{pointerEvents: 'none'}}>
    <path
      fill={backgroundColor}
      onClick={onClick}
      d={generatePath(width, height, shapes)}
      style={{pointerEvents: affectUI ? 'all' : 'none', fillRule: 'evenodd'}}
    />
  </svg>
);

Curtain.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shapes: PropTypes.array,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  generatePath: PropTypes.func,
  affectUI: PropTypes.bool,
};

export default Curtain;