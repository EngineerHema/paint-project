import { Ellipse } from 'react-konva';


export default function EllipsePrototype({ shape, newX, newY, handleShapeClick, id }) {
  
    
 
  const newShape = {
    ...shape,
    x: newX, // Center the ellipse horizontally
    y: newY, // Center the ellipse vertically
    id: String(id)  // Ensure id is a string
  };

  return (
    <Ellipse
      {...newShape}
      onClick={handleShapeClick}
    />
  );
}
