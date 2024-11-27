import { Line } from "react-konva";
import CircleShape from "./circle";
import RectangleShape from "./rectangle";
import LineShape from "./freedrowing";

class ShapeFactory {
  createShape(type, dimensions, bgColour) {
    switch (type) {
      case 'Rectangle':
        return <RectangleShape dimension={dimensions} bgColour={bgColour} />;
      case 'Circle':
        return <CircleShape dimension={dimensions} bgColour={bgColour} />;
      case 'Line':
         return <LineShape dimensions={dimensions} bgColour={bgColour}/> ;
      default:
        return null;
    }
  }
}

export default ShapeFactory;
