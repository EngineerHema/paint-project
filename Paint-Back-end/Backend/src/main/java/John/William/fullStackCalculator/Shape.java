package John.William.fullStackCalculator;
import com.fasterxml.jackson.databind.JsonNode;  // To handle JSON node manipulation

public abstract class Shape {
    protected String type;

    public String getType() {
        return type;
    }

    public abstract String getTemplate();

    // Abstract method to parse the received properties and create the shape instance
    public abstract void populateProperties(JsonNode properties);
}
