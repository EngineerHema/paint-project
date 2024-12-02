import RectanglePrototype from "./rectangleCloner";
import CirclePrototype from "./circleCloner";
import StraightLinePrototype from "./straightLineCloner";
import SquarePrototype from "./squareCloner";
import EllipsePrototype from "./ellipseCloner";
import TrianglePrototype from "./triangleCloner";

class Prototype {
    clone(type, copiedShape, x, y, handleShapeClick ,id) {
        console.log("type"+type);
        switch (type) {
        case 'Rectangle':
            return <RectanglePrototype shape={copiedShape} newX={x} newY={y} handleShapeClick={handleShapeClick} id={id}/>;
        case 'Circle':
            return <CirclePrototype shape={copiedShape} newX={x} newY={y} handleShapeClick={handleShapeClick} id={id}/>;
        case 'Straight line':
            return <StraightLinePrototype shape={copiedShape} newX={x} newY={y} handleShapeClick={handleShapeClick} id={id}/>;
        case 'Square':
                return <SquarePrototype shape={copiedShape} newX={x} newY={y} handleShapeClick={handleShapeClick} id={id} />;  
        case 'Ellipse':
            return <EllipsePrototype shape={copiedShape} newX={x} newY={y} handleShapeClick={handleShapeClick} id={id} />;
        case 'Triangle':
                return <TrianglePrototype shape={copiedShape} newX={x} newY={y} handleShapeClick={handleShapeClick} id={id} />;
        
        default:
            return null;
        }
    }
  
}


export default Prototype;
