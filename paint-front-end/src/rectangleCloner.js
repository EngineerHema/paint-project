
import { Rect } from "react-konva";


export default function RectanglePrototype({shape, newX, newY, handleShapeClick, id}){
  
  console.log(shape)
    const newShape = {
        ...shape,
        x:newX,
        y:newY,
        id:id
      };
      return(
        <Rect
        {...newShape}
        onClick={handleShapeClick}
      />
      );
}
