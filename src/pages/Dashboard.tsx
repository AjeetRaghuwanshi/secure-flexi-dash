import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TaskList from '@/components/dashboard/TaskList';
import TaskForm from '@/components/dashboard/TaskForm';
import ProfileCard from '@/components/dashboard/ProfileCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Dashboard = () => {
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskCreated = () => {
    setIsCreateDialogOpen(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Manage your tasks and profile</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <TaskForm onSuccess={handleTaskCreated} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <TaskList refreshTrigger={refreshTrigger} onTaskUpdated={() => setRefreshTrigger(prev => prev + 1)} />
          </div>
          <div>
            <ProfileCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
