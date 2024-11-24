import CircleShape from "./circle";
import RectangleShape from "./rectangle";

class ShapeFactory {
  createShape(type, dimensions, bgColour) {
    switch (type) {
      case 'Rectangle':
        return <RectangleShape dimension={dimensions} bgColour={bgColour} />;
      case 'Circle':
        return <CircleShape dimension={dimensions} bgColour={bgColour} />;
      default:
        return null;
    }
  }
}

export default ShapeFactory;
