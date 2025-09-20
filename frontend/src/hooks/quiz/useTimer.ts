"use client"

import { useState, useEffect, useRef } from "react"

interface UseTimerOptions {
  autoStart?: boolean
  onTick?: (seconds: number) => void
}

export function useTimer(options: UseTimerOptions = {}) {
  const { autoStart = false, onTick } = options
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = prev + 1
          onTick?.(newSeconds)
          return newSeconds
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, onTick])

  const start = () => setIsRunning(true)
  const stop = () => setIsRunning(false)
  const reset = () => {
    setSeconds(0)
    setIsRunning(false)
  }
  const restart = () => {
    setSeconds(0)
    setIsRunning(true)
  }

  const formatTime = (totalSeconds: number = seconds) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
    restart,
    formatTime,
  }
}
