import { createCn } from "cn/config"

// Class merger that knows Selah's custom type sizes (globals.css @theme), so text-caps, text-ui,
// text-body and text-display count as font sizes and are not dropped next to a colour like text-ink.
export const cn = createCn({
  extend: { classGroups: { "font-size": [{ text: ["caps", "ui", "body", "display"] }] } },
})
