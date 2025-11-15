import React from 'react';
import type { Task } from '../types';
import { Priority } from '../types';
import { TrashIcon } from './icons';

interface ListViewProps {
  tasks: Task[];
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

export const ListView: React.FC<ListViewProps> = ({ tasks, onSelectTask, onRemoveTask }) => {
  if (tasks.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No tasks found. Try clearing your search.</div>;
  }
  return (
    <div className="bg-[#161B22] rounded-lg border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[768px] text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-[#21262D]">
            <tr>
              <th scope="col" className="px-6 py-3">Task Title</th>
              <th scope="col" className="px-6 py-3">Assignee</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Priority</th>
              <th scope="col" className="px-6 py-3">Due Date</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-b border-gray-700 hover:bg-[#21262D] cursor-pointer group" onClick={() => onSelectTask(task)}>
                <td className="px-6 py-4 font-medium text-white">{task.title}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img src={task.assignee.avatarUrl} alt={task.assignee.name} className="w-6 h-6 rounded-full" />
                    <span>{task.assignee.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[task.status]}`}>{task.status}</span></td>
                <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${priorityStyles[task.priority]}`}>{task.priority}</span></td>
                <td className="px-6 py-4">{new Date(task.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      onRemoveTask(task.id); 
                    }} 
                    className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Delete task ${task.title}`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};