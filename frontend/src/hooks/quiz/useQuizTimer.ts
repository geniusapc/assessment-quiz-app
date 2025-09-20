"use client"

import { useEffect, useState } from "react"

export function useQuizTimer(startTime: number | null, getElapsedTime: () => number) {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (!startTime) return

    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime, getElapsedTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return { elapsedTime, formatTime }
}
