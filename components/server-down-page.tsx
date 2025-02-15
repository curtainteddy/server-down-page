"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, SnailIcon } from "lucide-react"
import AbstractBackground from "./abstract-background"
import InteractiveElements from "./interactive-elements"
import WindowsTaskbar from "./windows-taskbar"
import { Button } from "@/components/ui/button"

interface FloatingNumber {
  id: number
  count: number
  x: number
  y: number
}

export default function ServerDownPage() {
  const [isChecking, setIsChecking] = useState(false)
  const [dots, setDots] = useState("")
  const [clickCount, setClickCount] = useState(0)
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([])

  useEffect(() => {
    if (isChecking) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""))
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isChecking])

  const handleRefresh = () => {
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      setDots("")
    }, 3000)
  }

  const handleSnailClick = () => {
    setClickCount((prev) => prev + 1)
    const id = Date.now()
    const x = Math.random() * 100 - 50 // Random position around the snail
    const y = Math.random() * 50 - 25 // Random position around the snail
    setFloatingNumbers((prev) => [...prev, { id, count: clickCount + 1, x, y }])
    setTimeout(() => {
      setFloatingNumbers((prev) => prev.filter((num) => num.id !== id))
    }, 1000) // Remove the number after 1 second
  }

  return (
    <div className="relative min-h-screen bg-amber-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      <AbstractBackground />
      <InteractiveElements />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10"
      >
        <h1 className="text-5xl font-bold text-amber-100 mb-4 font-space-grotesk tracking-tight">
          Please check in later.
        </h1>
        <p className="text-2xl text-amber-200 mb-8 font-inter">
          I am currently out for a sunlight break.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
        className="text-center z-10"
        whileHover={{
          scale: 1.15,
          transition: { duration: 0.1 },
        }}
        whileTap={{ scale: 0.70 }}
        onClick={handleSnailClick}
      >
        <div className="relative w-full max-w-md h-64 mb-8 z-10 flex items-center justify-center">
          <SnailIcon className="w-32 h-32 text-amber-300" />
        </div>
      </motion.div>

      <AnimatePresence>
        {isChecking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-lg text-amber-200 mb-4 z-10 font-inter"
          >
            Checking server status{dots}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={handleRefresh}
        disabled={isChecking}
        className="group z-10 bg-amber-700 hover:bg-amber-600 text-amber-100 font-inter"
        variant="outline"
      >
        <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
        Refresh
      </Button>

      <WindowsTaskbar />

      <AnimatePresence>
        {floatingNumbers.map((num) => (
          <motion.div
            key={num.id}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute text-amber-300 text-2xl font-bold z-20"
            style={{ top: `calc(50% + ${num.y}px)`, left: `calc(50% + ${num.x}px)` }}
          >
            {num.count}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}