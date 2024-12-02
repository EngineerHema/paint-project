import { Rect } from "react-konva";
import { useEffect } from 'react';

export default function RectangleShape({ dimension, bgColour, handleShapeClick, id, handleCreateShape}) {

  const width = dimension.x2 - dimension.x1;
  const height = dimension.y2 - dimension.y1;

  const newShape = {
    id: id,
    type: "Rectangle",
    x: dimension.x1,
    y: dimension.y1,
    width: width,
    height: height,
    fill: bgColour.current,
    stroke: "black",
    strokeWidth: 2,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    skewX: 0,
    skewY: 0
  };



  // Define onPointerUp to call handleCreateShape with the Konva node
  const onPointerUp = (e) => {
    const shapeNode = e.target; // Access the shape node (Konva Rect)
    handleCreateShape(shapeNode); // Pass the Konva node to handleCreateShape
  };

  return <Rect {...newShape} onClick={handleShapeClick} onPointerUp={onPointerUp}/>;
}
