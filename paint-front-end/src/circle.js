import { Circle } from "react-konva";

export default function CircleShape({dimension, bgColour}){
    
    const dx = dimension.x2 - dimension.x1;
    const dy = dimension.y2 - dimension.y1;
    const radius = Math.sqrt(dx * dx + dy * dy);
    const newShape = {
        x: dimension.x1,
        y: dimension.y1,
        radius: radius,
        Fill: bgColour.current,
        stroke:"black",
        strokeWidth:2,
        draggable : true
      };

      return(
        <Circle
        {...newShape}

      />
      );
}