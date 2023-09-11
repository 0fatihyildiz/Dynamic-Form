import FieldsPanel from "./components/fields-panel";
import FormPreview, { FormPreviewProps } from "./components/form-preview";
import { useAppSelector } from "./hooks/store";

function App() {
  const layout = useAppSelector((state) => state.general.layout);
  const cols = useAppSelector((state) => state.general.cols);

  const defaultProps: FormPreviewProps = {
    className: "min-h-[20rem]",
    rowHeight: 35,
    cols,
  };

  return (
    <div className="py-24 space-y-4">
      <div className="max-w-4xl mx-auto flex justify-between items-end">
        <div className="flex flex-col">
          <h1 className="text-lg font-medium">Dynamic Form Generator</h1>
          <p className="text-sm text-zinc-400">Lorem ipsum dolor sit amet</p>
        </div>
        <div>actions</div>
      </div>
      <div className="flex max-w-4xl mx-auto space-x-4 justify-center w-full">
        <FieldsPanel />
        <FormPreview {...defaultProps} />
      </div>
      <div className="bg-black text-white rounded-md w-full p-4 max-w-4xl mx-auto text-sm font-mono whitespace-pre-wrap">
        {JSON.stringify(layout)}
      </div>
    </div>
  );
}

export default App;
