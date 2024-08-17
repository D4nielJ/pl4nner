import { Task, type Column } from "@prisma/client"
import { For } from "solid-js"

export default function Column(props: { column: Column; tasks: Task[] }) {
  return (
    <div class="rounded-md border">
      <h3>{props.column.name}</h3>
      <For each={props.tasks}>{(t) => <div>{t.name}</div>}</For>
    </div>
  )
}
