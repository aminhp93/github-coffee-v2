import type { Meta } from "@storybook/react";

import Dialog from "../../../@core/components/dialog/Dialog";
import DialogTemplate from "./DialogTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Dialog",
  component: Dialog,
} as Meta<typeof Dialog>;

export const DialogStory = DialogTemplate.bind({});
