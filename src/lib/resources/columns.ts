import { cache, redirect } from "@solidjs/router"
import { db } from "../db"

export const getColumns = cache(async (projectId: string) => {
  "use server"
  try {
    const columns = db.column.findMany({
      where: { projectId },
      orderBy: { order: "asc" },
      include: { tasks: true },
    })
    return columns
  } catch {
    console.log("500 error getting columns")
    redirect("/error")
  }
}, "columns")
