import { useEffect, useState } from "react";
import _ from "lodash";
import RGL, { WidthProvider, Layout, CoreProps } from "react-grid-layout";
import { Card } from "@radix-ui/themes";
import FormGenerator, { FormProps } from "./form-generator";

const ReactGridLayout = WidthProvider(RGL);

export interface FormPreviewProps extends CoreProps {
  items?: number;
  cols?: number;
  onLayoutChange?: (layout: Layout[]) => void;
}

type DroppableEvent = Event & {
  dataTransfer: DataTransfer;
};

type DroppableLayout = RGL.Layout & {
  name: FormProps["name"];
};

function FormPreview(props: FormPreviewProps) {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function generateDOM() {
    return _.map(layout, function (l) {
      return (
        <div key={l.i} data-grid={l} className="bg-gray-100 hover:bg-zinc-200">
          <FormGenerator name={(l as DroppableLayout).name} />
        </div>
      );
    });
  }

  function onLayoutChange(layout: Layout[]) {
    props.onLayoutChange?.(layout);
    console.log(layout);
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
      name: droppedItem.name,
      minW: droppedItem.minW,
      maxH: droppedItem.maxH,
      isBounded: true,
    };
    setLayout((prevLayout) => [...prevLayout, newItem]);
  };

  return (
    <Card className="flex-shrink-0 max-w-xl min-h-[24rem] mx-auto w-full">
      <ReactGridLayout
        layout={layout}
        onLayoutChange={onLayoutChange}
        onDrop={onDrop}
        droppingItem={{ i: layout.length.toString(), w: 2, h: 2 }}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        isDroppable={true}
        {...props}
      >
        {generateDOM()}
      </ReactGridLayout>
    </Card>
  );
}

export default FormPreview;
