import { useEffect, useState } from "react";
import RGL, { WidthProvider, Layout, CoreProps } from "react-grid-layout";
import { Card } from "@radix-ui/themes";
import { arrangeLayout, createIDGenerator } from "../utils";
import { GenerateDOM } from "./shared/generate-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setLayout as setLayoutRedux } from "../store/slices/general-slice";

const ReactGridLayout = WidthProvider(RGL);

export interface FormPreviewProps extends CoreProps {
  items?: number;
  cols?: number;
  onLayoutChange?: (layout: Layout[]) => void;
}

type DroppableEvent = Event & {
  dataTransfer: DataTransfer;
};

function FormPreview(props: FormPreviewProps) {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [mounted, setMounted] = useState(false);
  const droppedItem = useAppSelector((state) => state.general.droppedItem);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  function onLayoutChange(Newlayout: Layout[]) {
    const filteredLayout = Newlayout.filter((item) => item.i !== 'placeholder')
    setLayout(filteredLayout)
    dispatch(setLayoutRedux(layout));
  }

  const onDrop = (
    _: RGL.Layout[],
    layoutItem: RGL.Layout,
    e: DroppableEvent
  ): void => {
    const droppedItemText = e.dataTransfer.getData("text/plain");
    const droppedItem = JSON.parse(droppedItemText);

    const newItem = {
      ...layoutItem,
      ...droppedItem,
      i: createIDGenerator().generateUniqueID(droppedItem.name),
      y: layoutItem.y,
      x: layout.length * 2,
    };

    setLayout((prev) => arrangeLayout([...prev, newItem]));
  };
  return (
    <Card className="flex-shrink-0 max-w-xl min-h-[24rem] mx-auto w-full">
      <ReactGridLayout
        layout={layout}
        onDrop={onDrop}
        useCSSTransforms={mounted}
        isDroppable={mounted}
        droppingItem={{ i: "placeholder", ...droppedItem}}
        {...props}
        onLayoutChange={onLayoutChange}
      >
        {GenerateDOM({ layout, setLayout })}
      </ReactGridLayout>
    </Card>
  );
}

export default FormPreview;
