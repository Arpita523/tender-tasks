import React, { useState, useCallback, useMemo } from 'react';
import { Board } from './components/Board';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TaskDetailModal } from './components/TaskDetailModal';
import { AddTaskModal } from './components/AddTaskModal';
import { ListView } from './components/ListView';
import { initialTasks } from './data/initialData';
import type { Task, ColumnId, Comment } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [addingTaskToColumn, setAddingTaskToColumn] = useState<ColumnId | null>(null);

  /**
   * Handles moving a task to a different column (drag-and-drop).
   */
  const handleMoveTask = useCallback((taskId: string, newColumn: ColumnId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newColumn } : task
      )
    );
  }, []);

  /**
   * Opens the task detail modal.
   */
  const handleSelectTask = useCallback((task: Task) => {
    setSelectedTask(task);
  }, []);

  /**
   * Closes the task detail modal.
   */
  const handleCloseModal = useCallback(() => {
    setSelectedTask(null);
  }, []);

  /**
   * Adds a new comment to a task.
   */
  const handleAddComment = useCallback((taskId: string, comment: Comment) => {
    const updateTask = (task: Task) => 
        task.id === taskId
          ? { ...task, comments: [...task.comments, comment], commentsCount: task.comments.length + 1 }
          : task;

    setTasks(prevTasks => prevTasks.map(updateTask));
    
    setSelectedTask(prevSelectedTask =>
        prevSelectedTask ? updateTask(prevSelectedTask) : null
    );
  }, []);
  
  /**
   * Removes a task after user confirmation.
   */
  const handleRemoveTask = useCallback((taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      if (selectedTask?.id === taskId) {
        setSelectedTask(null);
      }
    }
  }, [selectedTask]);

  /**
   * Opens the "Add Task" modal for a specific column.
   */
  const handleOpenAddTaskModal = useCallback((columnId: ColumnId) => {
    setAddingTaskToColumn(columnId);
    setAddTaskModalOpen(true);
  }, []);
  
  /**
   * Closes the "Add Task" modal.
   */
  const handleCloseAddTaskModal = useCallback(() => {
    setAddTaskModalOpen(false);
    setAddingTaskToColumn(null);
  }, []);
  
  /**
   * Adds a new task to the list.
   */
  const handleAddTask = useCallback((newTaskData: Omit<Task, 'id' | 'commentsCount' | 'attachmentsCount' | 'comments'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      commentsCount: 0,
      attachmentsCount: 0,
      comments: [],
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    handleCloseAddTaskModal();
  }, [handleCloseAddTaskModal]);

  /**
   * Memoized filtering of tasks based on the search term.
   * This improves performance by avoiding re-calculation on every render.
   */
  const filteredTasks = useMemo(() => {
    if (!searchTerm) return tasks;
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  return (
    <div className="flex h-screen w-full text-gray-300 bg-[#0D1117]">
      <Sidebar />
      <div className="flex flex-col flex-grow min-w-0">
        <Header 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
        <main className="flex-grow p-4 md:p-6 overflow-auto custom-scrollbar">
          {viewMode === 'board' ? (
            <Board
              tasks={filteredTasks}
              onMoveTask={handleMoveTask}
              onSelectTask={handleSelectTask}
              onRemoveTask={handleRemoveTask}
              onOpenAddTaskModal={handleOpenAddTaskModal}
            />
          ) : (
            <ListView 
              tasks={filteredTasks}
              onSelectTask={handleSelectTask}
              onRemoveTask={handleRemoveTask}
            />
          )}
        </main>
      </div>
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={handleCloseModal}
          onAddComment={handleAddComment}
          onRemoveTask={handleRemoveTask}
        />
      )}
      {isAddTaskModalOpen && addingTaskToColumn && (
        <AddTaskModal 
          isOpen={isAddTaskModalOpen}
          onClose={handleCloseAddTaskModal}
          onAddTask={handleAddTask}
          columnId={addingTaskToColumn}
        />
      )}
    </div>
  );
};

export default App;