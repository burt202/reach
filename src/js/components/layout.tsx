import * as React from "react"

import Link from "./link"
import Sidebar from "./sidebar"

interface Props {
  children: React.ReactNode
  observationId?: string
}

export default function Page({children, observationId}: Props) {
  return (
    <>
      <div className="flex justify-between p-m bg-gray-600">
        <div>
          <Link to="/">
            <h1 className="m-0 text-white">
              Reach Industries Frontend Assessment
            </h1>
          </Link>
        </div>
      </div>
      <div className="flex h-[100%]">
        <Sidebar selectedObservationId={observationId} />
        <div className="pl-m pr-m pb-m">
          {React.Children.map(children, (c) => c)}
        </div>
      </div>
    </>
  )
}
