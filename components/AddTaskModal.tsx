import React, { useState } from 'react';
import { XIcon } from './icons';
import { assignees } from '../data/initialData';
import type { Task, ColumnId, Assignee } from '../types';
import { Priority } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id' | 'commentsCount' | 'attachmentsCount' | 'comments'>) => void;
  columnId: ColumnId;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask, columnId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState(assignees['user1'].id);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<Priority>(Priority.Medium);

  /**
   * Handles form submission, creates a new task object, and calls the onAddTask callback.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) {
        alert("Please fill in at least the title and due date.");
        return;
    };
    
    onAddTask({
      title,
      description,
      status: columnId,
      priority,
      dueDate,
      assignee: assignees[assigneeId],
    });

    // Reset form for next time
    setTitle('');
    setDescription('');
    setAssigneeId(assignees['user1'].id);
    setDueDate(new Date().toISOString().split('T')[0]);
    setPriority(Priority.Medium);
  };

  if (!isOpen) return null;

  const inputStyles = "w-full bg-[#21262D] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-[#161B22] rounded-lg shadow-xl w-full max-w-lg m-4" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Add New Task to "{columnId}"</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
              <XIcon className="h-6 w-6" />
          </button>
        </header>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Title <span className="text-red-500">*</span></label>
              <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className={inputStyles} required />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className={inputStyles} rows={3}></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="assignee" className="block text-sm font-medium text-gray-400 mb-1">Assignee</label>
                    <select id="assignee" value={assigneeId} onChange={e => setAssigneeId(e.target.value)} className={inputStyles}>
                        {Object.values(assignees).map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                    <select id="priority" value={priority} onChange={e => setPriority(e.target.value as Priority)} className={inputStyles}>
                        {Object.values(Priority).map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-400 mb-1">Due Date <span className="text-red-500">*</span></label>
              <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} className={inputStyles} required />
            </div>
          </div>
          <div className="flex justify-end pt-6">
            <button type="button" onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors mr-2">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};