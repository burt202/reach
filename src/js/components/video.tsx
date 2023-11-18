import * as React from "react"
import {useRef, useEffect, useState} from "react"

import {AnnotationsResponse, Observation} from "../types"

interface Props {
  observation: Observation
  annotations: AnnotationsResponse
}

const CANVAS_WIDTH = 640
const CANVAS_HEIGHT = 360

// This function logic is almost certainly wrong but being honest, i dont know how to relate the current
// frame metadata to the annotation data properly. At the very least, I wanted to demonstate i could
// render rects on the canvas but would need to ask more questions and have more context probably to
// do a better job here

// This implementation is based on presentedFrames which is ok for the first play of the video play
// but then cant work beyond that (or if paused is used) as presentedFrames is an ever increasing
// number and not related to the current position of the video

// The logic in this function has been purposely separated out so its easily testable going forward as
// and when the right implementation is found

function getRectsForFrame(
  metadata: VideoFrameCallbackMetadata,
  annotations: AnnotationsResponse,
): Array<{
  x: number
  y: number
  width: number
  height: number
}> {
  const index = metadata.presentedFrames - 1

  return annotations[index]
    ? annotations[index].map((r) => {
        const width = r[2]
        const height = r[3]
        return {
          width,
          height,
          x: r[0] - width / 2,
          y: r[1] - height / 2,
        }
      })
    : []
}

export default function Video({observation, annotations}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [scrubberValue, setScrubberValue] = useState(0)
  const [frameMetadata, setFrameMetadata] = useState({})

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")

    // requestVideoFrameCallback is not currently supported in Firefox, maybe this is ok but if not
    // a better cross browser solution would need to be found
    videoRef.current?.requestVideoFrameCallback &&
      videoRef.current?.requestVideoFrameCallback(
        (now: number, metadata: VideoFrameCallbackMetadata) => {
          if (!videoRef.current) {
            return
          }

          const percentage = Math.round(
            (videoRef.current.currentTime / videoRef.current.duration) * 100,
          )

          ctx?.drawImage(videoRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

          const rects = getRectsForFrame(metadata, annotations)

          if (rects && ctx) {
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = 3

            rects.forEach((r) => {
              ctx.beginPath()
              ctx.rect(r.x, r.y, r.width, r.height)
              ctx.stroke()
            })
          }

          setScrubberValue(percentage)
          setFrameMetadata(metadata)
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
