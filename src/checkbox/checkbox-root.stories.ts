import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";
import "./checkbox";
import "../icons/check-icon";

const meta: Meta = {
  title: "Example/Checkbox",
  tags: ["autodocs"],
  render: () =>
    html`<checkbox-root defaultChecked>
      <checkox-indicator>
        <check-icon />
        <p>Hello</p>
      </checkox-indicator>
    </checkbox-root>`,
  args: {},
};

export default meta;

export const DefaultCheckbox: StoryObj = {
  name: "Default",
  args: {},
};
