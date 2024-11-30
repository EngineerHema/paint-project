import RectanglePrototype from "./rectangleCloner";
import CirclePrototype from "./circleCloner";
import StraightLinePrototype from "./straightLineCloner";

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
        
        default:
            return null;
        }
    }
  
}


export default Prototype;
