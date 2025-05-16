import type React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import TodoItem from "./TodoItem"

const TodoList: React.FC = () => {
  const { todos, filter } = useSelector((state: RootState) => state.todos)

  const filtered = todos.filter((todo) => {
    if (filter === "completed") return todo.completed
    if (filter === "pending") return !todo.completed
    return true
  })

  return (
    <div style={styles.container}>
      {filtered.length === 0 ? (
        <div style={styles.emptyState}>
          {filter === "all"
            ? "No tasks yet. Add one above!"
            : filter === "completed"
              ? "No completed tasks yet."
              : "No pending tasks."}
        </div>
      ) : (
        <ul style={styles.list}>
          {filtered.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  )
}

const styles = {
  container: {
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  emptyState: {
    padding: "30px",
    textAlign: "center" as const,
    color: "#9ca3af",
    fontStyle: "italic",
  },
}

export default TodoList
