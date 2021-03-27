import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const newTodoInput = useRef(null)

  function handleNewTodo (e) {
    e.preventDefault()
    
    if(newTodoInput.current.value === '') {
      return
    }

    let value = newTodoInput.current.value

    setTodos([
      ...todos, {
        id: todos.length,
        title: value,
        completed: false
      }
    ])

    newTodoInput.current.value = ''
  }

  function deleteTodo (index) {
    const todosCopy = [...todos]

    console.log(index)

    todosCopy.splice(index, 1)

    setTodos(todosCopy)
  }

  function setTodoCompleted (index) {
    const newTodosSet = todos

    let todo = newTodosSet.splice(index, 1)

    console.log(todo)
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <div className="App">
      <header id="header">
        <div id="header-items-group">
          <input type="text" placeholder="Adicionar nova tarefa..." id="add-task-input" ref={newTodoInput} />
          <button id="add-task-button" onClick={e => handleNewTodo(e)}>Adicionar à lista</button>
        </div>
      </header>

      <div id="body-wrapper">
      {todos.length === 0 ? 
            <span id="no-task-message">Você não tem nenhum a fazer...</span>
          :
          <>
        <div id="tasks-wrapper">
          <h4 className="todos-title">Suas tarefas</h4>
          {todos.map((todo, index) => (
            <div key={index} className="todo-container">
            <div id="todo-left">
              <label className="pointer" onClick={() => setTodoCompleted(index)}>
                <input type="checkbox" />
                <span>Concluída?</span>
              </label>
            <span className={todo.completed ? "todo-title completed" : "todo-title"}>{todo.title}</span>
            </div>
            <button className="delete-task" onClick={() => deleteTodo(index)}>Deletar</button>
            </div>
            ))}
          </div>
          
          {/*<div id="completed-wrapper">
            <div>Completados</div>
            <div class="todo-container">

            </div>
          </div>*/}
          </>
        }
      </div>
    </div>
  );
}

export default App;
