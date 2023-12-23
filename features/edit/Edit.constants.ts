// @ts-expect-error Import remote module
import remotePropertySymbols from "property/symbols";

export const GEOMETRY = remotePropertySymbols?.symbols?.GEOMETRY;

export const TEST_ITEM = {
  id: "Circle",
  deprecated: false,
  component: {
    compare: null,
    itemSetup: {
      id: "Circle",
      name: "Circle",
      icon: "radio_button_unchecked",
      properties: {
        transform: {
          label: "Transform",
          value: {
            show: true,
            anchor: "center",
            x: 0,
            y: 0,
            z: 5,
            scale: 1,
            rotation: 0,
          },
        },
        geometry: {
          type: GEOMETRY,
          label: "Geometry",
          value: {
            width: 40,
            height: null,
          },
        },
        style: {
          label: "Style",
          value: {
            color: "#2196f3",
            border: false,
            itemStyle: null,
            boxShadow: null,
            borderThickness: 1,
            borderStyle: null,
            borderColor: "#9CCCCD",
            borderRadius: null,
          },
        },
        dataSources: {
          label: "Data source",
          config: {
            value: {
              label: "Source",
              options: {
                types: [
                  "OBJECT_VALUE",
                  "OBJECT_PROPERTY",
                  "VARIABLE",
                  "AGGREGATION",
                  "CALCULATION",
                  "TEMPLATE",
                  "METADATA",
                ],
              },
            },
          },
          value: {},
        },
        matrix: {
          label: "Matrix",
          config: {
            dmf: {
              label: "Value",
              headers: [
                {
                  text: "Threshold",
                  value: "threshold",
                  type: "number",
                  sortable: false,
                },
                {
                  text: "Text",
                  value: "text",
                  type: "text",
                  sortable: false,
                },
                {
                  text: "Text Color",
                  value: "textColor",
                  type: "color",
                  sortable: false,
                },
                {
                  text: "Background Color",
                  value: "backgroundColor",
                  sortable: false,
                  type: "color",
                },
              ],
              value: {
                data: [],
              },
            },
          },
          value: {
            dmf: {
              data: [],
            },
          },
        },
        settings: {
          label: "Settings",
          config: {
            opacity: {
              label: "Opacity",
              min: 0,
              max: 100,
              value: 100,
            },
            dashBarLength: {
              label: "Bar length",
              min: 0,
              max: 100,
              value: 15,
            },
            dashSpaceLength: {
              label: "Space length",
              min: 0,
              max: 100,
              value: 0,
            },
            linecap: {
              label: "Border style",
              options: {
                butt: "None",
                round: "Round",
                square: "Square",
              },
              value: "round",
            },
          },
          value: {
            opacity: 100,
            dashBarLength: 15,
            dashSpaceLength: 0,
            linecap: "round",
          },
        },
      },
    },
  },
  name: "Circle",
  properties: {
    transform: {
      label: "Transform",
      value: {
        show: true,
        anchor: "center",
        x: 0,
        y: 0,
        z: 5,
        scale: 1,
        rotation: 0,
      },
    },
    geometry: {
      label: "Geometry",
      type: GEOMETRY,
      value: {
        width: 40,
        height: null,
      },
    },
    style: {
      label: "Style",
      value: {
        color: "#2196f3",
        border: false,
        itemStyle: null,
        boxShadow: null,
        borderThickness: 1,
        borderStyle: null,
        borderColor: "#9CCCCD",
        borderRadius: null,
      },
    },
    dataSources: {
      label: "Data source",
      config: {
        value: {
          label: "Source",
          options: {
            types: [
              "OBJECT_VALUE",
              "OBJECT_PROPERTY",
              "VARIABLE",
              "AGGREGATION",
              "CALCULATION",
              "TEMPLATE",
              "METADATA",
            ],
          },
        },
      },
      value: {},
    },
    matrix: {
      label: "Matrix",
      config: {
        dmf: {
          label: "Value",
          headers: [
            {
              text: "Threshold",
              value: "threshold",
              type: "number",
              sortable: false,
            },
            {
              text: "Text",
              value: "text",
              type: "text",
              sortable: false,
            },
            {
              text: "Text Color",
              value: "textColor",
              type: "color",
              sortable: false,
            },
            {
              text: "Background Color",
              value: "backgroundColor",
              sortable: false,
              type: "color",
            },
          ],
          value: {
            data: [],
          },
        },
      },
      value: {
        dmf: {
          data: [],
        },
      },
    },
    settings: {
      label: "Settings",
      config: {
        opacity: {
          label: "Opacity",
          min: 0,
          max: 100,
          value: 100,
        },
        dashBarLength: {
          label: "Bar length",
          min: 0,
          max: 100,
          value: 15,
        },
        dashSpaceLength: {
          label: "Space length",
          min: 0,
          max: 100,
          value: 0,
        },
        linecap: {
          label: "Border style",
          options: {
            butt: "None",
            round: "Round",
            square: "Square",
          },
          value: "round",
        },
      },
      value: {
        opacity: 100,
        dashBarLength: 15,
        dashSpaceLength: 0,
        linecap: "round",
      },
    },
  },
};
export const TEST = {
  data: {},
  instance:
    '{"uuid":"0557fa12-2973-4921-bbef-8301328237ae","chainId":"9ec5464b-bf8e-42ae-b740-7cc95a5f9e3b","type":"pv","itemId":"893e9a32-4247-4fa3-98f6-bfa82801d558"}',
  id: "Circle",
  properties: {
    transform: {
      anchor: "center",
      rotation: 0,
      scale: 1,
      show: true,
      x: 180,
      y: 140,
      z: 1,
    },
    geometry: {
      width: 40,
    },
    style: {
      border: false,
      borderColor: "#9CCCCD",
      borderThickness: 1,
      color: "#2196f3",
    },
    dataSources: {},
    matrix: {
      dmf: {
        data: [],
      },
    },
    settings: {
      opacity: 100,
      dashBarLength: 15,
      dashSpaceLength: 0,
      linecap: "round",
    },
  },
  isMultiSelect: false,
  item: TEST_ITEM,
};
