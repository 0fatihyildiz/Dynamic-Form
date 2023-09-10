import { Card } from "@radix-ui/themes";
import { FORM_COMPONENTS } from "../constants";
import FormGenerator from "./form-generator";

function FieldsPanel() {
  return (
    <Card className="w-full">
      {FORM_COMPONENTS.map((component, idx) => (
        <div
          key={idx}
          className="mb-2 w-full"
          draggable={true}
          unselectable="on"
          onDragStart={(e) =>
            e.dataTransfer.setData("text/plain", JSON.stringify(component))
          }
        >
          <FormGenerator name={component.name} />
        </div>
      ))}
    </Card>
  );
}

export default FieldsPanel;
