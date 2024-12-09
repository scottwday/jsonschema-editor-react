import { StoryObj, Meta } from "@storybook/react";
import JsonSchemaEditor from "..";
import { readOnlyData, printIt } from "./helper";

export default {
  title: "Example/SchemaEditor",
  component: JsonSchemaEditor,
} as Meta;

type Story = StoryObj<typeof JsonSchemaEditor>;

export const NewJsonSchema: Story = {};

export const WithData: Story = {
  args: {
    data: readOnlyData,
    onSchemaChange: (r) => {
      printIt(r);
    },
  },
};
