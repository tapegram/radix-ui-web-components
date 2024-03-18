import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";
import "./checkbox";
import "../icons/check-icon";

const meta: Meta = {
  title: "Example/Checkbox",
  tags: ["autodocs"],
  render: () => html`
    <style>
      /* reset */
      button {
        all: unset;
      }

      .CheckboxRoot {
        background-color: white;
        width: 25px;
        height: 25px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px var(--black-a7);
      }
      .CheckboxRoot:hover {
        background-color: var(--violet-3);
      }
      .CheckboxRoot:focus {
        box-shadow: 0 0 0 2px black;
      }

      .CheckboxIndicator {
        color: var(--violet-11);
      }

      .Label {
        color: white;
        padding-left: 15px;
        font-size: 15px;
        line-height: 1;
      }
    </style>
    <form>
      <div style="display: flex; alignItems: center;">
        <checkbox-root class="CheckboxRoot" defaultChecked id="c1">
          <checkbox-indicator class="CheckboxIndicator">
            <check-icon />
          </checkbox-indicator>
        </checkbox-root>
        <label className="Label" for="c1"> Accept terms and conditions </label>
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
