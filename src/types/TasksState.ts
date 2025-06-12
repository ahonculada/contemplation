import { Task } from './Task';
import { ColumnType } from './ColumnType';

export type TasksState = Record<ColumnType, Task[]>;
