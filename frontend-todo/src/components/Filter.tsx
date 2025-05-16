"use client"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAllTodos, setFilter } from "../features/todo/todoSlice"
import type { AppDispatch, RootState } from "../app/store"

const Filter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { filter: currentFilter, todos } = useSelector((state: RootState) => state.todos)
  console.log(todos,"iiii")

  return (
    <div style={styles.container}>
      <button
        onClick={() => dispatch(setFilter("all"))}
        style={{
          ...styles.filterButton,
          ...(currentFilter === "all" ? styles.activeFilter : {}),
        }}
      >
        All
      </button>
      <button
        onClick={() => dispatch(setFilter("completed"))}
        style={{
          ...styles.filterButton,
          ...(currentFilter === "completed" ? styles.activeFilter : {}),
        }}
      >
        Completed
      </button>
      <button
        onClick={() => dispatch(setFilter("pending"))}
        style={{
          ...styles.filterButton,
          ...(currentFilter === "pending" ? styles.activeFilter : {}),
        }}
      >
        Pending
      </button>
      {todos?.length > 0 && <button
        onClick={() => dispatch(clearAllTodos())}
        style={{
          ...styles.filterButton,
        }}
      >
        Clear All
      </button>}
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "20px 0",
  },
  filterButton: {
    background: "transparent",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: "#4b5563",
  },
  activeFilter: {
    background: "#3b82f6",
    color: "white",
    borderColor: "#3b82f6",
  },
}

export default Filter
