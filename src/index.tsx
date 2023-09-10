import FieldsPanel from "./components/fields-panel";
import FormPreview, { FormPreviewProps } from "./components/form-preview";
import { useAppSelector } from "./hooks/store";

function App() {
  const droppedItem = useAppSelector((state) => state.general.droppedItem);

  const defaultProps: FormPreviewProps = {
    className: "min-h-[20rem]",
    rowHeight: 35,
    cols: 3,
  };

  return (
    <div className="py-24 space-y-4">
      <h1 className="max-w-4xl text-xl font-medium mx-auto">
        Dynamic Form Generator
      </h1>
      <div className="flex max-w-4xl mx-auto space-x-4 justify-center w-full">
        <FieldsPanel />
        <FormPreview droppingItem={{ i: "placeholder", ...droppedItem}} {...defaultProps} />
      </div>
    </div>
  );
}

export default App;
