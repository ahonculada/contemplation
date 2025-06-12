import { useState } from 'react'
import React from 'react'
import '../App.css'
import {useSortable} from '@dnd-kit/sortable';
import {DndContext, useDraggable, useDroppable} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import TaskCard  from './TaskCard';
import { Task, ColumnType, TasksState, ColumnProps } from '../types';

function TaskboardColumn({id, title, tasks}: ColumnProps) {
    const {setNodeRef} = useDroppable({id}); 
    return (
        <div ref={setNodeRef} className = "taskboard-column">
            <h3>{title}</h3>
            <div className = "tasklist">
                {tasks.map((task) => (
                    <TaskCard key={task.id} id={task.id} text={task.text}></TaskCard>
                ))}
            </div>
        </div>

    );
}

export default TaskboardColumn