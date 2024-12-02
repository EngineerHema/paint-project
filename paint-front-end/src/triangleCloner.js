import { Line } from "react-konva";

export default function TrianglePrototype({ shape, newX, newY, handleShapeClick, id }) {
  console.log(shape);

  const offsetPoints = shape.points.map((point, index) =>
    index % 2 === 0 ? point + newX : point + newY
  );


  const newShape = {
    ...shape,
    id: String(id),  
    points: offsetPoints,   
  };

  return (
    <Line
      {...newShape}
      closed  // Close the triangle by connecting the last point with the first one
      onClick={handleShapeClick}
    />
  );
}
