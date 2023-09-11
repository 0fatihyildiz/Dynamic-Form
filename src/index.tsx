import { IconButton } from "@radix-ui/themes";
import FieldsPanel from "./components/fields-panel";
import FormPreview, { FormPreviewProps } from "./components/form-preview";
import FieldDialog from "./components/shared/field-dialog";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { ColumnsIcon, EyeOpenIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { setCols } from "./store/slices/general-slice";

function App() {
  const layout = useAppSelector((state) => state.general.layout);
  const cols = useAppSelector((state) => state.general.cols);
  const dispatch = useAppDispatch();
  const defaultProps: FormPreviewProps = {
    className: "min-h-[20rem]",
    rowHeight: 35,
    cols,
  };

  return (
    <div className="py-24 space-y-4">
      <FieldDialog />
      <div className="max-w-4xl mx-auto flex justify-between items-end">
        <div className="flex flex-col">
          <h1 className="text-lg font-medium">Dynamic Form Generator</h1>
          <p className="text-sm text-zinc-400">Lorem ipsum dolor sit amet</p>
        </div>
        <div className="space-x-2">
          <IconButton
            variant="surface"
            color="gray"
            onClick={() => dispatch(setCols(cols === 3 ? 4 : 3))}
          >
            {cols === 4 ? (
              <ColumnsIcon />
            ) : (
              <HamburgerMenuIcon className="rotate-90" />
            )}
          </IconButton>
          <IconButton variant="surface" color="gray">
            <EyeOpenIcon />
          </IconButton>
        </div>
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
