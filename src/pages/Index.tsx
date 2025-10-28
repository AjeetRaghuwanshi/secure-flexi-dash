import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CheckCircle2, LayoutDashboard, Lock, Zap } from 'lucide-react';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary">
      <nav className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TaskManager Pro
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Manage Your Tasks with{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Modern Efficiency
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A powerful task management platform built with React, TypeScript, and modern security practices.
              Perfect for demonstrating full-stack development skills.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6"
            >
              Create Free Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-6"
            >
              Sign In
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4 mx-auto">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-muted-foreground">
                JWT-based auth with password hashing, email validation, and protected routes
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4 mx-auto">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Full CRUD Operations</h3>
              <p className="text-muted-foreground">
                Create, read, update, and delete tasks with search and filter capabilities
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Tech Stack</h3>
              <p className="text-muted-foreground">
                Built with React, TypeScript, TailwindCSS, and PostgreSQL database
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-xl bg-card shadow-[var(--shadow-elegant)] border">
            <h2 className="text-2xl font-bold mb-4">Features Overview</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
              {[
                'User registration and login with validation',
                'Secure password hashing (bcrypt)',
                'JWT token-based authentication',
                'Protected dashboard routes',
                'Task CRUD with status & priority',
                'Search and filter functionality',
                'User profile management',
                'Responsive design for all devices',
                'Error handling & loading states',
                'Clean, scalable code architecture',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with React, TypeScript, Lovable Cloud (PostgreSQL), and TailwindCSS</p>
          <p className="mt-2">Demonstrates full-stack development with modern security practices</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
