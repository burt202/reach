import * as React from "react"

import observations from "../../data/observations"
import Link from "./link"

interface Props {
  selectedObservationId?: string
}

export default function Sidebar({selectedObservationId}: Props) {
  return (
    <div className="w-[200px] bg-slate-100 h-[100%]">
      <ul className="list-none p-0 m-0">
        {observations.map((o) => {
          const selected = o.id === selectedObservationId
          const background = selected ? "bg-sky-300" : ""

          return (
            <li key={o.id} className={`p-m text-center ${background}`}>
              <Link to={`/observation/${o.id}`} textLink={true}>
                {o.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
