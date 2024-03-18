import { consume, provide } from "@lit/context";
import { createContext } from "@lit/context";
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

/*
 * Scaffold Checkbox
 * Handle FormControl
 * Scaffold Indicator
 */

export const checkboxContext = createContext<CheckboxContext>(
  Symbol("checkbox-context"),
);

type CheckboxContext = {
  state: CheckedState;
  disabled: boolean;
};

@customElement("checkbox-root")
export class CheckboxRoot extends LitElement {
  @property()
  _checked: CheckedState = false;

  @property()
  required: boolean | null = false;

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
    console.log("Logging root");
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
    console.log("handleClick");
    this._checked = !!!this._checked;
    console.log(this._context);
    this._context = { state: this._checked, disabled: this.disabled };
    console.log(this._checked);
    console.log(this.disabled);
    console.log("/handleClick");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "checkbox-root": CheckboxRoot;
  }
}

@customElement("checkbox-indicator")
export class CheckboxIndicator extends LitElement {
  @consume({ context: checkboxContext, subscribe: true })
  _checkboxState?: CheckboxContext;

  render() {
    console.log("render checkbox indicator");
    const data = this._checkboxState!;
    console.log(data);
    console.log(isIndeterminate(data.state));
    console.log(data.state);
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
