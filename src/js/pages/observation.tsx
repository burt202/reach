import * as React from "react"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

import observations from "../../data/observations"
import Annotations from "../components/annotations"
import Chat from "../components/chat"
import Layout from "../components/layout"
import Video from "../components/video"
import requester from "../requester"
import {
  AnnotationsResponse,
  Observation,
  annotationsResponseSchema,
} from "../types"
import NotFound from "./not-found"

export default function ObservationOuter() {
  const params = useParams()
  const observationId = params.observationId as string

  const observation = observations.find((o) => o.id === observationId)

  if (!observation) {
    return <NotFound />
  }

  return (
    <Layout observationId={observation.id}>
      <ObservationInner observation={observation} />
    </Layout>
  )
}

interface ObservationInnerProps {
  observation: Observation
}

function ObservationInner({observation}: ObservationInnerProps) {
  const [annotations, setAnnotations] = useState<AnnotationsResponse>([])
  const [annotationsFetchError, setAnnotationsFetchError] = useState(false)
  const [annotationsLoading, setAnnotationsLoading] = useState(false)

  useEffect(() => {
    setAnnotationsLoading(true)

    requester<AnnotationsResponse>({
      url: observation.annotationsUrl,
      schema: annotationsResponseSchema,
    })
      .then((res) => {
        setAnnotationsLoading(false)

        if ("error" in res) {
          setAnnotationsFetchError(true)
        } else {
          setAnnotations(res)
        }
      })
      .catch(() => {
        setAnnotationsLoading(false)
        setAnnotationsFetchError(true)
      })
  }, [observation.annotationsUrl])

  if (annotationsLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex pt-m">
      <div>
        <Video observation={observation} annotations={annotations} />
        {annotationsFetchError ? (
          <p className="font-bold text-red-600">
            Failed to fetch annotations data
          </p>
        ) : (
          <Annotations observation={observation} annotations={annotations} />
        )}
      </div>
      <Chat observation={observation} />
    </div>
  )
}
