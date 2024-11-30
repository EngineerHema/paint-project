package John.William.fullStackCalculator;

import com.fasterxml.jackson.databind.JsonNode;  // To handle JSON node manipulation

public class Triangle extends Shape {
    public double base;
    public double height;
    public String color;
    public String id;  // New id attribute

    public Triangle() {
        this.type = "triangle";
        this.base = 0;
        this.height = 0;
        this.color = null;
        this.id = null;  // Initialize the id attribute
    }

    @Override
    public String getTemplate() {
        // Include the id in the JSON template
        return "{\"type\": \"" + type + "\", \"properties\": {\"base\": " + base +
                ", \"height\": " + height + ", \"color\": \"" + color +
                "\", \"id\": \"" + id + "\"}}";  // Added id property in template
    }

    @Override
    public void populateProperties(JsonNode properties) {
        if (properties.has("base")) {
            this.base = properties.get("base").asDouble();
        }
        if (properties.has("height")) {
            this.height = properties.get("height").asDouble();
        }
        if (properties.has("color")) {
            this.color = properties.get("color").asText();
        }
        if (properties.has("id")) {
            this.id = properties.get("id").asText();  // Populate id from properties
        }
    }
}
