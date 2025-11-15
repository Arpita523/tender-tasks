import React, { useState, useRef, useEffect } from 'react';
import { type Task, Priority } from '../types';
import { CalendarIcon, ChatAltIcon, PaperClipIcon, DotsHorizontalIcon } from './icons';

interface TaskCardProps {
  task: Task;
  onSelectTask: (task: Task) => void;
  onRemoveTask: (taskId: string) => void;
}

const statusStyles: Record<string, string> = {
  'In Progress': 'bg-blue-900/50 text-blue-300',
  'Not Started': 'bg-orange-900/50 text-orange-300',
  'To-Do List': 'bg-purple-900/50 text-purple-300',
  'Completed': 'bg-green-900/50 text-green-300'
};

const priorityStyles: Record<Priority, string> = {
  [Priority.Low]: 'bg-green-800/80 text-green-300',
  [Priority.Medium]: 'bg-yellow-800/80 text-yellow-300',
  [Priority.High]: 'bg-red-800/80 text-red-300',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onSelectTask, onRemoveTask }) => {
  const { title, description, assignee, dueDate, commentsCount, attachmentsCount, status, priority } = task;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * Effect to handle clicks outside of the dropdown menu to close it.
   * This provides a better user experience.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Handles starting the drag operation for a task card.
   */
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task.id);
  };
  
  /**
   * Handles the remove action, ensuring the menu closes.
   */
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    onRemoveTask(task.id);
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelectTask(task)}
      className="bg-[#21262D] rounded-lg p-4 border border-gray-700 cursor-pointer shadow-md hover:shadow-lg hover:border-blue-500 transform hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[status]}`}>
          {status}
        </span>
        <div className="relative" ref={menuRef}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(prev => !prev);
            }} 
            className="text-gray-500 hover:text-white p-1 rounded-full hover:bg-gray-600"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
          >
            <DotsHorizontalIcon className="h-5 w-5" />
          </button>
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-1 bg-[#2a3038] border border-gray-600 rounded-md shadow-lg z-10 w-28">
              <button 
                onClick={handleRemove}
                className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-900/50 rounded-md"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Assignee</p>
          <div className="flex items-center gap-2">
            <img src={assignee.avatarUrl} alt={assignee.name} className="w-6 h-6 rounded-full" />
            <span className="text-sm text-gray-300">{assignee.name}</span>
          </div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${priorityStyles[priority]}`}>
          {priority}
        </span>
      </div>
      <div className="border-t border-gray-700 pt-3 flex justify-between items-center text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span>{new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ChatAltIcon className="h-4 w-4" />
            <span>{commentsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <PaperClipIcon className="h-4 w-4" />
            <span>{attachmentsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};