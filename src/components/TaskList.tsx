import { FormEvent, useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

interface themeSettings {
  th: string;
}

interface TaskStorage {
  tasks: string;
}

export function TaskList({th}: themeSettings) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle.trim() === '') {
      return;
    }
    const numberId = Math.floor(Math.random() * (1000 - 10)) + 10;
    setTasks([...tasks, {
      id: numberId,
      title: newTaskTitle,
      isComplete: false,
    }])

    setNewTaskTitle('');

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    } : task);

    setTasks(newTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }



  return (
    <section className={`task-list container ${localStorage.getItem('themeStorage') === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <form method="post">
            <input
              type="text"
              placeholder="Adicionar novo todo"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff" />
            </button>
          </form>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => {
            return (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span> 
                  </label>
                  <p onClick={() => handleToggleTaskCompletion(task.id)}>{task.title}</p>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16} />
                </button>
              </li>
            )
          }
          )}

        </ul>
      </main>
    </section>
  )
}