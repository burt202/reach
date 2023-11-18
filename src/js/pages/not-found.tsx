import * as React from "react"

import Layout from "../components/layout"
import Link from "../components/link"

export default function NotFound() {
  return (
    <Layout>
      <p>Page not found</p>
      <Link to="/" textLink={true}>
        Back to home
      </Link>
    </Layout>
  )
}
