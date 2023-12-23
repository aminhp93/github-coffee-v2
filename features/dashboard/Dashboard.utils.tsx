import { v4 as uuidv4 } from "uuid";
import { Widget, WidgetType } from "./Dashboard.types";
// import { getComponent } from "./Dashboard";
// import { ComponentKey } from "./Dashboard.types";
import _ from "lodash";

export const generateComponentKey = (componentKey: string) => {
  return uuidv4() + "__" + componentKey;
};

export const parseComponentKey = (key: string) => {
  const widgetType = key.split("__");
  if (widgetType.length > 0) {
    return widgetType[widgetType.length - 1];
  }
  // const regex = /(?<=__)\w+/g;
  // const match = key.match(regex);
  // if (match) {
  //   return match[0];
  // }
  return null;
};
export const getItems = (
  layouts: ReactGridLayout.Layouts,
  widgets: Widget[]
): Widget[] => {
  if (layouts && layouts["lg"]) {
    const widgetsDict = _.keyBy(widgets, "i");
    return layouts["lg"].map((item) => {
      const widget = widgetsDict[item.i];
      return {
        ...widget,
        x: (layouts["lg"].length * 2) % 12,
        y: Infinity, // puts it at the bottom
        w: 4,
        h: 10,
      };
    });
  } else {
    return [];
  }
};

export const getWidgetComponent = (widgetType: WidgetType) => {
  switch (widgetType) {
    case "plot":
    case "station":
    case "station-summary":
    case "map":
    case "vessel":
    case "power-origin":
    case "diagram":
    case "vessel-overview":
    case "profit-margin":
      return <div>widget</div>;
  }
};
