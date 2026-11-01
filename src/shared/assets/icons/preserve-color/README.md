## Directory Description

- The `shared/assets/icons/preserve-color` directory stores svg icons with colors

- svg icons stored in the `shared/assets/icons` directory will have their `fill` and `stroke` attributes rewritten by the plugin, causing the image's own colors to be lost and inherit the parent element's color instead

## Usage

Icons under the `shared/assets/icons/preserve-color` directory need a `preserve-color/` prefix, like this: `<SvgIcon name="preserve-color/name" />`

Icons under the `shared/assets/icons` directory don't need one, like this: `<SvgIcon name="name" />`
