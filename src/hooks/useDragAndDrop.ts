// src/hooks/useDragAndDrop.ts
import React from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { getDragColumns, isColumn } from '../utils/dragHelper';
import { Task, TasksState, ColumnType, useDragAndDropReturn } from '../types';

export function useDragAndDrop(initialTasks: TasksState): useDragAndDropReturn {
  const [tasks, setTasks] = React.useState<TasksState>(initialTasks);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const { oldColumn, newColumn } = getDragColumns(event, tasks);

    if (!oldColumn || !newColumn) {
      console.warn('Drag did not resolve to valid columns:', oldColumn, newColumn);
      return;
    }
    if (!isColumn(oldColumn) || !isColumn(newColumn)) {
      console.warn('Invalid columns:', oldColumn, newColumn);
      return;
    }

    if (over && active.id !== over.id) {
      // Drag and drop in the same column
      if (oldColumn === newColumn) {
        setTasks((tasks) => {
          const oldIndex = tasks[newColumn].findIndex(task => task.id === active.id);
          const newIndex = tasks[newColumn].findIndex(task => task.id === over.id);
          return {
            ...tasks,
            [newColumn]: arrayMove(tasks[newColumn], oldIndex, newIndex),
          };
        });
      } 
      // Drag and drop in different column
      else {
        setTasks((tasks) => {
          const oldTask = tasks[oldColumn].find(task => task.id === active.id);
          if (!oldTask) return tasks;

          const newIndex = tasks[newColumn].findIndex(task => task.id === over.id);
          const finalIndex = newIndex >= 0 ? newIndex : tasks[newColumn].length;

          return {
            ...tasks,
            [oldColumn]: tasks[oldColumn].filter(task => task.id !== active.id),
            [newColumn]: [
              ...tasks[newColumn].slice(0, finalIndex),
              oldTask,
              ...tasks[newColumn].slice(finalIndex),
            ],
          };
        });
      }
    }
    setActiveId(null);
  }

  return { tasks, activeId, setTasks, handleDragStart, handleDragEnd };
}
