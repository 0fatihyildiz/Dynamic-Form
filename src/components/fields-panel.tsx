import { Card } from "@radix-ui/themes";
import { FORM_COMPONENTS } from "../constants";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { useAppDispatch } from "../hooks/store";
import { setDroppedItem } from "../store/slices/general-slice";

function FieldsPanel() {
  const dispatch = useAppDispatch();

  return (
    <Card className="w-full">
      {FORM_COMPONENTS.map((component, idx) => (
        <Card
          key={idx}
          color="black"
          className="field-item"
          draggable={true}
          unselectable="on"
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", JSON.stringify(component));
            dispatch(setDroppedItem(component));
          }}
        >
          <DragHandleDots2Icon className="inline-flex my-auto opacity-50 mr-2" />
          {component.name}
        </Card>
      ))}
    </Card>
  );
}

export default FieldsPanel;
