import './App.css'
import React from 'react'
import Column from './components/TaskboardColumn'
import {DndContext, DragEndEvent, DragStartEvent, useDraggable, useDroppable, UniqueIdentifier} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import {SortableContext, arrayMove} from '@dnd-kit/sortable';
import { getDragColumns, isColumn } from './utils/dragHelper';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { Task, ColumnType, TasksState } from './types';

const initialTasks = {
  todo: [
    { id: 'task-1', text: 'Task A' },
    { id: 'task-2', text: 'Task B' }
  ],
  review: [
    { id: 'task-3', text: 'Task C' },
    { id: 'task-4', text: 'Task D' },
    { id: 'task-5', text: 'Task E' }
  ],
  confident: [
    { id: 'task-6', text: 'Task F' },
    { id: 'task-7', text: 'Task G' }
  ]
};

function App() {
  const { tasks, activeId, handleDragStart, handleDragEnd, setTasks } = useDragAndDrop(initialTasks);
  const [task, setTask] = React.useState("");
  const [id, setId] = React.useState(8);

  function saveTask(newTask: string) {
    setTasks(prevTasks => ({
      ...prevTasks,
      todo: [...prevTasks.todo, {id: "task-"+id.toString(), text: newTask}]
    }));
    setTask("")
    setId(id + 1)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if(event.key === 'Enter') {
      saveTask(task)
    }
  }

  return (
    <>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className='taskboard-layout'>
          <SortableContext items = {tasks.todo.map(task => task.id)}>
            <Column id = "todo" title = "To Do" tasks = {tasks.todo}/>
          </SortableContext>
          <SortableContext items = {tasks.review.map(task => task.id)}>
            <Column id = "review" title = "Review" tasks = {tasks.review}/>
          </SortableContext>
          <SortableContext items = {tasks.confident.map(task => task.id)}>
            <Column id = "confident" title = "Confident" tasks = {tasks.confident}/>
          </SortableContext>
        </div>
      </DndContext>
      <button onClick={() => saveTask(task)}>Add Task</button>
      <input value = {task} onChange={(e) => setTask(e.target.value)} type = "text" onKeyDown={handleKeyDown}/>

    </>
  )
}

export default App
