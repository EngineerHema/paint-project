package John.William.fullStackCalculator;

import com.fasterxml.jackson.databind.JsonNode;  // To handle JSON node manipulation

public class Circle extends Shape {

    public double radius;
    public String color;
    public double borderWidth;
    public String id;  // New id attribute

    public Circle() {
        this.type = "circle";
        this.radius = 0;
        this.color = null;
        this.borderWidth = 0;
        this.id = null;  // Initialize the id attribute
    }

    @Override
    public String getTemplate() {
        // Include the id in the JSON template
        return "{\"type\": \"" + type + "\", \"properties\": {\"radius\": " + radius +
                ", \"color\": \"" + color + "\", \"borderWidth\": " + borderWidth +
                ", \"id\": \"" + id + "\"}}";  // Added id property in template
    }

    @Override
    public void populateProperties(JsonNode properties) {
        if (properties.has("radius")) {
            this.radius = properties.get("radius").asDouble();
        }
        if (properties.has("color")) {
            this.color = properties.get("color").asText();
        }
        if (properties.has("borderWidth")) {
            this.borderWidth = properties.get("borderWidth").asDouble();
        }
        if (properties.has("id")) {
            this.id = properties.get("id").asText();  // Populate id from properties
        }
    }
}
