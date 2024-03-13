import { ContextConsumer } from "@lit/context";
import { ContextProvider, createContext } from "@lit/context";
import { LitElement, css, html } from "lit";
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

  private _provider = new ContextProvider(this, {
    context: checkboxContext,
    initialValue: { state: getState(this._checked), disabled: this.disabled },
  });

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
  private _checkboxState = new ContextConsumer(this, {
    context: checkboxContext,
  });
  render() {
    const data = this._checkboxState.value!;
    return html`<div>
      ${isIndeterminate(data.state) || data.state === true
        ? html`
            <span
              data-state=${data.state}
              data-disabled=${data.disabled}
              style="pointerEvents: 'none'"
            >
              <slot></slot>
            </span>
          `
        : html``}
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
