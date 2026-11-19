"use client"

import { useEffect, useRef, useState } from "react"

// Selah's live quote form (Cortado Pro), embedded exactly as hosted, so every lead keeps landing in
// Selah's Cortado pipeline. The form talks to this page with postMessage:
//   form -> page  {type:"cortado-form", payload:{action:"ready" | "resize"(height) | "step-change"(step,totalSteps)
//                                                 | "submit-success"(redirectUrl?) | "conversion"(...)}}
//   page -> form  {type:"attribution", data:{utm_*, gclid, fbclid, referrer_url, landing_page_url}}
// The frame takes the height the form reports, so there is never an inner scrollbar.
// Never submit this form in tests: a submission is a real lead for Selah.

export const CORTADO_ORIGIN = "https://form.cortado.pro"
export const CORTADO_FORM_URL = `${CORTADO_ORIGIN}/041b3fd9-7e1b-4320-881d-83c792648f74`

const ATTRIBUTION_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]
const LANDING_KEY = "selah:landing_page_url"

type FormMessage = {
  type: "cortado-form"
  payload: { action: string; height?: number; step?: number; totalSteps?: number; redirectUrl?: string }
}

function isFormMessage(data: unknown): data is FormMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as { type?: unknown }).type === "cortado-form" &&
    typeof (data as { payload?: unknown }).payload === "object"
  )
}

function attribution() {
  const data: Record<string, string> = {}
  try {
    const params = new URLSearchParams(window.location.search)
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key)
      if (value) data[key] = value
    }
    if (document.referrer) data.referrer_url = document.referrer
    let landing = window.location.href
    try {
      landing = sessionStorage.getItem(LANDING_KEY) ?? landing
    } catch {}
    data.landing_page_url = landing
  } catch {}
  return data
}

export function CortadoForm({ title = "Selah Coffee Co. quote request form" }: { title?: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  // First-step height the live form reports (640px desktop, 632px phone on 2026-11-18), so the
  // page does not jump when the real height arrives.
  const [height, setHeight] = useState(640)

  useEffect(() => {
    // Remember the first page of the visit, so the lead shows where the visitor landed.
    try {
      if (!sessionStorage.getItem(LANDING_KEY)) sessionStorage.setItem(LANDING_KEY, window.location.href)
    } catch {}

    function onMessage(event: MessageEvent) {
      if (event.origin !== CORTADO_ORIGIN || event.source !== frame.current?.contentWindow) return
      if (!isFormMessage(event.data)) return
      const { action, height: h, redirectUrl } = event.data.payload

      if (action === "ready") {
        frame.current?.contentWindow?.postMessage({ type: "attribution", data: attribution() }, CORTADO_ORIGIN)
      } else if (action === "resize" && typeof h === "number" && h > 0) {
        setHeight(Math.ceil(h))
      } else if (action === "step-change") {
        // Keep the top of the form in view when a step changes length.
        const top = frame.current?.getBoundingClientRect().top ?? 0
        if (top < 0) frame.current?.scrollIntoView({ block: "start" })
      } else if (action === "submit-success" && typeof redirectUrl === "string") {
        try {
          const url = new URL(redirectUrl)
          if (url.protocol === "https:") window.location.assign(url.href)
        } catch {}
      }
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return (
    <iframe
      ref={frame}
      src={CORTADO_FORM_URL}
      title={title}
      loading="lazy"
      style={{ height }}
      className="block w-full border-0 bg-transparent"
    />
  )
}
