"use client"

import "./serve-map.css"

import type * as Leaflet from "leaflet"
import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react"
import { getImageProps } from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

import { milesBetween, ring } from "@/lib/geo"
import type { ServeArea } from "@/lib/site"
import { cn } from "@/lib/utils"

type Row = ServeArea["places"][number] & { miles: number; band: number }
type Box = { x: number; y: number; w: number; h: number }
type Side = "right" | "left" | "top" | "bottom"

// Keyless OpenStreetMap tiles (no API key). The licence asks for the credit, shown on the map.
const TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"

/*
  The map's palette, by brightness. OpenStreetMap's colours are mapped onto
  Selah's warm paper: land to the page's ground, forests and water a shade
  deeper, roads lighter, and OpenStreetMap's own names to faint greys, so the
  street map reads as part of the page and only the pin, the rings and the
  city labels speak. Applied as an SVG filter on the tile pane.
*/
const TONE: [number, string][] = [
  [0, "#cbc6bc"],
  [0.45, "#d2cdc4"],
  [0.7, "#dcd8cf"],
  [0.84, "#e6e3dc"],
  [0.92, "#eeebe5"],
  [0.97, "#f3f1ec"],
  [1, "#f9f8f5"],
]
const toneTable = (channel: number, steps = 40) => {
  const rgb = (hex: string) => parseInt(hex.slice(1 + channel * 2, 3 + channel * 2), 16) / 255
  return Array.from({ length: steps + 1 }, (_, s) => {
    const v = s / steps
    let k = 0
    while (k < TONE.length - 2 && v > TONE[k + 1][0]) k++
    const [a, from] = TONE[k]
    const [b, to] = TONE[k + 1]
    const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
    return (rgb(from) + (rgb(to) - rgb(from)) * t).toFixed(3)
  }).join(" ")
}

const INK = "#111111"
// Washes the map out past the last ring, and a little between the rings.
const WASH = "#f7f5f1"
const SVG_NS = "http://www.w3.org/2000/svg"
// A fine paper grain over the streets, so the map reads as printed. Set inline: no url() in CSS files here.
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.42 0 0 0 0 0.39 0 0 0 0 0.35 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const SIDES: Side[] = ["right", "left", "top", "bottom"]
// A city label's distance from its dot (matches .serve-name in serve-map.css).
const GAP = 11
const hit = (a: Box, b: Box) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h
const around = (x: number, y: number, side: Side, w: number, h: number): Box => {
  if (side === "right") return { x: x + GAP, y: y - h / 2, w, h }
  if (side === "left") return { x: x - GAP - w, y: y - h / 2, w, h }
  if (side === "top") return { x: x - w / 2, y: y - GAP - h, w, h }
  return { x: x - w / 2, y: y + GAP, w, h }
}
const grow = (b: Box, by: number): Box => ({ x: b.x - by, y: b.y - by, w: b.w + by * 2, h: b.h + by * 2 })
const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!)

/*
  A ring that starts due south and runs clockwise, so its top, where the
  ring's name is set along it, sits in the middle of the line and the name
  reads upright.
*/
const southRing = (centre: { lat: number; lng: number }, miles: number, steps = 180) => {
  const pts = ring(centre, miles, steps).slice(0, steps)
  const turned = [...pts.slice(steps / 2), ...pts.slice(0, steps / 2)]
  return [...turned, turned[0]]
}
// Where each ring's name would like to sit along it (0.5 is due north), and how far it may slide to find room.
const NAME_AT = [0.57, 0.445, 0.53]
const SLIDE = [0.04, -0.04, 0.08, -0.08, 0.12, -0.12, 0.16, -0.16, 0.2, -0.2]

// The base's pin (52 by 66, tip at the bottom). The head's centre sits 38px above the tip.
const PIN_HEAD = { y: -38, r: 22 }
const PIN_PATH = "M26 64C26 64 4 44.5 4 26a22 22 0 1 1 44 0c0 18.5-22 38-22 38Z"
// Selah's official palm favicon, copied unchanged from src/app/icon.png.
const PALM = "/images/brand/selah-coffee-palm-icon.png"

