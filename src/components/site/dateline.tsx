"use client"

import { useSyncExternalStore } from "react"
import { site } from "@/lib/site"

// A live dateline in Denver time (lookbook rule "Real datelines, flat labels").
// The date only exists in the browser, so the server render leaves the slots empty
// and there is no hydration mismatch or prerender clock access.

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000)
  return () => window.clearInterval(id)
}
const getMinute = () => Math.floor(Date.now() / 60_000)
const getServerMinute = () => null

function denverParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return { weekday: get("weekday"), month: get("month"), day: get("day"), year: get("year") }
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export function Dateline() {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute)
  const now = minute === null ? null : new Date(minute * 60_000)
  const d = now ? denverParts(now) : null
  const nextMonth = d ? MONTHS[(MONTHS.indexOf(d.month) + 1) % 12] : null

  return (
    <p className="flex h-full items-center justify-center gap-2.5 whitespace-nowrap sm:gap-3.5">
      <span>{site.city}</span>
      <Rule />
      <span className="min-w-[9.5ch] sm:min-w-[24ch]">
        {d ? (
          <>
            <span className="sm:hidden">
              {d.weekday.slice(0, 3)}, {d.month.slice(0, 3)} {d.day}
            </span>
            <span className="hidden sm:inline">
              {d.weekday}, {d.month} {d.day}, {d.year}
            </span>
          </>
        ) : null}
      </span>
      <Rule />
      <span className="min-w-[15ch]">{nextMonth ? `Now booking ${nextMonth}` : null}</span>
    </p>
  )
}

function Rule() {
  return <span aria-hidden="true" className="h-3 w-px bg-current opacity-40" />
}
