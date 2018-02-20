import React from 'react';
import Curtain from './Curtain';

const generatePath = (width, height, shapes) => ({
  path: shapes.map(shape => shape.getClipPath())
});

const LightCurtain = (props) =>
  <Curtain generatePath={generatePath} {...props} affectUI={false} backgroundColor="transparent"/>
LightCurtain.propTypes = Curtain.propTypes;

export default LightCurtain;