import { consume, provide } from "@lit/context";
import { createContext } from "@lit/context";
import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { addGlobalCSSStyleSheets } from "../global-stylesheet-helper";

export const checkboxContext = createContext<CheckboxContext>(
  Symbol("checkbox-context"),
);

type CheckboxContext = {
  state: CheckedState;
  disabled: boolean;
};

export class CheckboxRoot extends LitElement {
  static register() {
    addGlobalCSSStyleSheets(CheckboxRoot);
    customElements.define("checkbox-root", CheckboxRoot);
  }

  @property()
  required: boolean | null = false;

  @property()
  defaultChecked: boolean | null = false;

  @property()
  _checked: CheckedState = this.defaultChecked || "indeterminate";

  @property()
  value: string = "on";

  @property()
  disabled: boolean = false;

  @provide({ context: checkboxContext })
  @property()
  _context: CheckboxContext = {
    state: this._checked,
    disabled: this.disabled,
  };

  render() {
    return html`
      <button
        type="button"
        role="checkbox"
        @click="${this.handleClick}"
        aria-checked="${isIndeterminate(this._checked)
          ? "mixed"
          : this._checked}"
        aria-required="${this.required}"
        data-state="${getState(this._checked)}"
        data-disabled="${this.disabled ? "" : undefined}"
        disabled="${this.disabled || nothing}"
        value="${this.value}"
      >
        <slot></slot>
      </button>
    `;
  }

  private handleClick(_e: Event) {
    this._checked = !!!this._checked;
    this._context = { state: this._checked, disabled: this.disabled };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "checkbox-root": CheckboxRoot;
  }
}

export class CheckboxIndicator extends LitElement {
  static register() {
    addGlobalCSSStyleSheets(CheckboxIndicator);
    customElements.define("checkbox-indicator", CheckboxIndicator);
  }

  @consume({ context: checkboxContext, subscribe: true })
  _checkboxState?: CheckboxContext;

  render() {
    return html`
      ${isIndeterminate(this._checkboxState!.state) ||
      this._checkboxState!.state === true
        ? html`
            <span
              data-state=${this._checkboxState!.state}
              data-disabled=${this._checkboxState!.disabled}
              style="pointerEvents: 'none'"
            >
              <slot></slot>
            </span>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "checkbox-indicator": CheckboxIndicator;
  }
}

type CheckedState = boolean | "indeterminate";
function isIndeterminate(checked: CheckedState): checked is "indeterminate" {
  return checked === "indeterminate";
}

function getState(checked: CheckedState) {
  return isIndeterminate(checked)
    ? "indeterminate"
    : checked
      ? "checked"
      : "unchecked";
}
