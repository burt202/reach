import * as React from "react"
import {useRef, useEffect, useState, useCallback} from "react"

import {AnnotationsResponse, Observation} from "../types"

interface Props {
  observation: Observation
  annotations: AnnotationsResponse
}

function getRectsForFrame(
  percentage: number,
  annotations: AnnotationsResponse,
): Array<{
  x: number
  y: number
  width: number
  height: number
}> {
  const index = Math.round((annotations.length / 100) * percentage)

  return annotations[index]
    ? annotations[index].map(([x, y, width, height]) => {
        return {
          width,
          height,
          x,
          y,
        }
      })
    : []
}

export default function Video({observation, annotations}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [scrubberValue, setScrubberValue] = useState(0)
  const [isPaused, setIsPaused] = useState(true)

  const updateCanvas = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) {
      return
    }

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight

    const percentage =
      (videoRef.current.currentTime / videoRef.current.duration) * 100

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.videoWidth,
      videoRef.current.videoHeight,
    )

    const rects = getRectsForFrame(percentage, annotations)

    if (rects.length) {
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 3

      rects.forEach((r) => {
        ctx.beginPath()
        ctx.rect(r.x, r.y, r.width, r.height)
        ctx.stroke()
      })
    }

    setScrubberValue(Math.round(percentage))
    videoRef.current.requestVideoFrameCallback(updateCanvas)
  }, [annotations])

  useEffect(() => {
    videoRef.current?.requestVideoFrameCallback(updateCanvas)
  }, [updateCanvas])

  const updateVideoCurrentTime = (value: string) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = (video.duration / 100) * parseInt(value, 10)
  }

  return (
    <div>
      <video
        src={observation.videoUrl}
        ref={videoRef}
        controls
        className="hidden"
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
      ></video>
      <canvas ref={canvasRef}></canvas>
      <div className="flex">
        <button
          type="button"
          className="w-[80px]"
          onClick={() => {
            if (videoRef.current?.paused) {
              void videoRef.current?.play()
            } else {
              void videoRef.current?.pause()
            }
          }}
        >
          {isPaused ? "Play" : "Pause"}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={scrubberValue}
          onChange={(e) => updateVideoCurrentTime(e.target.value)}
          className="ml-m flex-1"
        />
      </div>
    </div>
  )
}
