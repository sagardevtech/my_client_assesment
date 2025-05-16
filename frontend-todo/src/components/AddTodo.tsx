"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../features/todo/todoSlice"
import type { AppDispatch } from "../app/store"

const AddTodo: React.FC = () => {
  const [text, setText] = useState("")
  const dispatch = useDispatch<AppDispatch>()

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text))
      setText("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd()
    }
  }

  return (
    <div style={styles.container}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        style={styles.input}
      />
      <button onClick={handleAdd} style={styles.addButton}>
        <span style={styles.buttonText}>Add</span>
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    padding: "14px 16px",
    fontSize: "16px",
    border: "none",
    outline: "none",
    transition: "all 0.3s ease",
  },
  addButton: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "0 20px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  buttonText: {
    display: "inline-block",
    transform: "translateY(0)",
    transition: "transform 0.2s ease",
  },
}

export default AddTodo;
