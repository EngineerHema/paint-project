import { Rect } from "react-konva";

export default function RectangleShape({dimension, bgColour,handleShapeClick}){
    const newShape = {
        x: dimension.x1,
        y: dimension.y1,
        width: dimension.x2-dimension.x1,
        height: dimension.y2-dimension.y1,
        fill: bgColour.current,
        stroke:"black",
        strokeWidth:2,
        draggable : true
      };

      return(
        <Rect
        {...newShape }
        onClick={handleShapeClick}
      />
      );
}