import * as React from "react"
import {HashRouter, Routes, Route} from "react-router-dom"

import Home from "./pages/home"
import NotFound from "./pages/not-found"
import Observation from "./pages/observation"

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/observation/:observationId" element={<Observation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}
