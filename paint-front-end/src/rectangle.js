import { Rect } from "react-konva";

export default function Rectangle({dimension, bgColour}){
    const newShape = {
        x: dimension.x1,
        y: dimension.y1,
        width: dimension.x2-dimension.x1,
        height: dimension.y2-dimension.y1,
        Fill: bgColour,
        stroke:"black",
        strokeWidth:2
      };

      return(
        <Rect
        {...newShape}

      />
      );
}