
import { Rect } from "react-konva";


export default function SquarePrototype({shape, newX, newY, handleShapeClick, id}){
  
  console.log(shape)
    const newShape = {
        ...shape,
        x:newX,
        y:newY,
        id:String(id)  
      };
      return(
        <Rect
        {...newShape}
        onClick={handleShapeClick}
      />
      );
}
