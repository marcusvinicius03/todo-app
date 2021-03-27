import React, { useRef, useState } from 'react'
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
        title: value
      }
    ])

    newTodoInput.current.value = ''
  }

  function deleteTodo (id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="App">
      <header id="header">
        <div id="header-items-group">
          <input type="text" placeholder="Adicionar nova tarefa..." id="add-task-input" ref={newTodoInput} />
          <button id="add-task-button" onClick={e => handleNewTodo(e)}>Adicionar à lista</button>
        </div>
      </header>

      <div id="body-wrapper">
      {todos.length == 0 ? 
            <span id="no-task-message">Você não tem nenhum a fazer...</span>
          : 
        <div id="tasks-wrapper">
          {todos.length == 0 ? 
            <span>Você não tem nenhum a fazer...</span>
          : todos.map(todo => (
            <div key={todo.id} className="todo-container">
            <div id="todo-left">
              <label>
                <input type="checkbox" />
                <span>Concluída?</span>
              </label>
            <span className="todo-title">{todo.title}</span>
            </div>
            <button className="delete-task" onClick={() => deleteTodo(todo.id)}>Deletar</button>
            </div>
            ))}
          </div>
          }
      </div>
    </div>
  );
}

export default App;
