import { Circle } from "react-konva";

export default function CircleShape({dimension, bgColour, handleShapeClick, id, handleCreateShape}){
    
    const dx = dimension.x2 - dimension.x1;
    const dy = dimension.y2 - dimension.y1;
    console.log(dimension);
    const radius = Math.sqrt(dx * dx + dy * dy);
    const newShape = {
        id,
        type: "Circle",
        x: dimension.x1,
        y: dimension.y1,
        z:dimension.x2,
        w:dimension.y2,
        radius: radius,
        fill: bgColour.current,
        stroke:"black",
        strokeWidth:2,
        
      };

        // Define onPointerUp to call handleCreateShape with the Konva node
  const onPointerUp = (e) => {
    const shapeNode = e.target; // Access the shape node (Konva Rect)
    handleCreateShape(shapeNode); // Pass the Konva node to handleCreateShape
  };

      return(
        <Circle
        {...newShape}
        onClick={handleShapeClick}
        onPointerUp={onPointerUp}
      />
      );
}