import React, { useEffect, useState } from "react";
import RGL, { WidthProvider, Layout, CoreProps } from "react-grid-layout";
import { Card } from "@radix-ui/themes";
import { arrangeLayout, createIDGenerator } from "../utils";
import { GenerateDOM } from "./shared/generate-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import Lottie from "lottie-react";
import DragLottie from "../assets/lottie/drag.json";
import PreviewLottie from "../assets/lottie/preview.json";
import { setFieldDialogOpen, setPreviewFormData } from "../store/slices/general-slice";

const ReactGridLayout = WidthProvider(RGL);

export interface FormPreviewProps extends CoreProps {
  items?: number;
  cols?: number;
  onLayoutChange?: (layout: Layout[]) => void;
  layout: Layout[];
  setLayout: React.Dispatch<React.SetStateAction<Layout[]>>;
}

type DroppableEvent = Event & {
  dataTransfer: DataTransfer;
};

function FormPreview(props: FormPreviewProps) {
  const { layout, setLayout } = props;
  const [mounted, setMounted] = useState(false);

  const droppedItem = useAppSelector((state) => state.general.droppedItem);
  const stateDroppedIte = { ...droppedItem };
  const cols = useAppSelector((state) => state.general.cols);
  const preview = useAppSelector((state) => state.general.preview);
  const dispatch = useAppDispatch();

  const { generateUniqueID } = createIDGenerator();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const lmap = layout.map((layoutItem) => {
      if (cols < layoutItem.w) return { ...layoutItem, w: cols };
      return layoutItem;
    });
    setLayout(lmap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols]);

  function onLayoutChange(Newlayout: Layout[]) {
    const filteredLayout = Newlayout.filter((item) => item.i !== "placeholder");
    setLayout(filteredLayout);
  }

  const onDrop = (
    _: Layout[],
    layoutItem: RGL.Layout,
    e: DroppableEvent
  ): void => {
    const droppedItemText = e.dataTransfer.getData("text/plain");
    const droppedItem = JSON.parse(droppedItemText);
    const id = generateUniqueID(droppedItem.name);

    dispatch(
      setFieldDialogOpen({
        open: true,
        id: id,
        callback: () => {
          const newItem = {
            ...layoutItem,
            ...droppedItem,
            i: id,
            y: layoutItem.y,
            x: layout.length * 2,
            w: cols,
          };
          setLayout((prev) => arrangeLayout([...prev, newItem]));
        },
      })
    );
  };

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    dispatch(setPreviewFormData(data))
  }

  return (
    <Card className="min-h-[24rem] mx-auto w-full max-w-2xl">
      {preview && (
        <div className="py-2 px-4 text-sm font-medium w-full -mt-1 rounded-full bg-indigo-100 text-indigo-500">
          Preview mode on
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <ReactGridLayout
          onDrop={onDrop}
          useCSSTransforms={mounted}
          droppingItem={{ i: "placeholder", w: cols, ...stateDroppedIte }}
          {...props}
          onLayoutChange={onLayoutChange}
          isResizable={!preview}
          isDroppable={mounted && !preview}
          isBounded={preview}
        >
          {GenerateDOM({ layout, setLayout })}
        </ReactGridLayout>
      </form>
      {!layout?.length && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 -mt-6 pointer-events-none">
          <Lottie animationData={preview ? PreviewLottie : DragLottie} />
          <p className="text-center -mt-6 text-xs">
            {preview
              ? "There is no form element to preview"
              : "Drap and drop items here"}
          </p>
        </div>
      )}
    </Card>
  );
}

export default FormPreview;
