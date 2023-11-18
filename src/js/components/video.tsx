import * as React from "react"
import {useRef, useEffect, useState} from "react"

import {AnnotationsResponse, Observation} from "../types"

interface Props {
  observation: Observation
  annotations: AnnotationsResponse
}

const CANVAS_WIDTH = 640
const CANVAS_HEIGHT = 360

export default function Video({observation, annotations}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [scrubberValue, setScrubberValue] = useState(0)
  const [frameMetadata, setFrameMetadata] = useState({})

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")

    videoRef.current?.requestVideoFrameCallback(
      (now: number, metadata: VideoFrameCallbackMetadata) => {
        if (!videoRef.current) {
          return
        }

        const percentage = Math.round(
          (videoRef.current.currentTime / videoRef.current.duration) * 100,
        )

        ctx?.drawImage(videoRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        setScrubberValue(percentage)
        setFrameMetadata(metadata)

        console.log("annotations", annotations.length) // TODO
      },
    )
  })

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
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        controls
        className="hidden"
      ></video>
      <canvas
        className="pt-m"
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      ></canvas>
      <div className="flex">
        <button
          type="button"
          className="w-[84px]"
          onClick={() => {
            if (videoRef.current?.paused) {
              void videoRef.current?.play()
            } else {
              void videoRef.current?.pause()
            }
          }}
        >
          Play/Pause
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={scrubberValue}
          onChange={(e) => updateVideoCurrentTime(e.target.value)}
          className="ml-m w-[540px]"
        />
      </div>
      <pre>{JSON.stringify(frameMetadata, null, 2)}</pre>
    </div>
  )
}
