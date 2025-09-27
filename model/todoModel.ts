import mongoose from 'mongoose';

export interface Todo {
  title: string;
  description: string;
  dueDate: string;
  status: boolean;
  assignedTo: mongoose.Schema.Types.ObjectId;
  priority: string;
}

const TodoSchema = new mongoose.Schema<Todo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'low',
  },
});

export default mongoose.model('todo', TodoSchema);
