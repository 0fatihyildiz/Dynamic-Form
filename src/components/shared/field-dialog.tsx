import {
  Button,
  Dialog,
  Flex,
  TextField,
  Text,
  Select,
} from "@radix-ui/themes";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  setFieldDialogOpen,
  setLayoutProps,
} from "../../store/slices/general-slice";
import { createIDGenerator, extractCurrentValues } from "../../utils";
import { FORM_COMPONENTS_PROPS } from "../../constants";
import { FormElement } from "./form-generator";

function FieldDialog() {
  const dispatch = useAppDispatch();
  const layoutProps = useAppSelector((state) => state.general.layoutProps);
  const fieldDialog = useAppSelector((state) => state.general.fieldDialog);
  const { open, id, callback } = fieldDialog;
  const { resolveUniqueID } = createIDGenerator();

  const [componentName]: [FormElement, string] = resolveUniqueID(id);
  const fieldProps = Object.assign({}, FORM_COMPONENTS_PROPS[componentName]);

  function handleInputChange({
    name,
    value,
  }: {
    name: keyof typeof fieldProps;
    value: never;
  }) {
    if (
      typeof fieldProps[name] === "object" &&
      "values" in (fieldProps[name] as object)
    ) {
      (fieldProps[name] as { current: string }).current = value;
    } else {
      (fieldProps[name] as string) = value;
    }
  }

  function handleSave() {
    dispatch(
      setLayoutProps(
        Object.assign({}, layoutProps, {
          [id]: extractCurrentValues(fieldProps as never),
        })
      )
    );
    callback(fieldProps);
    dispatch(setFieldDialogOpen({ ...fieldDialog, open: false }));
  }

  function handleClose() {
    dispatch(setFieldDialogOpen({ ...fieldDialog, open: false }));
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Add Form Element</Dialog.Title>
        <form>
          <Flex direction="column" gap="3">
            {fieldProps &&
              Object.entries(fieldProps).map((item, idx) => {
                return (
                  <label key={idx}>
                    <Text
                      as="div"
                      className="capitalize"
                      size="2"
                      mb="1"
                      weight="bold"
                    >
                      {item[0]}
                    </Text>
                    {typeof item[1] === "string" ? (
                      <TextField.Input
                        defaultValue={item[1]}
                        name={item[0]}
                        placeholder={
                          item[0].charAt(0).toUpperCase() + item[0].slice(1)
                        }
                        onChange={(e) => handleInputChange(e.target as never)}
                      />
                    ) : (
                      <Select.Root
                        onValueChange={(value) =>
                          handleInputChange({ name: item[0], value } as never)
                        }
                        defaultValue={item[1].current || item[1].values[0]}
                      >
                        <Select.Trigger
                          className="w-full capitalize"
                          name={item[0]}
                          placeholder={
                            item[0].charAt(0).toUpperCase() + item[0].slice(1)
                          }
                        />
                        <Select.Content>
                          <Select.Group>
                            {item[1].values.map(
                              (option: string, idx: number) => {
                                return (
                                  <Select.Item
                                    className="capitalize"
                                    key={idx}
                                    value={option}
                                  >
                                    {option}
                                  </Select.Item>
                                );
                              }
                            )}
                          </Select.Group>
                        </Select.Content>
                      </Select.Root>
                    )}
                  </label>
                );
              })}
          </Flex>
        </form>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button onClick={handleClose} variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button type="submit" onClick={handleSave}>
              Add
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default FieldDialog;
