import React from 'react';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <span className="badge badge-completed">Completed</span>;
      case 'in-progress': return <span className="badge badge-in-progress">In Progress</span>;
      default: return <span className="badge badge-pending">Pending</span>;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className={`task-card glass ${getPriorityClass(task.priority)}`}
    >
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        {getStatusBadge(task.status)}
      </div>
      <p className="task-desc">{task.description}</p>
      
      <div className="task-footer">
        <div className="task-date">
          <Calendar size={14} />
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
        </div>
        <div className="task-actions">
          <button className="action-btn" onClick={() => onEdit(task)} title="Edit">
            <Edit size={16} />
          </button>
          <button className="action-btn delete" onClick={() => onDelete(task._id)} title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
