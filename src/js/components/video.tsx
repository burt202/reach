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

  const [frameMetadata, setFrameMetadata] = useState({})

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")

    videoRef.current?.requestVideoFrameCallback(
      (now: number, metadata: VideoFrameCallbackMetadata) => {
        if (!videoRef.current) {
          return
        }

        ctx?.drawImage(videoRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        setFrameMetadata(metadata)

        console.log("annotations", annotations.length) // TODO
      },
    )
  })

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
      <p>
        <button
          type="button"
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
      </p>
      <pre>{JSON.stringify(frameMetadata, null, 2)}</pre>
    </div>
  )
}
