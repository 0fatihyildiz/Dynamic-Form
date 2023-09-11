import FormGenerator, { FormElement } from "../shared/form-generator";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import _ from "lodash";
import { Layout } from "react-grid-layout";

interface Props {
  layout: Layout[];
  setLayout: (value: React.SetStateAction<Layout[]>) => void;
}

function GenerateDOM({ layout, setLayout }: Props) {
  //   const layout = useAppSelector((state) => state.general.layout);
  //   const dispatch = useAppDispatch();

  function onDeleteClick(i: string) {
    setLayout(_.reject(layout, { i }));
  }

  return _.map(layout, function (l) {
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
export { GenerateDOM };
