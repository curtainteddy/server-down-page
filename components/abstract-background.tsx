"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"

export default function AbstractBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.z = 5

    // Create a rusty, coffee-colored material
    const rustyMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513, wireframe: true })

    // Create multiple geometric shapes
    const shapes = [
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.IcosahedronGeometry(2, 2),

      new THREE.TorusGeometry(0.7, 0.2, 16, 50),
      new THREE.TorusGeometry(0.7, 0.2, 16, 100),
      new THREE.OctahedronGeometry(0.8, 0),
    ]

    const group = new THREE.Group()

    shapes.forEach((shape, index) => {
      const mesh = new THREE.Mesh(shape, rustyMaterial)
      mesh.position.set(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2)
      group.add(mesh)

      // Animate each shape
      gsap.to(mesh.rotation, {
        x: Math.PI * 25,
        y: Math.PI * 25,
        duration: 20 + index * 5,
        repeat: -1,
        ease: "none",
      })
    })

    scene.add(group)

    // Add particles resembling coffee beans
    const particles = new THREE.Group()
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8)
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x4a2c2a })

    for (let i = 0; i < 100; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial)
      particle.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
      particles.add(particle)
    }

    scene.add(particles)

    gsap.to(particles.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 40,
      repeat: 2,
      ease: "none",
    })

    gsap.to(group.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 60,
      repeat: -1,
      ease: "none",
    })

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-30" />
}

