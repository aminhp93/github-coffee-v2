import type { Meta, StoryObj } from "@storybook/react";

import Tree from "../../../@core/components/tree/Tree";
import * as argTypes from "./Tree.types";
import SampleData from "./sample_data.json";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Tree",
  component: Tree,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes,
} as Meta<typeof Tree>;

type Story = StoryObj<typeof Tree>;

export const TreeStory: Story = {
  args: {
    initTreeData: SampleData,
    enableCheckbox: false,
  },
};

export const TreeStory2: Story = {
  args: {
    initTreeData: SampleData,
    enableCheckbox: true,
  },
};
