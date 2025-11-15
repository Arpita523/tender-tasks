
import React, { useState } from 'react';
import type { Task, Comment } from '../types';
import { XIcon, CalendarIcon, PaperClipIcon } from './icons';
import { assignees } from '../data/initialData'; // For demo purposes to pick a current user

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  onAddComment: (taskId: string, comment: Comment) => void;
}

const statusStyles: Record<string, string> = {
  'In Progress': 'bg-blue-900/50 text-blue-300 border-blue-500/50',
  'Not Started': 'bg-orange-900/50 text-orange-300 border-orange-500/50',
  'To-Do List': 'bg-purple-900/50 text-purple-300 border-purple-500/50',
  'Completed': 'bg-green-900/50 text-green-300 border-green-500/50'
};

const priorityStyles: Record<string, string> = {
  'Low': 'bg-green-800/80 text-green-300 border-green-500/50',
  'Medium': 'bg-yellow-800/80 text-yellow-300 border-yellow-500/50',
  'High': 'bg-red-800/80 text-red-300 border-red-500/50',
};


export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  // In a real app, current user would come from auth context
  const currentUser = assignees['user4']; 

  /**
   * Handles the submission of a new comment.
   * It creates a new comment object and calls the onAddComment prop.
   * It also clears the input field.
   */
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        author: currentUser,
        text: newComment,
        timestamp: new Date().toISOString(),
      };
      onAddComment(task.id, comment);
      setNewComment('');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-[#161B22] text-gray-300 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col m-4"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{task.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XIcon className="h-6 w-6" />
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto custom-scrollbar flex-grow">
          <p className="text-gray-400 mb-6">{task.description}</p>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Assignee</p>
              <div className="flex items-center gap-2">
                <img src={task.assignee.avatarUrl} alt={task.assignee.name} className="w-8 h-8 rounded-full" />
                <span className="font-semibold text-white">{task.assignee.name}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Due Date</p>
              <div className="flex items-center gap-2 text-white">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span>{new Date(task.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
             <div>
              <p className="text-sm text-gray-500 mb-2">Status</p>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${statusStyles[task.status]}`}>
                {task.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Priority</p>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${priorityStyles[task.priority]}`}>
                {task.priority}
              </span>
            </div>
          </div>
          
          <div className="mb-6">
             <p className="text-sm text-gray-500 mb-2">Attachments ({task.attachmentsCount})</p>
             <div className="flex items-center gap-2 p-3 bg-[#21262D] rounded-md border border-gray-700">
                <PaperClipIcon className="h-5 w-5 text-gray-400" />
                <span className="text-white text-sm">Project-Blueprints.pdf</span>
             </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Comments</h3>
            <div className="space-y-4 max-h-48 overflow-y-auto custom-scrollbar pr-2">
              {task.comments.map(comment => (
                <div key={comment.id} className="flex items-start gap-3">
                  <img src={comment.author.avatarUrl} alt={comment.author.name} className="w-8 h-8 rounded-full mt-1" />
                  <div className="bg-[#21262D] p-3 rounded-lg flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-white text-sm">{comment.author.name}</p>
                      <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
                    </div>
                    <p className="text-sm text-gray-300">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        <footer className="p-4 border-t border-gray-700">
          <form onSubmit={handleCommentSubmit} className="flex items-start gap-3">
             <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full mt-1" />
            <div className="flex-grow">
               <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full bg-[#21262D] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                rows={2}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors">
                  Comment
                </button>
              </div>
            </div>
          </form>
        </footer>
      </div>
    </div>
  );
};
