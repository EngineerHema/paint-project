package John.William.fullStackCalculator;

import com.fasterxml.jackson.databind.JsonNode;  // To handle JSON node manipulation

public class Rectangle extends Shape {
    public double length;
    public double width;
    public String color;
    public String id;  // New id attribute

    public Rectangle() {
        this.type = "rectangle";
        this.length = 0;
        this.width = 0;
        this.color = null;
        this.id = null;  // Initialize the id attribute
    }

    @Override
    public String getTemplate() {
        // Include the id in the JSON template
        return "{\"type\": \"" + type + "\", \"properties\": {\"length\": " + length +
                ", \"width\": " + width + ", \"color\": \"" + color +
                "\", \"id\": \"" + id + "\"}}";  // Added id property in template
    }

    @Override
    public void populateProperties(JsonNode properties) {
        if (properties.has("length")) {
            this.length = properties.get("length").asDouble();
        }
        if (properties.has("width")) {
            this.width = properties.get("width").asDouble();
        }
        if (properties.has("color")) {
            this.color = properties.get("color").asText();
        }
        if (properties.has("id")) {
            this.id = properties.get("id").asText();  // Populate id from properties
        }
    }
}
