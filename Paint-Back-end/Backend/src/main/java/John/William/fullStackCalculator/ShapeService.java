package John.William.fullStackCalculator;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class ShapeService {
    private static final String DEFAULT_FILE_PATH = "C:\\Users\\johnw\\Downloads\\shapes.json";
    private final ObjectMapper objectMapper = new ObjectMapper();



    public void saveShapesToFile(List<JsonNode> shapeList, String filePath) throws IOException {
        File file = new File(filePath);
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, shapeList); // Write shapes to file
    }



    public void loadShapesFromFile( List<JsonNode> shapeList, String filePath) throws IOException {
        File file = new File(filePath);
        if (file.exists()) {
            // Read shapes from file and assign to the provided shapeList
            JsonNode[] shapesArray = objectMapper.readValue(file, JsonNode[].class);
            shapeList.clear();  // Clear any existing data in the shapeList
            shapeList.addAll(Arrays.asList(shapesArray)); // Add the shapes to the provided list
        } else {
            shapeList.clear(); // If file doesn't exist, clear the list
        }
    }
}
