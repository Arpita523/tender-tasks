
import React from 'react';
import { Column } from './Column';
import { columns } from '../data/initialData';
import type { Task, ColumnId } from '../types';

interface BoardProps {
  tasks: Task[];
  onMoveTask: (taskId: string, newColumn: ColumnId) => void;
  onSelectTask: (task: Task) => void;
}

export const Board: React.FC<BoardProps> = ({ tasks, onMoveTask, onSelectTask }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
      {columns.map(column => (
        <Column
          key={column.id}
          column={column}
          tasks={tasks.filter(task => task.status === column.id)}
          onMoveTask={onMoveTask}
          onSelectTask={onSelectTask}
        />
      ))}
    </div>
  );
};
