import { useEffect, useState } from "react";
import _ from "lodash";
import RGL, { WidthProvider, Layout, CoreProps } from "react-grid-layout";
import { Card, IconButton } from "@radix-ui/themes";
import FormGenerator, { FormElement } from "./shared/form-generator";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { arrangeLayout } from "../utils";

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
  name: FormElement;
};

function FormPreview(props: FormPreviewProps) {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function generateDOM() {
    return _.map(layout, function (l: DroppableLayout) {
      const componentName = l.i.split("_")[0] as FormElement;
      return (
        <div
          key={l.i}
          data-grid={l}
          className="group ring-2 ring-offset-2 rounded-sm ring-transparent hover:ring-blue-400 active:ring-blue-400"
        >
          <div className="shadow-sm border border-zinc-200 space-x-0.5 transition-all scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 rounded-md bg-white p-1 z-10 absolute -top-2 -right-2">
            <IconButton
              color="gray"
              variant="soft"
              size={"1"}
              className=""
              onClick={() => onDeleteClick(l.i)}
            >
              <Pencil1Icon />
            </IconButton>
            <IconButton
              color="red"
              variant="soft"
              size={"1"}
              className=""
              onClick={() => onDeleteClick(l.i)}
            >
              <TrashIcon />
            </IconButton>
          </div>
          <FormGenerator name={componentName} />
        </div>
      );
    });
  }

  function onDeleteClick(i: string) {
    setLayout(_.reject(layout, { i }));
  }

  function onLayoutChange(Newlayout: Layout[]) {
    props.onLayoutChange?.(Newlayout);

    console.log(Newlayout, "NewLayout", layout, "Layout");
    setLayout(arrangeLayout(layout));
  }

  const onStructureChange = (
    layout: Layout[],
    _oldItem: Layout,
    newItem: Layout
  ) => {
    const updatedLayout = layout.map((item) => {
      if (item.i === newItem.i) {
        return newItem;
      }
      return item;
    });

    setLayout(updatedLayout);
  };

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
      i: `${droppedItem.name}_${layout.length}`,
      y: layoutItem.y,
      x: layout.length * 2,
    };

    console.log(layoutItem.y, "LayoutItem.y");

    delete newItem.name;
    setLayout((prev) => [...prev, newItem]);
  };
  return (
    <Card className="flex-shrink-0 max-w-xl min-h-[24rem] mx-auto w-full">
      <ReactGridLayout
        layout={layout}
        onLayoutChange={onLayoutChange}
        onDrop={onDrop}
        useCSSTransforms={mounted}
        isDroppable={mounted}
        onDragStop={onStructureChange}
        onResizeStop={onStructureChange}
        {...props}
      >
        {generateDOM()}
      </ReactGridLayout>
    </Card>
  );
}

export default FormPreview;
