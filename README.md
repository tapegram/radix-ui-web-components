# radix-ui web-components

This project is an attempt at porting over radix-ui primitives into web-components.

The motivation is primarily that I would like to have access to radix-ui and eventually shadcn in htmx projects written, as much as possible, in non-js languages -- specifically Rust and Unison.

This is also a chance for me to get more comfortable with more intense front-end work, since I spend most of my time on the back-end.

## Implementation

After some trial and error, I'm going with using [Lit](https://lit.dev/docs/) as a tool for making web-components easier. I was initially planning on doing this in vanilla JS, but based on my googling, it seems like the community is kind of directing people towards Lit (including Vite and Storybook, which also had web-component config options that basically defaulted to Lit).

## References

- [Radix](https://www.radix-ui.com/)
- [Vite](https://vitejs.dev/)
- [Lit](https://lit.dev/)
- [Storybook](https://storybook.js.org/)

## Notes

### Dialog

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

### Toasters

Some toaster discussions https://discord.com/channels/1012791295170859069/1148353983610638417/1148694902515978260
