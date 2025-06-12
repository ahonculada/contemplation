import { useState } from 'react'
import React from 'react'
import '../App.css'
import {useSortable} from '@dnd-kit/sortable';
import {DndContext, useDraggable, useDroppable} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Task, ColumnType, TasksState, ColumnProps, TaskCardProps } from '../types';

function TaskCard({id, text}: TaskCardProps) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
    
      return (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="taskcard"
        >
          {text}
        </div>
      );
    }
  
export default TaskCard