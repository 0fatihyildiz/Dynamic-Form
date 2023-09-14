import React, { useEffect, useState } from "react";
import RGL, { WidthProvider, Layout, CoreProps } from "react-grid-layout";
import { Card } from "@radix-ui/themes";
import { arrangeLayout, createIDGenerator } from "../utils";
import { GenerateDOM } from "./shared/generate-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import Lottie from "lottie-react";
import DragLottie from "../assets/lottie/drag.json";
import { setFieldDialogOpen } from "../store/slices/general-slice";

const ReactGridLayout = WidthProvider(RGL);

export interface FormPreviewProps extends CoreProps {
  items?: number;
  cols?: number;
  onLayoutChange?: (layout: Layout[]) => void;
  layout: Layout[]
  setLayout: React.Dispatch<React.SetStateAction<Layout[]>>
}

type DroppableEvent = Event & {
  dataTransfer: DataTransfer;
};

function FormPreview(props: FormPreviewProps) {
  const { layout, setLayout } = props
  const [mounted, setMounted] = useState(false);

  const droppedItem = useAppSelector((state) => state.general.droppedItem);
  const stateDroppedIte = { ...droppedItem };
  const cols = useAppSelector((state) => state.general.cols);
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
        id,
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
  return (
    <Card className="flex-shrink-0 max-w-xl min-h-[24rem] mx-auto w-full">
      <ReactGridLayout
        onDrop={onDrop}
        useCSSTransforms={mounted}
        isDroppable={mounted}
        droppingItem={{ i: "placeholder", w: cols, ...stateDroppedIte }}
        {...props}
        onLayoutChange={onLayoutChange}
      >
        {GenerateDOM({ layout, setLayout })}
      </ReactGridLayout>
      {!layout?.length && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 -mt-6 pointer-events-none">
          <Lottie animationData={DragLottie} />
          <p className="text-center -mt-12 text-xs">Drap and drop items here</p>
        </div>
      )}
    </Card>
  );
}

export default FormPreview;
