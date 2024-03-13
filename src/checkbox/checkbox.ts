import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/*
 * Scaffold Checkbox
 * Handle FormControl
 * Scaffold Indicator
 */

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

  render() {
    return html`<div>
      <button
        type="button"
        role="checkbox"
        aria-checked=${isIndeterminate(this._checked) ? "mixed" : this._checked}
        aria-required=${this.required}
        data-state=${getState(this._checked)}
        data-disabled=${this.disabled ? "" : undefined}
        disabled=${this.disabled}
        value=${this.value}
      >
        <slot></slot>
      </button>
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "checkbox-root": CheckboxRoot;
  }
}

@customElement("checkbox-indicator")
export class CheckboxIndicator extends LitElement {
  render() {
    return html`<div>
      <span
        data-state=${getState(true)} // todo
        data-disabled=false
        style="pointerEvents: 'none'"
      >
        <slot></slot>
      </span>
    </div> `;
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
