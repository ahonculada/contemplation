import {DndContext, DragEndEvent, DragStartEvent, useDraggable, useDroppable, UniqueIdentifier} from '@dnd-kit/core';
import { Task, ColumnType, TasksState, ColumnProps, TaskCardProps } from '../types';
  
export function getDragColumns(event: DragEndEvent, tasks: TasksState): {
  oldColumn?: string;
  newColumn?: string;
} {
  const { active, over } = event;
  let oldColumn: string | undefined;
  let newColumn: string | undefined;

  for (const [columnName, columnTasks] of Object.entries(tasks)) {
    if (columnTasks.find((task) => task.id === active.id)) {
      oldColumn = columnName;
    }

    if (columnTasks.find((task) => task.id === over?.id)) {
      newColumn = columnName;
    }

    if (active.id === columnName) {
      oldColumn = columnName;
    }

    if (over?.id === columnName) {
      newColumn = columnName;
    }
  }

  return { oldColumn, newColumn };
}
  
export function isColumn(key: string): key is ColumnType {
  return ['todo', 'review', 'confident'].includes(key);
}