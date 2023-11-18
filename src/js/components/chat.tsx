import {format} from "date-fns"
import * as React from "react"
import {useState, useEffect} from "react"

import {ChatMessage, Observation, chatMessageSchema} from "../types"

interface Props {
  observation: Observation
}

function parseJSON<T>(data: string) {
  try {
    return JSON.parse(data) as T
  } catch {
    return ""
  }
}

const CHAT_MESSAGES_TO_DISPLAY = 5

export default function Chat({observation}: Props) {
  const [messages, setMessages] = useState<Array<ChatMessage & {time: number}>>(
    [],
  )

  useEffect(() => {
    const websocket = new WebSocket(observation.webSocketUrl)

    websocket.addEventListener("message", (e: {data: string}) => {
      const validatedResponse = chatMessageSchema.safeParse(
        parseJSON<ChatMessage>(e.data),
      )

      if (validatedResponse.success) {
        setMessages((m) => [
          ...m,
          {time: Date.now(), ...validatedResponse.data},
        ])
      }
    })

    return () => {
      websocket.close()
    }
  })

  return (
    <div className="ml-m">
      <h3 className="m-0">Live Chat</h3>
      {messages.length ? (
        <div className="mt-m w-[300px]">
          {messages.slice(CHAT_MESSAGES_TO_DISPLAY * -1).map((m) => {
            return (
              <div
                key={m.time}
                className="border-solid border-0 border-b-[1px] border-slate-700 mb-m"
              >
                <div className="flex">
                  <img src={m.picture} height="50" width="50" />
                  <div className="ml-s">
                    <p className="m-0 font-bold leading-[25px]">{m.name}</p>
                    <p className="m-0 leading-[25px]">
                      {format(new Date(m.time), "do MMM yyyy HH:mm:ss")}
                    </p>
                  </div>
                </div>
                <p>{m.message}</p>
              </div>
            )
          })}
        </div>
      ) : (
        <p>No messages yet</p>
      )}
    </div>
  )
}
