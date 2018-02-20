const size = (box) => [
  box[1][0] - box[0][0],
  box[1][1] - box[0][1],
];

const getCenter = (box, d) => [
  box[0][0] + d[0] * 0.5,
  box[0][1] + d[1] * 0.5,
];

const intersect = (box1, box2) => {
  const d1 = size(box1);
  const d2 = size(box2);
  const center1 = getCenter(box1, d1);
  const center2 = getCenter(box2, d2);

  return (
    Math.abs(center1[0] - center2[0]) < (d1[0] + d2[0]) &&
    Math.abs(center1[1] - center2[1]) < (d1[1] + d2[1]) &&
  )
};

const inBoxes = (boxes, boxb) => (
  boxes.reduce((acc, boxa) => acc || intersect(boxa, boxb), false)
);

const withNoInterceptions = (shapes) => {
  // shapes count ~ 1. no rbush here :{

  const result = [];
  shapes.forEach(shape => {
    if (!inBoxes(result, shape.getBBox())) {
      result.push(shape)
    }
  })
  return result;
};

export default withNoInterceptions;