import * as React from "react"
import {createRoot} from "react-dom/client"

import App from "./app"

import "../style.css"

const container = document.body.querySelector("#container") as Element
const root = createRoot(container)

root.render(<App />)
