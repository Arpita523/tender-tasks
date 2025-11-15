
import React, { useState, useCallback } from 'react';
import { Board } from './components/Board';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TaskDetailModal } from './components/TaskDetailModal';
import { initialTasks } from './data/initialData';
import type { Task, ColumnId, Comment } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  /**
   * Handles moving a task to a different column.
   * This is the core logic for the drag-and-drop functionality.
   * It finds the task by its ID and updates its status to the new column's ID.
   */
  const handleMoveTask = useCallback((taskId: string, newColumn: ColumnId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newColumn } : task
      )
    );
  }, []);

  /**
   * Handles opening the task detail modal.
   * Sets the selected task in the state, which triggers the modal to appear.
   */
  const handleSelectTask = useCallback((task: Task) => {
    setSelectedTask(task);
  }, []);

  /**
   * Handles closing the task detail modal.
   * Resets the selected task state to null.
   */
  const handleCloseModal = useCallback(() => {
    setSelectedTask(null);
  }, []);

  /**
   * Adds a new comment to a specific task.
   * It updates the comments array for the given taskId.
   */
  const handleAddComment = useCallback((taskId: string, comment: Comment) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, comments: [...task.comments, comment] }
          : task
      )
    );
    // Also update the selected task to show the new comment immediately
    setSelectedTask(prevSelectedTask =>
        prevSelectedTask && prevSelectedTask.id === taskId 
        ? { ...prevSelectedTask, comments: [...prevSelectedTask.comments, comment] }
        : prevSelectedTask
    );
  }, []);

  return (
    <div className="flex h-screen w-full text-gray-300 bg-[#0D1117]">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-4 md:p-6 overflow-x-auto">
          <Board
            tasks={tasks}
            onMoveTask={handleMoveTask}
            onSelectTask={handleSelectTask}
          />
        </main>
      </div>
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={handleCloseModal}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default App;
