
import { Circle } from "react-konva";


export default function CirclePrototype({shape, newX, newY, handleShapeClick, id}){
  
  console.log(shape)
    const newShape = {
        ...shape,
        x:newX,
        y:newY,
        id:id
      };
      return(
        <Circle
        {...newShape}
        onClick={handleShapeClick}
      />
      );
}
