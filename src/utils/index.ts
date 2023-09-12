import { Layout } from "react-grid-layout";
import { FormElement } from "../components/shared/form-generator";
import { FormComponentProps } from "../constants";

interface ExtractObject {
  [key: string]: string | FormComponentProps;
}

function arrangeLayout(layout: Layout[]): Layout[] {
  const sortedLayout = layout.sort((a, b) => {
    const numA = parseInt(a.i.split("_")[1]);
    const numB = parseInt(b.i.split("_")[1]);

    return numB - numA;
  });

  return sortedLayout;
}

let counter = 0;

function createIDGenerator() {
  function generateUniqueID(componentName: string): string {
    const uniqueID = `${componentName}_${counter}`;
    counter++;

    return uniqueID;
  }

  function resolveUniqueID(uniqueID: string): [FormElement, string] {
    const [componentName, id] = uniqueID.split("_");
    return [componentName as FormElement, id];
  }

  return {
    generateUniqueID,
    resolveUniqueID,
  };
}

function extractCurrentValues(obj: FormComponentProps): ExtractObject {
  const result: ExtractObject = {};

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && key !== "values") {
      result[key] = obj[key as never]["current"] || "";
    } else
      result[key] = obj[key as never]
  }

  return result;
}

export { arrangeLayout, createIDGenerator, extractCurrentValues };