/*
  Where Selah serves, on a wide street map in a ruled frame: the base in
  Denver marked with Selah's own pin, a tinted, dotted ring and a dashed one,
  each named along its curve, and every city on a white label that opens its
  page. The cities are listed nearest first with their distance, on the paper
  at the map's left on wide screens and under it on smaller ones; pointing at
  one draws the line to it from Denver.

  Leaflet and the tiles only load as the map nears the screen. The wheel and,
  on phones, one-finger drags are left to the page, so the map never traps a
  scroll. Nothing animates in: the map is simply there (LE rule 6).
*/
export function ServeMap({ area, footer, className }: { area: ServeArea; footer?: ReactNode; className?: string }) {
  const host = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  // The corner marks, the buttons and the credit, which labels must keep clear of.
  const corner = useRef<HTMLDivElement>(null)
  const buttons = useRef<HTMLDivElement>(null)
  const credit = useRef<HTMLParagraphElement>(null)
  const zoomIn = useRef<HTMLButtonElement>(null)
  const api = useRef<{ zoom: (by: number) => void; reset: () => void; show: (i: number | null) => void } | null>(null)

  const [peek, setPeek] = useState<number | null>(null)
  const [moved, setMoved] = useState(false)
  const [ready, setReady] = useState(false)
  const [scale, setScale] = useState<{ miles: number; px: number } | null>(null)

  const rings = useMemo(() => [...area.rings].sort((a, b) => a.miles - b.miles), [area.rings])
  const rows = useMemo<Row[]>(
    () =>
      area.places
        .map((p) => {
          const miles = milesBetween(area.base, p)
          const band = rings.findIndex((r) => miles <= r.miles)
          return { ...p, miles, band: band === -1 ? rings.length : band }
        })
        .sort((a, b) => a.miles - b.miles),
    [area.places, area.base, rings],
  )
  const groups = useMemo(
    () =>
      Array.from({ length: rings.length + 1 }, (_, band) => ({
        band,
        label: rings[band]?.label ?? area.beyond,
        range:
          band === 0
            ? `within ${rings[0].miles} mi`
            : band < rings.length
              ? `${rings[band - 1].miles} to ${rings[band].miles} mi`
              : `over ${rings[rings.length - 1].miles} mi`,
        items: rows.map((r, i) => ({ r, i })).filter(({ r }) => r.band === band),
      })).filter((g) => g.items.length),
    [rings, rows, area.beyond],
  )
  const tables = useMemo(() => [0, 1, 2].map((c) => toneTable(c)), [])
  const palm = useMemo(() => {
    const { src, srcSet } = getImageProps({ src: PALM, alt: "", width: 34, height: 34 }).props
    return { src, srcSet }
  }, [])

  useEffect(() => {
    const el = host.current
    if (!el) return
    let map: Leaflet.Map | undefined
    let cancelled = false
    // `auto` while the map moves itself; `away` once the visitor has zoomed or panned.
    let auto = false
    let away = false
    // A drag that starts on a city label moves the map; it must not also open the city's page.
    let dragged = false
    const cleanups: (() => void)[] = []

    // How much of the map's left the city list covers (from xl, where it sits on the map).
    const covered = () => {
      const p = panel.current
      return p && window.matchMedia("(min-width: 80rem)").matches ? p.offsetWidth : 0
    }

    const init = async () => {
      const mod = await import("leaflet")
      const L = (mod as unknown as { default?: typeof Leaflet }).default ?? mod
      if (cancelled || !el) return
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const blue = getComputedStyle(el).getPropertyValue("--action").trim() || "#142fb8"
      const base = L.latLng(area.base.lat, area.base.lng)

      map = L.map(el, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        // One-finger drags scroll the page on phones; pinching still zooms the map.
        dragging: !L.Browser.mobile,
        boxZoom: false,
        // Any zoom, so the last ring fits the frame exactly.
        zoomSnap: 0,
        zoomDelta: 0.75,
        maxZoom: 15,
        fadeAnimation: !reduced,
        zoomAnimation: !reduced,
        markerZoomAnimation: !reduced,
        inertia: !reduced,
      })
      const m = map
      // The list after the map is the readable version; the labels drawn on the map would only repeat it.
      for (const pane of ["overlayPane", "markerPane"]) m.getPane(pane)?.setAttribute("aria-hidden", "true")
      // OpenStreetMap's colours, re-toned onto the paper by the filter rendered with the map.
      const tilePane = m.getPane("tilePane")
      if (tilePane) tilePane.style.filter = "url(#serve-tone)"
      // A first view, so the layers below are drawn as they're added (fit() sets the real one).
      m.setView(base, 9, { animate: false })
      L.tileLayer(TILES, { maxZoom: 19 }).addTo(m)

      // Past the last ring the map is washed out, between the rings a little; the nearest ring is tinted blue.
      const far = rings[rings.length - 1].miles
      const { lat, lng } = area.base
      const world: [number, number][] = [
        [lat - 14, lng - 20],
        [lat - 14, lng + 20],
        [lat + 14, lng + 20],
        [lat + 14, lng - 20],
      ]
      L.polygon([world, ring(area.base, far)], { stroke: false, fillColor: WASH, fillOpacity: 0.6, interactive: false }).addTo(m)
      rings.slice(1).forEach((r, k) => {
        L.polygon([ring(area.base, r.miles), ring(area.base, rings[k].miles)], {
          stroke: false,
          fillColor: WASH,
          fillOpacity: (0.26 * (k + 1)) / (rings.length - 1),
          interactive: false,
        }).addTo(m)
      })
      L.polygon(ring(area.base, rings[0].miles), { stroke: false, fillColor: blue, fillOpacity: 0.05, interactive: false }).addTo(m)

      // Each ring as a dotted or dashed ink line, with its name set along it.
      const names = rings.map((r, k) => {
        const points = southRing(area.base, r.miles)
        L.polyline(points, {
          color: INK,
          weight: k === 0 ? 1.6 : 1,
          opacity: k === 0 ? 0.62 : 0.42,
          dashArray: k === 0 ? "0.1 5" : "6 6",
          lineCap: k === 0 ? "round" : "butt",
          interactive: false,
        }).addTo(m)
        // The name follows an invisible, unclipped copy of the ring, so it always starts due south and
        // its top stays the top, however the map is zoomed or dragged.
        const guide = L.polyline(points, { noClip: true, stroke: false, fill: false, interactive: false }).addTo(m)
        const path = guide.getElement() as SVGPathElement | undefined
        if (!path?.parentNode) return null
        path.id = `serve-ring-${k}`
        const text = document.createElementNS(SVG_NS, "text")
        text.setAttribute("class", "serve-ring-name")
        const along = document.createElementNS(SVG_NS, "textPath")
        along.setAttribute("href", `#${path.id}`)
        along.setAttribute("text-anchor", "middle")
        text.appendChild(along)
        path.parentNode.appendChild(text)
        return { text, along, full: `${r.label} · ${r.miles} mi`, short: `${r.miles} mi` }
      })

      // The base, with Selah's pin and name.
      const home = L.marker(base, {
        icon: L.divIcon({
          className: "serve-place serve-home",
          html:
            `<span class="serve-dot"></span>` +
            `<span class="serve-pin" aria-hidden="true"><svg viewBox="0 0 52 66"><path class="serve-pin-drop" d="${PIN_PATH}"/>` +
            `<circle class="serve-pin-disc" cx="26" cy="26" r="17.5"/></svg>` +
            `<img src="${escape(palm.src)}"${palm.srcSet ? ` srcset="${escape(palm.srcSet)}"` : ""} width="34" height="34" alt="" draggable="false"></span>` +
            `<span class="serve-name"><b>Selah Coffee</b> | ${escape(area.base.name)}</span>`,
          iconSize: [0, 0],
        }),
        interactive: false,
        keyboard: false,
        zIndexOffset: 1000,
      }).addTo(m)

      // Every city: a dot and a white label that opens its page; pointing at it draws the line from Denver.
      const marks = rows.map((r, i) => {
        const mk = L.marker([r.lat, r.lng], {
          icon: L.divIcon({
            className: "serve-place",
            html:
              `<a class="serve-link" href="${escape(r.href)}" tabindex="-1" draggable="false">` +
              `<span class="serve-dot"></span><span class="serve-name">${escape(r.name)}<span class="serve-mi">${Math.round(r.miles)} mi</span></span></a>`,
            iconSize: [0, 0],
          }),
          interactive: false,
          keyboard: false,
        }).addTo(m)
        const link = mk.getElement()?.querySelector("a")
        if (link) {
          link.addEventListener("pointerenter", (e) => {
            if (e.pointerType === "mouse") setPeek(i)
          })
          link.addEventListener("pointerleave", (e) => {
            if (e.pointerType === "mouse") setPeek(null)
          })
          link.addEventListener("click", (e) => {
            if (dragged) e.preventDefault()
          })
        }
        return mk
      })
      m.on("dragstart", () => {
        dragged = true
      })
      const pressed = () => {
        dragged = false
      }
      el.addEventListener("pointerdown", pressed, true)
      cleanups.push(() => el.removeEventListener("pointerdown", pressed, true))

      // A label's size as it is now (the active city's label is longer: it shows its distance).
      const sizeOf = (mk: Leaflet.Marker) => {
        const n = mk.getElement()?.querySelector<HTMLElement>(".serve-name")
        return { w: n?.offsetWidth ?? 80, h: n?.offsetHeight ?? 22 }
      }
      let active: number | null = null

      /*
        Who gets a dot and a label, in this order: the base's pin; the active
        city's label, which must show; every other city's dot, unless it would
        crowd one already shown (it stays in the list); the base's name beside
        the pin's head; the rings' names along the rings; then the cities'
        labels, right, left, above or below their dots. Nothing overlaps,
        nothing sits on the list or under the controls, and a label that
        doesn't fit is left off.
      */
      const layout = () => {
        const size = m.getSize()
        const box = el.getBoundingClientRect()
        const left = covered() + 8
        // The compass and scale at the top right, the buttons and credit at the bottom right.
        const blocked = [corner.current, buttons.current, credit.current].flatMap((n): Box[] => {
          const r = n?.getBoundingClientRect()
          return r && r.width ? [{ x: r.left - box.left - 4, y: r.top - box.top - 4, w: r.width + 8, h: r.height + 8 }] : []
        })
        const inside = (b: Box) =>
          b.x >= left && b.y >= 4 && b.x + b.w <= size.x - 6 && b.y + b.h <= size.y - 6 && !blocked.some((k) => hit(k, b))
        const at = (ll: Leaflet.LatLngExpression) => m.latLngToContainerPoint(ll)
        const hp = at(base)
        const points = rows.map((row) => at([row.lat, row.lng]))

        // The pin's head and its body down to the tip.
        const hy = hp.y + PIN_HEAD.y
        const taken: Box[] = [
          { x: hp.x - PIN_HEAD.r - 2, y: hy - PIN_HEAD.r - 2, w: PIN_HEAD.r * 2 + 4, h: PIN_HEAD.r * 2 + 4 },
          { x: hp.x - 12, y: hy + PIN_HEAD.r - 2, w: 24, h: hp.y - (hy + PIN_HEAD.r) + 8 },
        ]
        const free = (b: Box) => inside(b) && !taken.some((t) => hit(t, grow(b, 3)))

        // The pin's tip and head, as dots other cities' dots keep clear of.
        const dots = [
          { x: hp.x, y: hp.y, r: 10 },
          { x: hp.x, y: hy, r: PIN_HEAD.r + 2 },
        ]

        // The active city's label first, where it fits, else to the right of its dot.
        let named: Box | null = null
        if (active !== null) {
          const node = marks[active].getElement()
          const { w, h } = sizeOf(marks[active])
          const p = points[active]
          const side = SIDES.find((s) => free(around(p.x, p.y, s, w, h))) ?? "right"
          named = around(p.x, p.y, side, w, h)
          taken.push(named, { x: p.x - 6, y: p.y - 6, w: 12, h: 12 })
          dots.push({ x: p.x, y: p.y, r: 6 })
          if (node) node.dataset.side = side
        }

        rows.forEach((_, i) => {
          const p = points[i]
          const on =
            i === active ||
            (dots.every((d) => Math.hypot(d.x - p.x, d.y - p.y) >= d.r + 8) &&
              !(named && hit(named, { x: p.x - 8, y: p.y - 8, w: 16, h: 16 })))
          if (on && i !== active) {
            dots.push({ x: p.x, y: p.y, r: 6 })
            taken.push({ x: p.x - 6, y: p.y - 6, w: 12, h: 12 })
          }
          marks[i].getElement()?.toggleAttribute("data-off", !on)
        })

        // The base's name, beside the pin's head, where it fits; the list's legend names it either way.
        const homeNode = home.getElement()
        const hs = sizeOf(home)
        const homeBoxes: Record<Side, Box> = {
          right: { x: hp.x + 30, y: hy - hs.h / 2, w: hs.w, h: hs.h },
          left: { x: hp.x - 30 - hs.w, y: hy - hs.h / 2, w: hs.w, h: hs.h },
          top: { x: hp.x - hs.w / 2, y: hp.y - 72 - hs.h, w: hs.w, h: hs.h },
          bottom: { x: hp.x - hs.w / 2, y: hp.y + 10, w: hs.w, h: hs.h },
        }
        const homeSide = SIDES.find((s) => free(homeBoxes[s]))
        if (homeSide) taken.push(homeBoxes[homeSide])
        if (homeNode) homeNode.dataset.side = homeSide ?? "none"

        /*
          Each ring's name looks for room along the top of its ring: just outside
          the line, then just inside it, then shortened to its distance. Each
          letter is tested on its own (a curved name's box is mostly empty), and
          a spot where the name would stand up on its side is refused.
        */
        const glyphs = (t: SVGTextElement): Box[] => {
          const ctm = t.getScreenCTM()
          const out: Box[] = []
          if (!ctm) return out
          for (let i = 0; i < t.getNumberOfChars(); i++) {
            let e: DOMRect
            try {
              e = t.getExtentOfChar(i)
            } catch {
              continue
            }
            if (!e.width) continue
            const c = [
              [e.x, e.y],
              [e.x + e.width, e.y],
              [e.x, e.y + e.height],
              [e.x + e.width, e.y + e.height],
            ].map(([x, y]) => new DOMPoint(x, y).matrixTransform(ctm))
            const xs = c.map((q) => q.x)
            const ys = c.map((q) => q.y)
            out.push({
              x: Math.min(...xs) - box.left,
              y: Math.min(...ys) - box.top,
              w: Math.max(...xs) - Math.min(...xs),
              h: Math.max(...ys) - Math.min(...ys),
            })
          }
          return out
        }
        const upright = (t: SVGTextElement) => {
          const n = t.getNumberOfChars()
          if (!n) return false
          try {
            return [0, Math.floor(n / 2), n - 1].every((i) => Math.abs(t.getRotationOfChar(i)) <= 62)
          } catch {
            return true
          }
        }
        names.forEach((name, k) => {
          if (!name) return
          const { text, along } = name
          const first = NAME_AT[k] ?? 0.5
          const tries = [first, ...SLIDE.map((d) => first + d)].filter((o) => o > 0.27 && o < 0.73)
          let spot: Box[] | null = null
          search: for (const words of [name.full, name.short]) {
            along.textContent = words
            for (const dy of ["-7", "15"]) {
              text.setAttribute("dy", dy)
              for (const o of tries) {
                along.setAttribute("startOffset", `${(o * 100).toFixed(1)}%`)
                const g = glyphs(text)
                if (g.length && upright(text) && g.every(free)) {
                  spot = g
                  break search
                }
              }
            }
          }
          text.toggleAttribute("data-off", !spot)
          if (spot) taken.push(...spot)
        })

        // Every other city's label.
        rows.forEach((_, i) => {
          if (i === active) return
          const node = marks[i].getElement()
          if (!node) return
          if (node.hasAttribute("data-off")) {
            node.dataset.side = "none"
            return
          }
          const { w, h } = sizeOf(marks[i])
          const side = SIDES.find((s) => free(around(points[i].x, points[i].y, s, w, h)))
          if (side) taken.push(around(points[i].x, points[i].y, side, w, h))
          node.dataset.side = side ?? "none"
        })
      }

      // The scale bar: the longest round distance that stays within 120 pixels.
      const measureScale = () => {
        const size = m.getSize()
        const y = size.y / 2
        const x = size.x / 2
        const metres = m.distance(m.containerPointToLatLng([x, y]), m.containerPointToLatLng([x + 100, y]))
        const milesPerPx = metres / 100 / 1609.344
        if (!milesPerPx) return
        const miles = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100].filter((n) => n / milesPerPx <= 120).pop() ?? 0.1
        setScale({ miles, px: Math.round(miles / milesPerPx) })
      }

      /*
        The resting view: the whole service area, beside the list on wide screens.
        How far out one may zoom and how far one may pan are set from it each time,
        so the resting view itself never trips them.
      */
      const fit = (animate: boolean) => {
        const size = m.getSize()
        const pad = Math.round(Math.min(size.x, size.y) * 0.075)
        // Phones: the cities and the nearest ring, so Boulder clears the pin. Wider maps show the whole outer ring.
        const cities = (list: Row[]) => list.map((row) => [row.lat, row.lng] as [number, number])
        const bounds = L.latLngBounds(
          size.x < 640
            ? [...ring(area.base, rings[0].miles, 36), ...cities(rows)]
            : [...ring(area.base, far, 36), ...cities(rows.filter((row) => row.band >= rings.length))],
        )
        const topLeft = L.point(covered() + pad, pad)
        const bottomRight = L.point(pad + 24, pad)
        auto = true
        // Set directly: setMinZoom() would queue a zoom of its own that lands after the fit.
        m.options.minZoom = Math.max(1, m.getBoundsZoom(bounds, false, topLeft.add(bottomRight)) - 0.75)
        m.setMaxBounds(bounds.pad(2))
        m.fitBounds(bounds, { paddingTopLeft: topLeft, paddingBottomRight: bottomRight, animate: animate && !reduced })
        if (!animate || reduced) auto = false
      }
      fit(false)

      m.on("movestart", () => {
        if (auto) return
        away = true
        setMoved(true)
      })
      m.on("moveend", () => {
        auto = false
        layout()
      })
      m.on("zoomend", measureScale)
      layout()
      measureScale()
      // Labels are measured, so place them again once the font is in.
      document.fonts?.ready.then(() => {
        if (!cancelled) layout()
      })

      let route: Leaflet.Polyline | undefined
      api.current = {
        // Around the middle of the map that shows, not the middle under the list.
        zoom: (by) => {
          const s = m.getSize()
          const c = covered()
          const z = Math.min(m.getMaxZoom(), Math.max(m.getMinZoom(), m.getZoom() + by))
          m.setZoomAround(L.point(c + (s.x - c) / 2, s.y / 2), z, { animate: !reduced })
        },
        reset: () => {
          away = false
          setMoved(false)
          fit(true)
        },
        // Draw the line from Denver to a city; the city's label gains its distance.
        show: (i) => {
          route?.remove()
          active = i
          marks.forEach((mk, k) => {
            mk.getElement()?.classList.toggle("is-active", k === i)
            mk.setZIndexOffset(k === i ? 900 : 0)
          })
          layout()
          if (i === null) return
          const r = rows[i]
          route = L.polyline([base, [r.lat, r.lng]], { className: "serve-route", color: blue, weight: 2, opacity: 0.95, interactive: false }).addTo(m)
          route.getElement()?.setAttribute("pathLength", "1")
        },
      }

      // A new size re-fits the resting view, unless the visitor has moved the map.
      const ro = new ResizeObserver(() => {
        m.invalidateSize({ pan: false })
        if (!away) fit(false)
        layout()
        measureScale()
      })
      ro.observe(el)
      cleanups.push(() => ro.disconnect())
      setReady(true)
    }

    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          near.disconnect()
          init()
        }
      },
      { rootMargin: "600px 0px" },
    )
    near.observe(el)

    return () => {
      cancelled = true
      near.disconnect()
      cleanups.forEach((c) => c())
      api.current = null
      map?.remove()
    }
  }, [area, rings, rows, palm])

  useEffect(() => {
    if (ready) api.current?.show(peek)
  }, [peek, ready])

  return (
    <div className={cn("relative xl:grid", className)}>
      {/* The tones for the tiles, set on the map's tile pane. */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="serve-tone" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues={tables[0]} />
            <feFuncG type="table" tableValues={tables[1]} />
            <feFuncB type="table" tableValues={tables[2]} />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* The map, in a frame ruled like the rest of the page. */}
      <div className="relative isolate h-[min(62svh,26rem)] min-h-80 overflow-hidden rounded-[2px] border border-rule bg-[#efece6] has-[.serve-map:focus-visible]:outline-2 has-[.serve-map:focus-visible]:outline-offset-2 has-[.serve-map:focus-visible]:outline-action sm:h-[min(64svh,34rem)] xl:[grid-area:1/1] xl:h-auto xl:min-h-[max(34rem,min(70svh,42rem))]">
        {/* Isolated, so Leaflet's own layers stay under the paper, the corner marks and the buttons. */}
        <div
          ref={host}
          role="region"
          aria-label={`Map of the area Selah Coffee serves around ${area.base.name}`}
          className="serve-map absolute inset-0 isolate"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply"
          style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
        />
        {/* The paper the city list sits on, wide screens only. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(44rem,56%)] bg-[linear-gradient(90deg,rgb(240_237_231/0.97)_0%,rgb(240_237_231/0.95)_52%,rgb(240_237_231/0.6)_72%,transparent)] xl:block"
        />

        {/* North and the scale, like a printed map's corner. */}
        <div ref={corner} aria-hidden className="pointer-events-none absolute top-4 right-4 flex flex-col items-end gap-2.5 sm:top-5 sm:right-5">
          <span className="flex flex-col items-center gap-0.5 text-[0.625rem] font-medium tracking-[0.14em] text-ink/70">
            N
            <svg viewBox="0 0 10 14" className="h-3.5 w-2.5">
              <path d="M5 0 9.5 14 5 11 0.5 14Z" fill="currentColor" />
            </svg>
          </span>
          {scale && (
            <span className="flex flex-col items-end gap-1 text-[0.625rem] font-medium tracking-widest text-ink/70 uppercase tabular-nums">
              {scale.miles} mi
              <span className="block h-1.5 border-x border-b border-ink/55" style={{ width: scale.px }} />
            </span>
          )}
        </div>

        <div ref={buttons} className="absolute right-4 bottom-9 flex flex-col items-center gap-2 sm:right-5 sm:bottom-10">
          <button
            type="button"
            aria-label="Back to the whole area"
            onClick={(e) => {
              // The button goes inert once the map is back; keep keyboard focus nearby.
              if (document.activeElement === e.currentTarget) zoomIn.current?.focus()
              api.current?.reset()
            }}
            inert={!moved}
            className={cn(
              control,
              "rounded-[2px] border border-rule bg-paper transition-[opacity,translate,background-color,color] duration-300",
              moved ? "opacity-100" : "pointer-events-none translate-y-1 opacity-0",
            )}
          >
            <RotateCcwIcon aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
          </button>
          <div className="flex flex-col overflow-hidden rounded-[2px] border border-rule bg-paper">
            <button ref={zoomIn} type="button" aria-label="Zoom in" disabled={!ready} onClick={() => api.current?.zoom(1)} className={control}>
              <PlusIcon aria-hidden="true" className="size-4" strokeWidth={1.5} />
            </button>
            <span aria-hidden className="h-px bg-rule" />
            <button type="button" aria-label="Zoom out" disabled={!ready} onClick={() => api.current?.zoom(-1)} className={control}>
              <MinusIcon aria-hidden="true" className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <p
          ref={credit}
          className="absolute right-4 bottom-2.5 text-[0.625rem] text-ink-muted [text-shadow:0_0_3px_#f0ede7,0_0_6px_#f0ede7] sm:right-5"
        >
          ©{" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
            OpenStreetMap
          </a>{" "}
          contributors
        </p>
      </div>

      {/* The cities, nearest first: the map's legend, and the list a reader can scan. On wide screens it sits on the map's paper. */}
      <div
        ref={panel}
        className="mt-8 xl:relative xl:mt-0 xl:flex xl:w-[min(28rem,34%)] xl:flex-col xl:justify-center xl:py-10 xl:pr-4 xl:pl-10 xl:[grid-area:1/1]"
      >
        <p className="flex items-center gap-3 text-[0.9375rem] text-ink">
          <span aria-hidden className="relative h-6 w-5 shrink-0">
            <svg viewBox="0 0 52 66" className="absolute inset-0 size-full overflow-visible drop-shadow-[0_2px_3px_rgb(17_17_17/0.25)]">
              <path d={PIN_PATH} className="fill-action stroke-paper stroke-[2.5]" />
              <circle cx="26" cy="26" r="9" className="fill-paper" />
            </svg>
          </span>
          <span>
            Based in{" "}
            <Link href={area.base.href} className="underline decoration-1 underline-offset-4 hover:text-action-hover">
              {area.base.name}
            </Link>
          </span>
        </p>

        <div className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2 xl:grid-cols-1 xl:gap-y-6">
          {groups.map((g) => (
            <div key={g.band}>
              <p className="flex items-center gap-2.5 text-ui text-ink">
                <RingKey band={g.band} of={rings.length} />
                <span>{g.label}</span>
                <span aria-hidden className="text-ink/30">
                  ·
                </span>
                <span className="text-ink-muted tabular-nums">{g.range}</span>
              </p>
              <ul className="mt-2.5 border-t border-rule">
                {g.items.map(({ r, i }) => (
                  <li key={r.name}>
                    <Link
                      href={r.href}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setPeek(i)}
                      onPointerLeave={(e) => e.pointerType === "mouse" && setPeek(null)}
                      onFocus={() => setPeek(i)}
                      onBlur={() => setPeek(null)}
                      className={cn(
                        "group/row flex w-full items-baseline gap-2.5 border-b border-rule/15 py-2 hover:text-action-hover",
                        peek === i && "[&_[data-lead]]:border-ink/55 [&_[data-name]]:underline",
                      )}
                    >
                      <span
                        data-name
                        className="min-w-0 truncate font-serif text-[1.25rem] leading-7 tracking-[-0.01em] decoration-1 underline-offset-4 group-hover/row:underline"
                      >
                        {r.name}
                      </span>
                      <span
                        data-lead
                        aria-hidden
                        className="min-w-3 flex-1 translate-y-[-0.3em] border-b border-dotted border-ink/25 transition-colors duration-200 group-hover/row:border-ink/55"
                      />
                      <span className="shrink-0 text-ui text-ink-muted tabular-nums">{Math.round(r.miles)}&nbsp;mi</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {footer}
      </div>
    </div>
  )
}

const control =
  "grid size-10 place-items-center text-action transition-colors duration-200 hover:bg-action hover:text-on-action focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-action disabled:opacity-40"

// The little ring beside each group, drawn like its ring on the map.
function RingKey({ band, of }: { band: number; of: number }) {
  const beyond = band >= of
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-ink">
      <circle
        cx="8"
        cy="8"
        r="6.25"
        fill={band === 0 ? "color-mix(in oklab, var(--action) 12%, transparent)" : "none"}
        stroke="currentColor"
        strokeWidth={band === 0 ? 1.6 : 1.1}
        strokeLinecap={band === 0 ? "round" : "butt"}
        strokeDasharray={beyond ? undefined : band === 0 ? "0.05 3" : "2.6 2"}
        opacity={beyond ? 0.25 : band === 0 ? 0.75 : 0.55}
      />
    </svg>
  )
}
