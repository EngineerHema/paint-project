
import shapeFactory from "./shapeFactory";

const factory = new shapeFactory();
class ShapePrototype {
    cloneShape(shape,newX,newY,handleShapeClick){
        const { type, dimension, bgColour } = shape;
        const clonedDimensions = {
          x1: newX,
          y1: newY,
          x2: newX + (dimension.x2 - dimension.x1),
          y2: newY +(dimension.y2 - dimension.y1),
          
        };
       
        const clonedShape = factory.createShape(type, clonedDimensions, bgColour, handleShapeClick);
        return clonedShape;
      }
  }
  
  
  export default ShapePrototype;