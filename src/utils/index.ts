import { Layout } from "react-grid-layout";

function arrangeLayout(layout: Layout[]): Layout[] {

  const sortedLayout = [...layout].sort((a, b) => {
    const numA = parseInt(a.i.split("_")[1]);
    const numB = parseInt(b.i.split("_")[1]);
    return numA - numB;
  });

  let currentY = 0;
  let maxHeight = 0;

  for (const layoutItem of sortedLayout) {
    if (layoutItem.h > maxHeight) {
      maxHeight = layoutItem.h;
    }

    if (currentY + layoutItem.h > maxHeight) {
      currentY = 0;
    }
  }

  return sortedLayout;
}

export { arrangeLayout };
