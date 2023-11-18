import * as React from "react"
import {Link as RRDLink} from "react-router-dom"

interface Props {
  to: string
  children: React.ReactNode
  textLink?: boolean
}

export default function Link({to, children, textLink}: Props) {
  const className = textLink ? "text-indigo-600" : "no-underline"

  return (
    <RRDLink className={className} to={to}>
      {children}
    </RRDLink>
  )
}
