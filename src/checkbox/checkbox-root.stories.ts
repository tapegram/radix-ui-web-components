import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";
import "./checkbox";
import "../icons/check-icon";
import "./example-styles/example.css";
import { CheckboxIndicator, CheckboxRoot } from "./checkbox";

CheckboxIndicator.register();
CheckboxRoot.register();

const meta: Meta = {
  title: "Example/Checkbox",
  tags: ["autodocs"],
  render: () => html`
    <form>
      <div style="display:flex; align-items:center;">
        <checkbox-root class="CheckboxRoot" defaultChecked id="c1">
          <checkbox-indicator class="CheckboxIndicator">
            <check-icon />
          </checkbox-indicator>
        </checkbox-root>
        <label class="Label" htmlFor="c1"> Accept terms and conditions </label>
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
