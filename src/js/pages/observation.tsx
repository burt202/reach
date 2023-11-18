import * as React from "react"
import {useParams} from "react-router-dom"

import observations from "../../data/observations"
import Layout from "../components/layout"
import NotFound from "./not-found"

export default function Observation() {
  const params = useParams()
  const observationId = params.observationId as string

  const observation = observations.find((o) => o.id === observationId)

  if (!observation) {
    return <NotFound />
  }

  return (
    <Layout observationId={observation.id}>
      <pre className="w-[500px]">{JSON.stringify(observation, null, 2)}</pre>
    </Layout>
  )
}
