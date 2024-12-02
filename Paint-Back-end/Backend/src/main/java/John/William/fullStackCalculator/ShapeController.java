package John.William.fullStackCalculator;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/shapes")
public class ShapeController {
    private final ShapeService shapeService;
    private List<JsonNode> shapeList = new ArrayList<>(); // In-memory shape list
    private Stack<List<JsonNode>> undoStack = new Stack<>(); // In-memory shape list
    private Stack<List<JsonNode>> redoStack = new Stack<>(); // In-memory shape list


    @Autowired
    public ShapeController(ShapeService shapeService) {
        this.shapeService = shapeService;
    }



        @PostMapping("/createShape")
        @CrossOrigin(origins = "http://localhost:3000")
        public String createShape(@RequestBody String shapeJson) {
            try {
                System.out.println(shapeJson);
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode newShape = objectMapper.readTree(shapeJson);

                // Check if the shape already exists in the list by comparing IDs
                boolean updated = false;
                for (int i = 0; i < shapeList.size(); i++) {
                    JsonNode existingShape = shapeList.get(i);
                    if (existingShape.get("id").asText().equals(newShape.get("id").asText())) {
                        // Replace the existing shape with the new one
                        shapeList.set(i, newShape);
                        updated = true;
                        break;
                    }
                }

                // If not updated, append the new shape to the list
                if (!updated) {
                    shapeList.add(newShape);
                }

                // Save the current state to undo stack
                if (undoStack.size() >= 5) {
                    undoStack.remove(0);  // Remove the oldest state if max size is exceeded
                }
                undoStack.push(new ArrayList<>(shapeList));

                return "Shape added or updated successfully!";
            } catch (Exception e) {
                e.printStackTrace();
                return "Error appending or updating shape: " + e.getMessage();
            }
        }

    @GetMapping("/undo")
    @CrossOrigin(origins = "http://localhost:3000")
    public synchronized List<JsonNode> undo() {
        if (undoStack.isEmpty()) {
            return new ArrayList<>(); // Return an empty list if no undo operation is available
        }

        // Pop the last state from the undo stack
        List<JsonNode> previousState = undoStack.pop();

        // Check if the popped state matches the current shapeList
        if (previousState.equals(shapeList) && !undoStack.isEmpty()) {
            // Skip the current state and use the next one
            previousState = undoStack.pop();
        }

        // Save the current state to the redo stack before applying undo
        pushWithLimit(redoStack, new ArrayList<>(shapeList));

        // Update shapeList to the previous state
        shapeList = new ArrayList<>(previousState);

        return previousState; // Return the previous state
    }

    @GetMapping("/redo")
    @CrossOrigin(origins = "http://localhost:3000")
    public synchronized List<JsonNode> redo() {
        if (redoStack.isEmpty()) {
            return shapeList; // Return the current state if no redo operation is available
        }

        // Pop the last state from the redo stack
        List<JsonNode> nextState = redoStack.pop();

        // Save the current state to the undo stack before applying redo
        pushWithLimit(undoStack, new ArrayList<>(shapeList));

        // Update shapeList to the next state
        shapeList = new ArrayList<>(nextState);

        return nextState; // Return the next state
    }



        @PostMapping("/deleteShapeById")
        @CrossOrigin(origins = "http://localhost:3000")
        public List<JsonNode> deleteShapeById(@RequestBody String shapeId) {
            String id = shapeId.replaceAll("\"", ""); // Remove the surrounding quotes from the ID

            // Save the current state to undo stack before modifying the list
            if (undoStack.size() >= 5) {
                undoStack.remove(0); // Remove the oldest state if max size is exceeded
            }
            undoStack.push(new ArrayList<>(shapeList));

            // Remove shape from in-memory list by ID
            shapeList.removeIf(shape -> shape.get("id").asText().equals(id));

            System.out.println("Shapes after deletion: " + shapeList);
            return shapeList; // Return the updated list after deletion
        }



    @GetMapping("/saveString")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<JsonNode> save() {
        return shapeList;
    }

    @PostMapping("/loadString")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<JsonNode> load(@RequestBody String filePath) throws IOException {
            filePath = filePath.replaceAll("\"", "");
            shapeService.loadShapesFromFile(shapeList, filePath); // Load shapes from file on initialization
            return shapeList;
    }

    private void pushWithLimit(Stack<List<JsonNode>> stack, List<JsonNode> state) {
        if (stack.size() >= 20) {
            stack.remove(0); // Remove the oldest state to make space
        }
        stack.push(state); // Add the new state
    }
}
