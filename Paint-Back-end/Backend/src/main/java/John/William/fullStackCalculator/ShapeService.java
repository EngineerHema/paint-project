package John.William.fullStackCalculator;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;

public class ShapeService {

    private static List<JsonNode> shapeList = new ArrayList<>();

    // Method to append the shape details (in JSON string format) to the list and save it to a file
    public static void appendShapeToFile(String shapeDetails) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            shapeDetails = shapeDetails.replace("\\\"", "\"");
            JsonNode shapeJsonNode = objectMapper.readTree(shapeDetails);
            shapeList.add(shapeJsonNode);
            saveShapesToFile();
        } catch (Exception e) {
            System.out.println("Error appending shape to file: " + e.getMessage());
        }
    }

    // Method to delete shape by its ID
    public static void deleteShapeById(String shapeId) {
        try {
            shapeList = readShapesFromFile();

            // Filter out the shape with the matching ID
            shapeList.removeIf(shape -> shape.get("properties").get("id").asText().equals(shapeId));
            // Save the updated list back to the file
            saveShapesToFile();
        } catch (Exception e) {
            System.out.println("Error deleting shape by ID: " + e.getMessage());
        }
    }


    private static List<JsonNode> readShapesFromFile() {
        try {
            File file = new File("shapes.json");
            if (file.exists()) {
                ObjectMapper objectMapper = new ObjectMapper();
                // Deserialize JSON array directly to List<JsonNode>
                shapeList = objectMapper.readValue(file, new TypeReference<List<JsonNode>>() {});
            }
        } catch (IOException e) {
            System.out.println("Error reading shapes from file: " + e.getMessage());
        }
        return shapeList;
    }

    private static void saveShapesToFile() {
        try {
            FileWriter fileWriter = new FileWriter("shapes.json");
            ObjectMapper objectMapper = new ObjectMapper();
            // Use the ObjectMapper's writerWithDefaultPrettyPrinter to save the shapes in a pretty format
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(fileWriter, shapeList);
        } catch (IOException e) {
            System.out.println("Error writing shapes to file: " + e.getMessage());
        }
    }}