import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";
import "./modal-dialog";
import { ModalDialogRoot } from "./modal-dialog";

ModalDialogRoot.register();

const meta: Meta = {
  title: "Example/ModalDialog",
  tags: ["autodocs"],
  render: () => html` <modal-dialog-root></modal-dialog-root> `,
  args: {},
};

export default meta;

export const DefaultModalDialog: StoryObj = {
  name: "Empty",
  args: {},
};
