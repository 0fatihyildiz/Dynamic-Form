import FormGenerator, { FormElement } from "../shared/form-generator";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import _ from "lodash";
import { Layout } from "react-grid-layout";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { setFieldDialogOpen } from "../../store/slices/general-slice";

interface Props {
  layout: Layout[];
  setLayout: (value: React.SetStateAction<Layout[]>) => void;
}

function GenerateDOM({ layout, setLayout }: Props) {
  const dispatch = useAppDispatch();
  const layoutProps = useAppSelector((state) => state.general.layoutProps);
  const fieldDialog = useAppSelector((state) => state.general.fieldDialog);
  const preview = useAppSelector((state) => state.general.preview);

  function onDeleteClick(i: string) {
    setLayout(_.reject(layout, { i }));
  }

  function handleFieldEdit(id: string) {
    dispatch(setFieldDialogOpen({ ...fieldDialog, id, open: true }));
  }

  return _.map(layout, function (l) {
    const componentName = l.i.split("_")[0] as FormElement;
    return (
      <div
        key={l.i}
        data-grid={l}
        className={` ${
          !preview &&
          "group ring-2 ring-offset-2 hover:ring-blue-400 active:ring-blue-400"
        } rounded-sm ring-transparent`}
      >
        <div
          className={`${
            !preview
              ? "group-hover:scale-100 group-hover:opacity-100"
              : "pointer-events-none"
          } shadow-sm border border-zinc-200 space-x-0.5 transition-all scale-75 opacity-0 rounded-md bg-white p-1 z-10 absolute -top-2 -right-2`}
        >
          <IconButton
            color="gray"
            variant="soft"
            size={"1"}
            onClick={() => handleFieldEdit(l.i)}
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
        <FormGenerator
          name={componentName}
          props={layoutProps[l.i]}
          preview={preview}
        />
      </div>
    );
  });
}
export { GenerateDOM };
