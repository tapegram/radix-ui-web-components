import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";
import "./checkbox";
import "../icons/check-icon";
import "./example-styles/example.css";

const meta: Meta = {
  title: "Example/Checkbox",
  tags: ["autodocs"],
  render: () => html`
    <form>
      <div style="display: flex; alignItems: center;">
        <checkbox-root class="CheckboxRoot" defaultChecked id="c1">
          <checkbox-indicator class="CheckboxIndicator">
            <check-icon />
          </checkbox-indicator>
        </checkbox-root>
        <label className="Label" htmlFor="c1">
          Accept terms and conditions
        </label>
      </div>
    </form>
  `,
  args: {},
};

export default meta;

export const DefaultCheckbox: StoryObj = {
  name: "Default",
  args: {},
};
