/**
 * Examples using the dialog tag
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
 *
 * For later: some toaster discussions https://discord.com/channels/1012791295170859069/1148353983610638417/1148694902515978260
 */

import { LitElement, html } from "lit";
import { addGlobalCSSStyleSheets } from "../global-stylesheet-helper";

export class ModalDialogRoot extends LitElement {
  static register() {
    addGlobalCSSStyleSheets(ModalDialogRoot);
    customElements.define("modal-dialog-root", ModalDialogRoot);
  }

  render() {
    return html`
      <dialog>
        <button autofocus @click=${this.close}>Close</button>
        <p>This modal dialog has a groovy backdrop!</p>
      </dialog>
      <button @click=${this.showModal}>Show the dialog</button>
    `;
  }

  private showModal(_e: Event) {
    const dialog = this.renderRoot.querySelector("dialog");
    dialog?.showModal();
  }

  private close(_e: Event) {
    const dialog = this.renderRoot.querySelector("dialog");
    dialog?.close();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "modal-dialog-root": ModalDialogRoot;
  }
}
