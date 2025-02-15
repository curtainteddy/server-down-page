"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Coffee, BookOpen, Sparkles } from "lucide-react"

interface FloatingElement {
  id: number
  Icon: typeof Coffee
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
}

export default function InteractiveElements() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        setContainerSize({
          width: containerRef.current?.clientWidth || 0,
          height: containerRef.current?.clientHeight || 0,
        })
      }
      updateSize()
      window.addEventListener("resize", updateSize)
      return () => window.removeEventListener("resize", updateSize)
    }
  }, [])

  useEffect(() => {
    if (containerSize.width && containerSize.height) {
      setElements(
        Array.from({ length: 12 }, (_, i) => ({
          id: i,
          Icon: [Coffee, BookOpen, Sparkles][i % 3],
          x: Math.random() * (containerSize.width - 40),
          y: Math.random() * (containerSize.height - 40),
          size: Math.random() * 20 + 20,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
        })),
      )
    }
  }, [containerSize])

  useEffect(() => {
    const interval = setInterval(() => {
      setElements((prevElements) =>
        prevElements.map((el) => {
          let newX = el.x + el.speedX
          let newY = el.y + el.speedY
          let newSpeedX = el.speedX
          let newSpeedY = el.speedY

          if (newX <= 0 || newX >= containerSize.width - el.size) {
            newSpeedX = -newSpeedX
            newX = Math.max(0, Math.min(newX, containerSize.width - el.size))
          }
          if (newY <= 0 || newY >= containerSize.height - el.size) {
            newSpeedY = -newSpeedY
            newY = Math.max(0, Math.min(newY, containerSize.height - el.size))
          }

          return { ...el, x: newX, y: newY, speedX: newSpeedX, speedY: newSpeedY }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [containerSize])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute pointer-events-auto"
          style={{
            left: element.x,
            top: element.y,
            width: element.size,
            height: element.size,
          }}
          animate={{
            x: element.x,
            y: element.y,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 10,
          }}
          whileHover={{ scale: 0 }}
        >
          <element.Icon
            size={element.size}
            className="text-amber-200/20 transition-colors duration-300 hover:text-amber-200/40"
          />
        </motion.div>
      ))}
    </div>
  )
}

