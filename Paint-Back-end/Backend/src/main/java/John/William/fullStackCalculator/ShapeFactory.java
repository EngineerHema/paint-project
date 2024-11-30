package John.William.fullStackCalculator;
import com.fasterxml.jackson.databind.JsonNode;  // To handle JSON node manipulation
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
public class ShapeFactory {

    public static Shape createShape(String shapeType, JsonNode properties) {
        Shape shape = null;

        // Ensure that properties are not null
        if (properties == null) {
            properties = new ObjectNode(JsonNodeFactory.instance);  // Initialize as empty ObjectNode
        }

        switch (shapeType.toLowerCase()) {
            case "circle":
                shape = new Circle();
                break;
            case "rectangle":
                shape = new Rectangle();
                break;
            case "triangle":
                shape = new Triangle();
                break;
            default:
                throw new IllegalArgumentException("Unknown shape type: " + shapeType);
        }

        // Populate the properties after the shape object is created
        shape.populateProperties(properties);

        return shape;
    }
}
