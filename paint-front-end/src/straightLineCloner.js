import { Line } from "react-konva";

export default function StraightLinePrototype({ shape, newX, newY, handleShapeClick, id }) {
    const { points, rotation = 0, scaleX = 1, scaleY = 1 } = shape;

    if (!points || points.length !== 4) {
        console.error("Invalid points array:", points);
        return null;
    }

    const [x1, y1, x2, y2] = points;

    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;

    const relX1 = x1 - centerX;
    const relY1 = y1 - centerY;
    const relX2 = x2 - centerX;
    const relY2 = y2 - centerY;

    // Adjust for scaling
    const scaledX1 = relX1 * scaleX;
    const scaledY1 = relY1 * scaleY;
    const scaledX2 = relX2 * scaleX;
    const scaledY2 = relY2 * scaleY;

    // Adjust for rotation
    const radians = (rotation * Math.PI) / 180;
    const rotatedX1 = scaledX1 * Math.cos(radians) - scaledY1 * Math.sin(radians);
    const rotatedY1 = scaledX1 * Math.sin(radians) + scaledY1 * Math.cos(radians);
    const rotatedX2 = scaledX2 * Math.cos(radians) - scaledY2 * Math.sin(radians);
    const rotatedY2 = scaledX2 * Math.sin(radians) + scaledY2 * Math.cos(radians);

    // Translate new center position
    const newCenterX = newX;
    const newCenterY = newY;

    // Recalculate the new points
    const newPoints = [
        newCenterX + rotatedX1, newCenterY + rotatedY1,
        newCenterX + rotatedX2, newCenterY + rotatedY2
    ];

    // Create the new shape
    const newShape = {
        ...shape,
        points: newPoints,
        id: id,
    };

    return (
        <Line
            {...newShape}
            onClick={handleShapeClick}
        />
    );
}
