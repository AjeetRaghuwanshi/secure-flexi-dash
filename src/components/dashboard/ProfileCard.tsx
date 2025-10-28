import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar } from 'lucide-react';

interface Profile {
  full_name: string | null;
  email: string | null;
  created_at: string;
}

const ProfileCard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetchProfile();
    fetchTaskStats();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchTaskStats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('status')
        .eq('user_id', user.id);

      if (error) throw error;

      const stats = {
        total: data.length,
        completed: data.filter(t => t.status === 'completed').length,
        pending: data.filter(t => t.status === 'pending').length,
      };

      setTaskStats(stats);
    } catch (error) {
      console.error('Error fetching task stats:', error);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4 ring-4 ring-primary/20">
            <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white text-2xl">
              {getInitials(profile?.full_name || user?.email || null)}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{profile?.full_name || 'User'}</h3>
          <p className="text-sm text-muted-foreground">{profile?.email || user?.email}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Full Name:</span>
            <span className="font-medium">{profile?.full_name || 'Not set'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium text-xs">{profile?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Member since:</span>
            <span className="font-medium">
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : 'N/A'}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t space-y-3">
          <h4 className="font-semibold text-sm">Task Statistics</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-3 rounded-lg bg-muted">
              <p className="text-2xl font-bold text-primary">{taskStats.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted">
              <p className="text-2xl font-bold text-success">{taskStats.completed}</p>
              <p className="text-xs text-muted-foreground">Done</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted">
              <p className="text-2xl font-bold text-warning">{taskStats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
