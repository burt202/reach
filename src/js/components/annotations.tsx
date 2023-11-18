import * as React from "react"
import {useState} from "react"

import {AnnotationsResponse, Observation} from "../types"

interface Props {
  observation: Observation
  annotations: AnnotationsResponse
}

function download(content: string, fileName: string, contentType: string) {
  const a = document.createElement("a")
  const file = new Blob([content], {type: contentType})
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
}

export default function Annotations({observation, annotations}: Props) {
  const [showAnnotations, setShowAnnotations] = useState(false)

  return (
    <>
      <p>
        <a
          className="text-indigo-600 underline cursor-pointer"
          onClick={() => {
            setShowAnnotations(!showAnnotations)
          }}
        >
          {showAnnotations ? "Hide" : "Show"} annotations
        </a>
      </p>
      {showAnnotations && (
        <div className="w-[500px] overflow-auto p-s bg-gray-300">
          <pre>{JSON.stringify(annotations)}</pre>
        </div>
      )}
      <p>
        <a
          className="text-indigo-600 underline cursor-pointer"
          onClick={() => {
            download(
              JSON.stringify(annotations, null, 2),
              `${observation.id}.json`,
              "text/plain",
            )
          }}
        >
          Download annotations
        </a>
      </p>
    </>
  )
}
