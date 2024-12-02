import { Line } from "react-konva";

export default function TriangleShape({ dimension, bgColour, handleShapeClick, id }) {

  // Calculate points for the triangle based on the dimension (x1, y1, x2, y2)
  const points = [
    dimension.x1, dimension.y1,  // First point (x1, y1)
    dimension.x2, dimension.y1,  // Second point (x2, y1)
    (dimension.x1 + dimension.x2) / 2, dimension.y2, // Third point (middle x, y2)
    dimension.x1, dimension.y1 // Closing the triangle (first point again)
  ];

  const newShape = {
    id: String(id),
    type: "Triangle",
    points: points,
    fill: bgColour.current,
    stroke: "black",
    strokeWidth: 2,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    skewX: 0,
    skewY: 0
  };

  return (
    <Line
      {...newShape}
      onClick={handleShapeClick}
      closed  // Close the triangle by connecting the last point with the first one
    />
  );
}
