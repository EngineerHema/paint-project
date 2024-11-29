import { Circle } from "react-konva";

export default function CircleShape({dimension, bgColour, handleShapeClick}){
    
    const dx = dimension.x2 - dimension.x1;
    const dy = dimension.y2 - dimension.y1;
    console.log(dimension);
    const radius = Math.sqrt(dx * dx + dy * dy);
    const newShape = {
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

      return(
        <Circle
        {...newShape}
        onClick={handleShapeClick}
      />
      );
}