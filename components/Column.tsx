
import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { PlusIcon, DotsHorizontalIcon } from './icons';
import type { Task, ColumnType, ColumnId } from '../types';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onMoveTask: (taskId: string, newColumn: ColumnId) => void;
  onSelectTask: (task: Task) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, tasks, onMoveTask, onSelectTask }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  /**
   * Handles the drop event. It retrieves the task ID from the data transfer,
   * calls the onMoveTask function to update the task's state, and resets the drag-over styling.
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onMoveTask(taskId, column.id);
    }
    setIsDragOver(false);
  };
  
  /**
   * Prevents the default behavior for dragover to allow dropping.
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex flex-col bg-[#161B22] rounded-lg h-full transition-colors ${isDragOver ? 'bg-gray-700' : ''}`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${column.color}`}></span>
          <h2 className="font-semibold text-white">{column.title}</h2>
          <span className="bg-gray-700 text-gray-400 text-xs font-bold px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-white">
            <PlusIcon className="h-5 w-5" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <DotsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-4 flex-grow overflow-y-auto space-y-4 custom-scrollbar">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onSelectTask={onSelectTask} />
        ))}
      </div>
    </div>
  );
};
