import { IconButton, ScrollArea } from "@radix-ui/themes";
import FieldsPanel from "./components/fields-panel";
import FormPreview, { FormPreviewProps } from "./components/form-preview";
import FieldDialog from "./components/shared/field-dialog";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import {
  ColumnsIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { setCols, setPreview } from "./store/slices/general-slice";
import { Layout } from "react-grid-layout";
import { useEffect, useState } from "react";

function App() {
  const [layout, setLayout] = useState<Layout[]>([]);
  const cols = useAppSelector((state) => state.general.cols);
  const preview = useAppSelector((state) => state.general.preview);
  const dispatch = useAppDispatch();

  const defaultProps: FormPreviewProps = {
    rowHeight: 35,
    className: "min-h-[20rem] mx-auto max-w-2xl w-full flex flex-col items-start",
    cols,
    layout,
    setLayout,
  };

  useEffect(() => {
    const isPreview = layout.map((layoutItem: Layout) => {
      return { ...layoutItem, isDraggable: !preview };
    });
    setLayout(isPreview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  function formatCode(data: Layout[], indentation: number = 2): string {
    const indent = " ".repeat(indentation);
    let formattedCode = "[";

    for (let i = 0; i < data.length; i++) {
      formattedCode +=
        "\n" + indent + JSON.stringify(data[i], null, indentation);
      if (i < data.length - 1) {
        formattedCode += ",";
      }
    }

    formattedCode += "\n]";

    return formattedCode;
  }

  return (
    <div className="py-24 space-y-4">
      <FieldDialog />
      <div className="max-w-7xl mx-auto flex justify-between items-end">
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
          <IconButton
            variant="surface"
            color="gray"
            onClick={() => dispatch(setPreview(!preview))}
          >
            {preview ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </IconButton>
        </div>
      </div>
      <div className="flex max-w-7xl mx-auto space-x-4 justify-center w-full">
        <FieldsPanel />
        <FormPreview {...defaultProps} />
        <ScrollArea
          type="hover"
          className="p-2 !h-full border border-zinc-200 shadow-sm max-h-[24rem] whitespace-break-spaces rounded-md text-sm font-mono"
        >
          {formatCode(layout, 2)}
        </ScrollArea>
      </div>
    </div>
  );
}

export default App;
