import CircleShape from "./circle";
import RectangleShape from "./rectangle";
import LineShape from "./line";
import StraightLineShape from "./straightLine";

class ShapeFactory {
  createShape(type, dimensions, bgColour,handleShapeClick ,id) {
    switch (type) {
      case 'Rectangle':
        return <RectangleShape dimension={dimensions} bgColour={bgColour} handleShapeClick={handleShapeClick} id={id}/>;
      case 'Circle':
        return <CircleShape dimension={dimensions} bgColour={bgColour}handleShapeClick={handleShapeClick} id={id}/>;
      case 'Line':
         return <LineShape dimensions={dimensions} bgColour={bgColour}handleShapeClick={handleShapeClick} id={id}/> ;
      case 'Straight line':
         return <StraightLineShape dimensions={dimensions} bgColour={bgColour}handleShapeClick={handleShapeClick} id={id}/> ;
      default:
        return null;
    }
  }
  
}


export default ShapeFactory;
