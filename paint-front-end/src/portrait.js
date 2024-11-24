import React, {  useRef, useState } from "react";
import { Stage, Layer } from "react-konva";

import Rectangle from "./rectangle";

export default function Portrait({bgColour}) {

  const stageRef = useRef();
  const dimensions = useRef(null);
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);



  const onPointerDown = () => {
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    dimensions.current = { x1:x, y1:y, x2:x, y2:y };
    console.log(dimensions.current)
  };

  const onPointerMove = () => {
    if (!dimensions?.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    dimensions.current = {  ...dimensions.current, x2: x, y2: y };

    console.log(dimensions.current)
    setCurrentShape(<Rectangle dimension={dimensions.current} bgColour={bgColour}/>);
  };

  const onPointerUp = () => {
    if (currentShape!==null) {
      setShapes([...shapes, currentShape]); // Finalize the rectangle
      setCurrentShape(null); // Reset current rectangle
      dimensions.current = null;
    }
  };

  return (
    <div className="portrait">
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <Layer>
        {/* Render finalized shapes */}
        {shapes.map((shape, i) => (
          shape
        ))}

        {/* Render the shapeangle being drawn */}
        {currentShape!==null && (
          currentShape
        )}
      </Layer>
    </Stage>
    </div>
  );
}
