import React from 'react';
import Curtain from './Curtain';
import withNoInterceptions from "./utils/withNoInterceptions";

const BOX = (width, height) => `M0 0 H ${width} V ${height} H 0 L 0 0z`;

const getUnboundedClip = (shapes) => withNoInterceptions(shapes).map(shape => shape.getClipPath());

const generatePath = (width, height, shapes) => {
  const box = BOX(width, height);
  return {
    clipPath: box + getUnboundedClip(shapes),
    path: box + shapes.map(shape => shape.getClipPath())
  }
};

const ShadowCurtain = (props) =>
  <Curtain generatePath={generatePath} backgroundColor="rgba(0,0,0,0.8)" {...props} affectUI={true}/>
ShadowCurtain.propTypes = Curtain.propTypes;

export default ShadowCurtain;