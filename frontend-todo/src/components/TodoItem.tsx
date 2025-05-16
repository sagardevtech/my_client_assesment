"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toggleTodo, deleteTodo, editTodo } from "../features/todo/todoSlice"
import type { Todo } from "../features/todo/types"
import type { AppDispatch } from "../app/store"

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isEditing, setIsEditing] = useState(false)
    const [newText, setNewText] = useState(todo.text)
    const [isHovered, setIsHovered] = useState(false)

    const handleEdit = () => {
        if (newText.trim()) {
            dispatch(editTodo({ id: todo.id, newText }))
            setIsEditing(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleEdit()
        } else if (e.key === "Escape") {
            setIsEditing(false)
            setNewText(todo.text)
        }
    }

    return (
        <li style={styles.listItem} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div style={styles.todoContainer}>
                <label style={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(toggleTodo(todo.id))}
                        style={styles.checkbox}
                    />
                    <span style={{ ...styles.checkmark, ...(todo.completed ? styles.checkedBox : {}) }}>
                        {todo.completed ? "✓" : ""}
                    </span>
                </label>


                {isEditing ? (
                    <div style={styles.editContainer}>
                        <input
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={styles.editInput}
                            autoFocus
                        />
                        <div style={styles.editActions}>
                            <button onClick={handleEdit} style={styles.saveButton}>
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false)
                                    setNewText(todo.text)
                                }}
                                style={styles.cancelButton}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <span
                            onClick={() => dispatch(toggleTodo(todo.id))}
                            style={{
                                ...styles.todoText,
                                ...(todo.completed ? styles.completedText : {}),
                                cursor: "pointer",
                            }}
                        >
                            {todo.text}
                        </span>


                        <div
                            style={{
                                ...styles.actions,
                                opacity: isHovered ? 1 : 0,
                            }}
                        >
                            <button onClick={() => setIsEditing(true)} style={styles.actionButton}>
                                Edit
                            </button>
                            <button
                                onClick={() => dispatch(deleteTodo(todo.id))}
                                style={{ ...styles.actionButton, ...styles.deleteButton }}
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
        </li>
    )
}
const styles: { [key: string]: React.CSSProperties } = {
    listItem: {
        borderBottom: "1px solid #f3f4f6",
        transition: "background-color 0.2s ease",
    },
    todoContainer: {
        display: "flex",
        alignItems: "center",
        padding: "16px 20px",
        position: "relative" as const,
    },
    checkboxContainer: {
        display: "inline-block",
        width: "20px",
        height: "20px",
        marginRight: "12px",
        cursor: "pointer",
      },
      checkbox: {
        opacity: 0,
        width: "20px",
        height: "20px",
        margin: 0,
        padding: 0,
        position: "absolute" as const,
        cursor: "pointer",
        zIndex: 2,
      },
      checkmark: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "18px",
        height: "18px",
        borderRadius: "4px",
        border: "2px solid #d1d5db",
        transition: "all 0.2s ease",
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: "transparent",
        pointerEvents: "none",
      },
      checkedBox: {
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
      },
    todoText: {
        flex: 1,
        fontSize: "16px",
        transition: "color 0.2s ease",
        marginTop:"3px"
    },
    completedText: {
        textDecoration: "line-through",
        color: "#9ca3af",
    },
    actions: {
        display: "flex",
        gap: "8px",
        transition: "opacity 0.2s ease",
    },
    actionButton: {
        background: "transparent",
        border: "none",
        fontSize: "14px",
        cursor: "pointer",
        padding: "4px 8px",
        borderRadius: "4px",
        color: "#6b7280",
        transition: "all 0.2s ease",
    },
    deleteButton: {
        color: "#ef4444",
    },
    editContainer: {
        flex: 1,
        display: "flex",
        gap: "8px",
    },
    editInput: {
        padding: "8px 12px",
        fontSize: "16px",
        border: "1px solid #d1d5db",
        borderRadius: "4px",
        outline: "none",
        transition: "border-color 0.2s ease",
        width:"100%"
    },
    editActions: {
        display: "flex",
        gap: "8px",
    },
    saveButton: {
        background: "#3b82f6",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background-color 0.2s ease",
    },
    cancelButton: {
        background: "transparent",
        border: "1px solid #d1d5db",
        padding: "6px 12px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "15px",
        transition: "all 0.2s ease",
    },
}

export default TodoItem
