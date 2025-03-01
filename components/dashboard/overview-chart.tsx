"use client"

import React, { useEffect, useRef, useState } from "react"

export default function CompanyGrowthChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }

    // Initial dimensions
    updateDimensions()
    
    // Add resize listener
    window.addEventListener("resize", updateDimensions)
    
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Draw chart whenever dimensions change
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1
    canvasRef.current.width = dimensions.width * dpr
    canvasRef.current.height = dimensions.height * dpr
    
    // Scale context according to device pixel ratio
    ctx.scale(dpr, dpr)
    
    // Set display size
    canvasRef.current.style.width = `${dimensions.width}px`
    canvasRef.current.style.height = `${dimensions.height}px`

    const width = dimensions.width
    const height = dimensions.height
    const padding = { top: 30, right: 20, bottom: 60, left: 50 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Data for February 2024
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"]
    
    // Weekly data (28 days)
    const data = [
      [1.1, 1.5, 1.7, 1.9, 2.1, 2.5, 1.8],  // Week 1
      [2.0, 2.2, 2.6, 2.4, 2.2, 2.7, 1.7],  // Week 2
      [2.7, 2.9, 3.1, 3.2, 3.4, 3.5, 2.7],  // Week 3
      [3.4, 3.6, 3.7, 3.9, 4.0, 4.2, 4.3],  // Week 4
    ]

    // Line chart data (key points for the teal line)
    const lineData = [2.1, 2.9, 2.6, 3.6, 3.3, 4.3]

    // Bar colors
    const colors = [
      "#6EB5FF", // Light blue
      "#62D8A8", // Light green
      "#AADEA7", // Lime green
      "#FFD166", // Yellow
      "#FF6B6B", // Red
      "#C38D9E", // Pink
      "#41B3A3"  // Teal
    ]

    // Draw y-axis and grid lines
    const maxValue = 4.5
    const yAxisSteps = 4
    
    ctx.strokeStyle = "#DDDDDD"
    ctx.lineWidth = 1
    
    for (let i = 0; i <= yAxisSteps; i++) {
      const y = padding.top + chartHeight - (i / yAxisSteps) * chartHeight
      
      // Grid line
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
      
      // Y-axis label
      ctx.fillStyle = "#888888"
      ctx.font = "12px Arial"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      if (i > 0) {
        ctx.fillText(weeks[i-1], padding.left - 5, y)
      }
    }

    // Draw bars
    const dayWidth = chartWidth / 28 // 28 days in February
    const barWidth = dayWidth * 0.8
    
    let dayCounter = 0
    
    for (let week = 0; week < 4; week++) {
      for (let day = 0; day < 7; day++) {
        const value = data[week][day]
        const x = padding.left + dayCounter * dayWidth
        const barHeight = (value / maxValue) * chartHeight
        const y = padding.top + chartHeight - barHeight
        
        // Draw bar
        ctx.fillStyle = colors[day]
        ctx.fillRect(x, y, barWidth, barHeight)
        
        // Day number below x-axis
        ctx.fillStyle = "#888888"
        ctx.font = "10px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.fillText((dayCounter + 1).toString(), x + barWidth / 2, padding.top + chartHeight + 5)
        
        dayCounter++
      }
    }
    
    // Draw trend line
    ctx.strokeStyle = "#009688" // Teal color
    ctx.lineWidth = 2
    ctx.beginPath()
    
    // Plot points evenly across the chart
    const linePoints = [
      { x: padding.left + (0 * chartWidth / 5), y: padding.top + chartHeight - (lineData[0] / maxValue) * chartHeight },
      { x: padding.left + (1 * chartWidth / 5), y: padding.top + chartHeight - (lineData[1] / maxValue) * chartHeight },
      { x: padding.left + (2 * chartWidth / 5), y: padding.top + chartHeight - (lineData[2] / maxValue) * chartHeight },
      { x: padding.left + (3 * chartWidth / 5), y: padding.top + chartHeight - (lineData[3] / maxValue) * chartHeight },
      { x: padding.left + (4 * chartWidth / 5), y: padding.top + chartHeight - (lineData[4] / maxValue) * chartHeight },
      { x: padding.left + (5 * chartWidth / 5), y: padding.top + chartHeight - (lineData[5] / maxValue) * chartHeight }
    ]
    
    ctx.moveTo(linePoints[0].x, linePoints[0].y)
    for (let i = 1; i < linePoints.length; i++) {
      ctx.lineTo(linePoints[i].x, linePoints[i].y)
    }
    ctx.stroke()
    
    // Draw trend line points
    linePoints.forEach(point => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#009688"
      ctx.fill()
    })
  }, [dimensions])

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold">Company Growth</h3>
        </div>
        <p className="text-teal-500 text-sm mb-4">February 2024</p>
        
        <div ref={containerRef} className="flex-grow w-full relative">
          <canvas ref={canvasRef} className="absolute inset-0"></canvas>
        </div>
        
        <div className="flex space-x-2 mt-4 justify-center">
          <button className="px-4 py-2 bg-teal-500 text-white rounded-md text-sm font-medium">Month</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium">Year</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium">2 Year</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium">3 Year</button>
        </div>
      </div>
    </div>
  )
}