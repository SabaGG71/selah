"use client"

import { useEffect } from "react"

// Dev only: ?ink=oxblood or ?ink=slate swaps the interface colour for the other two lookbook inks,
// so Kent and Jonny can compare them on the real page. Blue is the default and needs no param.
export function InkPreview() {
  useEffect(() => {
    const ink = new URLSearchParams(window.location.search).get("ink")
    if (ink === "oxblood" || ink === "slate") document.documentElement.dataset.ink = ink
  }, [])
  return null
}
