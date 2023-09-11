import { Layout } from "react-grid-layout";

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

  function resolveUniqueID(uniqueID: string): [string, string] {
    const [componentName, id] = uniqueID.split("_");
    return [componentName, id];
  }

  return {
    generateUniqueID,
    resolveUniqueID,
  };
}


export { arrangeLayout, createIDGenerator };
