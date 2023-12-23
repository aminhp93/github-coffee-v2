import CloseIcon from "@mui/icons-material/Close";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { v4 as uuidv4 } from "uuid";
import useDashboardStore from "./Dashboard.store";
import {
  Widget,
  WidgetId,
  Dashboard as DashboardModel,
  WidgetType,
} from "./Dashboard.types";
import GridItem from "./GridItem";
import { getItems, getWidgetComponent } from "./Dashboard.utils";

//// @ts-expect-error Import remote module
// import Dialog from "widgets/Dialog";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const editMode = useDashboardStore((state) => state.editMode);
  const setEditMode = useDashboardStore((state) => state.setEditMode);
  const [dashboard, setDashboard] = useState<DashboardModel>();
  const [layouts, setLayouts] = useState<ReactGridLayout.Layouts>({});
  const [breakpoint, setBreakpoint] = useState<{
    breakpoint: string;
    cols: number;
  }>();
  const [items, setItems] = useState<Widget[]>([]);
  const widgetsRef = useRef<Record<WidgetId, Widget>>({});

  useEffect(() => {
    const fetchedDashboard = JSON.parse(
      localStorage.getItem("dashboard") ?? "null"
    ) as DashboardModel; //fetch dashboard
    if (fetchedDashboard) {
      const layouts = fetchedDashboard.content.layouts;
      const widgets = fetchedDashboard.content.widgets;
      setDashboard(fetchedDashboard);
      setLayouts(layouts);
      setItems(getItems(layouts, widgets));
      widgetsRef.current = _.keyBy(widgets, "i");
    }
  }, []);

  const handleLayoutChange = (
    _: ReactGridLayout.Layout[],
    allLayout: ReactGridLayout.Layouts
  ) => {
    setLayouts(allLayout);
  };

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint: string, cols: number) => {
    setBreakpoint({ breakpoint, cols });
  };

  const handleSaveDashboard = () => {
    const widgets = Object.values(widgetsRef.current).map(
      ({ i, type, config }) => ({ i, type, config })
    );
    const newDashboard = {
      ...dashboard,
      content: { layouts, widgets: widgets },
    };
    localStorage.setItem("dashboard", JSON.stringify(newDashboard));
  };

  const handleChangeConfig = (widget: Widget) => {
    widgetsRef.current[widget.i] = widget;
  };

  const createElement = (el: Widget) => {
    const widgetComponent = getWidgetComponent(el.type);
    const C = React.cloneElement(widgetComponent, {
      id: el.i,
      onChangeConfig: handleChangeConfig,
      config: el.config,
    });

    return (
      <div key={el.i} data-grid={el}>
        <CloseIcon
          className="close-grid-item"
          onClick={() => onRemoveItem(el)}
        />
        <GridItem>{C}</GridItem>
      </div>
    );
  };

  const onRemoveItem = (el: Widget) => {
    if (editMode) {
      setItems(_.reject(items, { i: el.i }));
      delete widgetsRef.current[el.i];
    }
  };

  const onAddWidget = (widgetType: WidgetType) => {
    if (editMode) {
      const newItem = {
        i: uuidv4(),
        x: (items.length * 2) % (breakpoint?.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 4,
        h: 8,
        type: widgetType,
        config: {},
      };
      const newItems = items.concat(newItem);
      setItems(newItems);
      widgetsRef.current[newItem.i] = newItem;
    }
  };

  return (
    <DashboardBox
      sx={{
        ".react-grid-item:hover .close-grid-item": {
          display: editMode ? "block" : "none",
        },
      }}
    >
      <Button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Edit" : "View"}
      </Button>
      <Button onClick={() => onAddWidget("plot")}>Add Widget</Button>
      <Button onClick={handleSaveDashboard}>Save Dashboard</Button>
      <ResponsiveReactGridLayout
        className="layout"
        layouts={layouts}
        isResizable={editMode}
        // isBounded={true}
        // rowHeight={50}
        // measureBeforeMount={true}
        onLayoutChange={handleLayoutChange}
        isDraggable={editMode}
        draggableHandle=".drag-handle"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        resizeHandles={["se", "ne", "nw", "sw"]}
        onBreakpointChange={onBreakpointChange}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
      >
        {_.map(items, (el) => createElement(el))}
      </ResponsiveReactGridLayout>
    </DashboardBox>
  );
};

export default Dashboard;

const DashboardBox = styled(Box)(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.default,
    height: "100%",
    width: "100%",
    ".close-grid-item": {
      display: "none",
    },
    ".react-grid-item:hover .close-grid-item": {
      display: "block",
      position: "absolute",
      right: "-21px",
      top: "-12px",
      fontSize: "24px",
      marginRight: "10px",
      background: "#44405E",
      borderRadius: "50%",
      cursor: "pointer",
      border: "1px solid #44405E",
      zIndex: 9999,
    },
  };
});
