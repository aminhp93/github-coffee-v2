export type LegacyItem = {
  name: string;
  property: string;
  href: string;
  subItem?: LegacyItem[];
};

export const MOCK_LEGACY_ITEM: LegacyItem[] = [
  {
    name: "Home",
    property: "home",
    href: "/",
  },
  {
    name: "Alarm Statistics",
    property: "alarmStatistics",
    href: "",
  },
  {
    name: "Settings",
    property: "settings",
    href: "",
    subItem: [
      {
        name: "Language",
        property: "language",
        href: "",
      },
      {
        name: "Network",
        property: "network",
        href: "",
      },
      {
        name: "About",
        property: "about",
        href: "",
      },
    ],
  },
  {
    name: "Tag Manager",
    property: "tagManager",
    href: "",
    subItem: [
      {
        name: "Topology view",
        property: "topologyView",
        href: "",
      },
      {
        name: "Tag hierarchy",
        property: "tagHierarchy",
        href: "",
      },
      {
        name: "System tags",
        property: "systemTags",
        href: "",
      },
    ],
  },
  {
    name: "Views",
    property: "views",
    href: "",
    subItem: [
      {
        name: "Themes",
        property: "theme",
        href: "",
      },
      {
        name: "Item Base View",
        property: "editor",
        href: "/view/123",
      },
      {
        name: "Widget Base View",
        property: "dashboard",
        href: "/dashboard",
      },
    ],
  },
  {
    name: "Tool",
    property: "tool",
    href: "",
    subItem: [
      {
        name: "Mass Editor",
        property: "massEditor",
        href: "",
      },
    ],
  },
  {
    name: "Calendar",
    property: "calendar",
    href: "",
    subItem: [
      {
        name: "BACnet Global Schedule",
        property: "bacnetGlobalSchedule",
        href: "",
      },
    ],
  },
];
