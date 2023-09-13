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
import { FORM_COMPONENTS_PROPS, FormComponentProps } from "../../constants";
import { FormElement } from "./form-generator";
import { FormEvent, useEffect, useState } from "react";

function FieldDialog() {
  const dispatch = useAppDispatch();
  const layoutProps = useAppSelector((state) => state.general.layoutProps);
  const fieldDialog = useAppSelector((state) => state.general.fieldDialog);
  const { open, id, callback } = fieldDialog;
  const { resolveUniqueID } = createIDGenerator();

  const [componentName]: [FormElement, string] = resolveUniqueID(id);
  const fieldProps = Object.assign({}, FORM_COMPONENTS_PROPS[componentName]);

  const [formData, setFormData] = useState({...fieldProps});

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event?.target || event;
    setFormData({ ...formData, [name]: value });
  }

  const isHasKey = layoutProps[id];

  useEffect(() => {
    if (open && isHasKey) setFormData({ ...layoutProps as never[id] });
  }, [id, isHasKey, layoutProps, open]);

  async function handleSave(e: FormEvent) {
    e.preventDefault();

    await dispatch(
      setLayoutProps(
        Object.assign({}, layoutProps, {
          [id]: extractCurrentValues(formData as never),
        })
      )
    );

    if (!isHasKey) callback(fieldProps);
    dispatch(setFieldDialogOpen({ ...fieldDialog, open: false }));
  }

  function handleClose() {
    dispatch(setFieldDialogOpen({ ...fieldDialog, open: false }));
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>
          {isHasKey ? "Edit" : "Add"} {componentName} Element
        </Dialog.Title>
        <form onSubmit={handleSave}>
          <Flex direction="column" gap="3">
            {fieldProps &&
              Object.entries(fieldProps).map((item, idx) => {
                const defaultValue =
                  layoutProps[id] && (layoutProps[id] as never)[item[0]];

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
                        value={formData[item[0] as never]}
                        name={item[0]}
                        placeholder={
                          item[0].charAt(0).toUpperCase() + item[0].slice(1)
                        }
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Select.Root
                        onValueChange={(value) =>
                          handleInputChange({
                            name: item[0],
                            value: { current: value, values: item[1].values },
                          } as never)
                        }
                        defaultValue={defaultValue || item[1].current}
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

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button onClick={handleClose} variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">{isHasKey ? "Edit" : "Add"}</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default FieldDialog;
