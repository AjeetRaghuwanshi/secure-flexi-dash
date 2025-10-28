import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  status: z.enum(['pending', 'in-progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
});

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
}

interface TaskFormProps {
  task?: Task;
  onSuccess: () => void;
}

const TaskForm = ({ task, onSuccess }: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'pending');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState(task?.due_date?.split('T')[0] || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      taskSchema.parse({ title, description, status, priority });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        return;
      }
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const taskData = {
        title,
        description: description || null,
        status,
        priority,
        due_date: dueDate || null,
        user_id: user.id,
      };

      if (task) {
        const { error } = await supabase
          .from('tasks')
          .update(taskData)
          .eq('id', task.id);
        if (error) throw error;
        toast.success('Task updated successfully');
      } else {
        const { error } = await supabase.from('tasks').insert(taskData);
        if (error) throw error;
        toast.success('Task created successfully');
      }

      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Task description"
          rows={3}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
        disabled={loading}
      >
        {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
};

export default TaskForm;
