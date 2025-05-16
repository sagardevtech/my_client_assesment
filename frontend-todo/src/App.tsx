import type React from "react"
import AddTodo from "./components/AddTodo"
import Filter from "./components/Filter"
import TodoList from "./components/TodoList"

const App: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.todoApp}>
        <h1 style={styles.title}>Todo List</h1>
        <AddTodo />
        <Filter />
        <TodoList />
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
    backgroundColor: "#f9fafb",
    overflow:"hidden"
  },
  todoApp: {
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "24px",
    color: "#1f2937",
    textAlign: "center" as const,
  },
}

export default App
