import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskForm = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
      });
    }
  }, [initialData]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "Title is required";
    else if (formData.title.length > 50) tempErrors.title = "Title max 50 chars";
    
    if (formData.description && formData.description.length > 500) {
      tempErrors.description = "Description max 500 chars";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="modal-content glass"
      >
        <div className="modal-header">
          <h2>{initialData ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="action-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="Task title" 
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Description"
              rows="3"
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Due Date</label>
            <input 
              type="date" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TaskForm;
