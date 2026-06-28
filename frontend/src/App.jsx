import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';
import { toast } from 'react-toastify';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Filters and Sorting
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let query = `?sort=${sortBy}`;
      if (statusFilter) query += `&status=${statusFilter}`;
      if (priorityFilter) query += `&priority=${priorityFilter}`;
      
      const res = await axios.get(`${API_URL}${query}`);
      setTasks(res.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter, sortBy]);

  const handleCreateOrUpdate = async (taskData) => {
    try {
      if (editingTask) {
        await axios.put(`${API_URL}/${editingTask._id}`, taskData);
        toast.success('Task updated successfully');
      } else {
        await axios.post(API_URL, taskData);
        toast.success('Task created successfully');
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        toast.success('Task deleted');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      {/* Sidebar for Filtering and Sorting */}
      <aside className="sidebar">
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={20} className="accent-text" /> Filters
          </h2>
        </div>
        
        <div className="form-group">
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Priority</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group" style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={20} /> Sort By
          </h3>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Latest Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div>
            <h1>Task Mastery</h1>
            <p className="text-secondary" style={{ marginTop: '8px' }}>Manage your tasks effectively.</p>
          </div>
          <button className="btn btn-primary" onClick={openCreateModal}>
            <Plus size={18} /> New Task
          </button>
        </header>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <div className="loader">Loading...</div>
          </div>
        ) : tasks.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '100px', color: 'var(--text-secondary)' }}>
            <h2 style={{ marginBottom: '16px' }}>No tasks found</h2>
            <p>Try adjusting your filters or create a new task.</p>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onEdit={openEditModal} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </main>

      {/* Task Form Modal */}
      {isModalOpen && (
        <TaskForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateOrUpdate}
          initialData={editingTask}
        />
      )}
    </div>
  );
}

export default App;
