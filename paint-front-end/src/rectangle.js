
import { Rect } from "react-konva";


export default function RectangleShape({dimension, bgColour,handleShapeClick, id}){
  

 
  const width = (dimension.x2 - dimension.x1);
  const height = (dimension.y2 - dimension.y1);
  
    const newShape = {
        id:id,
        type : "Rectangle",
        x: dimension.x1,
        y: dimension.y1,
        width: width,
        height:height,
        fill: bgColour.current,
        stroke:"black",
        strokeWidth:2,
        scaleX:1,
        scaleY:1,
        rotation:0,
        skewX:0,
        skewY:0
      };
      return(
        <Rect
        {...newShape }
        onClick={handleShapeClick}
      />
      );
}
