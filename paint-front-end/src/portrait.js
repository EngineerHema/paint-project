import React, { useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

export default function Portrait({bgColour, setBgColour}) {

  const stageRef = useRef();
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);

  const onPointerDown = () => {
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    setCurrentShape({ x, y, width: 0, height: 0 });
  };

  const onPointerMove = () => {
    if (!currentShape) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const { x: startX, y: startY } = currentShape;

    // Update rectangle dimensions
    const newShape = {
      x: startX,
      y: startY,
      width: x - startX,
      height: y - startY,
      bgColour: bgColour
    };

    setCurrentShape(newShape);
  };

  const onPointerUp = () => {
    if (currentShape) {
      setShapes([...shapes, currentShape]); // Finalize the rectangle
      setCurrentShape(null); // Reset current rectangle
    }
  };

  return (
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
          <Rect
            key={i}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            fill={shape.bgColour}
            stroke="black"
            strokeWidth={2}
          />
        ))}

        {/* Render the shapeangle being drawn */}
        {currentShape && (
          <Rect
            x={currentShape.x}
            y={currentShape.y}
            width={currentShape.width}
            height={currentShape.height}
            fill={bgColour}
            stroke="black"
            strokeWidth={2}
          />
        )}
      </Layer>
    </Stage>
  );
}
