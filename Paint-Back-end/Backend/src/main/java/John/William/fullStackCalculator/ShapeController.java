package John.William.fullStackCalculator;

import com.fasterxml.jackson.databind.JsonNode;  // To handle JSON node manipulation
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import static John.William.fullStackCalculator.ShapeService.appendShapeToFile;

@RestController
@RequestMapping("/shapes")
public class ShapeController {

    // Receive shape type and return the shape template
    @PostMapping("/receiveShape")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<String> receiveShape(@RequestBody String shapeType) {
        try {
            shapeType = shapeType.replaceAll("\"", "");

            Shape shape = ShapeFactory.createShape(shapeType, null);

            String template = shape.getTemplate();
            return ResponseEntity.ok().header("Content-Type", "application/json").body(template);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing shape: " + e.getMessage());
        }
    }

    // Create the shape by receiving the filled details and save it
    @PostMapping("/createShape")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<String> createShape(@RequestBody String shapeDetails) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode shapeJson = objectMapper.readTree(shapeDetails);

            String shapeType = shapeJson.get("type").asText();
            JsonNode properties = shapeJson.get("properties");

            Shape shape = ShapeFactory.createShape(shapeType, properties);
            ShapeService.appendShapeToFile(shapeDetails);

            return ResponseEntity.ok("Shape successfully created");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating shape: " + e.getMessage());
        }
    }

    // Handle the delete request by shape ID
    @PostMapping("/deleteShapeById")
    @CrossOrigin(origins = "http://localhost:5173")
    public String deleteShapeById(@RequestBody String shapeId) {
        System.out.println("5ara" + shapeId);
        shapeId = shapeId.replaceAll("\"", "");
        System.out.println("5ara" + shapeId);

        try {
            ShapeService.deleteShapeById(shapeId);
            return "Shape deleted successfully.";
        } catch (Exception e) {
            return "Error deleting shape: " ;
        }
    }
}
