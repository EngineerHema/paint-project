
import { Rect } from "react-konva";


export default function RectangleShape({dimension, bgColour,handleShapeClick}){
  
  const width = (dimension.x2 - dimension.x1);
  const height = (dimension.y2 - dimension.y1);
  
    const newShape = {
        type : "Rectangle",
        x: dimension.x1,
        y: dimension.y1,
        z:dimension.x2,
        w:dimension.y2,
        width: width,
        height:height,
        fill: bgColour.current,
        stroke:"black",
        strokeWidth:2,
      };
      return(
        <Rect
        {...newShape }
        onClick={handleShapeClick}
      />
      );
}
