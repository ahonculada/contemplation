import { TasksState } from './TasksState';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export type useDragAndDropReturn = {
  tasks: TasksState;
  activeId: string | null;
  setTasks: React.Dispatch<React.SetStateAction<TasksState>>;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
};