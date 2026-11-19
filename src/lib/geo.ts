/* Small geography helpers for the service-area map. Distances are in miles. */

export type Spot = { lat: number; lng: number }

const EARTH = 3958.8
const rad = (d: number) => (d * Math.PI) / 180
const deg = (r: number) => (r * 180) / Math.PI

/** The straight-line distance between two places, as the crow flies. */
export function milesBetween(a: Spot, b: Spot) {
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH * Math.asin(Math.min(1, Math.sqrt(h)))
}

/** The point `miles` away from `from`, heading `bearing` degrees clockwise from north. */
export function travel(from: Spot, miles: number, bearing: number): [number, number] {
  const d = miles / EARTH
  const t = rad(bearing)
  const p1 = rad(from.lat)
  const l1 = rad(from.lng)
  const p2 = Math.asin(Math.sin(p1) * Math.cos(d) + Math.cos(p1) * Math.sin(d) * Math.cos(t))
  const l2 = l1 + Math.atan2(Math.sin(t) * Math.sin(d) * Math.cos(p1), Math.cos(d) - Math.sin(p1) * Math.sin(p2))
  return [deg(p2), deg(l2)]
}

/** A ring `miles` around `centre`, starting due north and running clockwise, closed. */
export function ring(centre: Spot, miles: number, steps = 180): [number, number][] {
  return Array.from({ length: steps + 1 }, (_, i) => travel(centre, miles, (i / steps) * 360))
}
