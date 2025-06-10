import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/api/auth';
import { useTheme } from '@/contexts/ThemeContext';
import idmeritLogo from '@/assets/company/idmerit-logo.svg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, primaryColor } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.username || !formData.password) {
      toast({
        title: 'Validation error',
        description: 'Username and password are required.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(formData);
      toast({
        title: 'Login successful',
        description: response.message || 'Welcome back!',
        variant: 'default',
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.errors) {
        Object.entries(error.errors).map(([field, message]) => {
          toast({
            title: `Validation error in ${field}`,
            description: String(message),
            variant: 'destructive',
          });
        });
      } else {
        toast({
          title: 'Login failed',
          description: error.message || 'An unexpected error occurred.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Map primaryColor to gradient classes for consistency with DashboardLayout
  const getGradientClass = () => {
    if (primaryColor.startsWith('gradient-')) {
      return primaryColor;
    }
    const gradientMap: { [key: string]: string } = {
      blue: 'from-blue-600 to-cyan-500',
      purple: 'from-purple-600 to-pink-500',
      green: 'from-green-600 to-emerald-500',
      orange: 'from-orange-600 to-amber-500',
      red: 'from-red-600 to-rose-500',
      pink: 'from-pink-600 to-fuchsia-500',
      indigo: 'from-indigo-600 to-blue-500',
      teal: 'from-teal-600 to-cyan-500',
      emerald: 'from-emerald-600 to-green-500',
      amber: 'from-amber-600 to-orange-500',
      violet: 'from-violet-600 to-purple-500',
      fuchsia: 'from-fuchsia-600 to-pink-500',
      lime: 'from-lime-600 to-green-500',
      rose: 'from-rose-600 to-red-500',
      sky: 'from-sky-600 to-cyan-500',
    };
    return gradientMap[primaryColor] || 'from-blue-600 to-cyan-500';
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getGradientClass()} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-card/50 backdrop-blur-xl rounded-xl shadow-2xl relative z-10">
        {/* Left: Branding */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-10">
          <img src={idmeritLogo} alt="IDMerit" className="h-16 mb-4 filter brightness-110 hover:brightness-125 transition-all duration-300" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Welcome to <span className="text-primary">IDMKyx</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-sm text-center">
            Delivering on our vision of fighting fraud and creating trust in the digital world, one identity at a time.
          </p>
        </div>

        {/* Right: Login Form */}
        <div className="w-full lg:w-1/2 bg-card/95 backdrop-blur-xl p-8 rounded-lg lg:rounded-l-none">
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getGradientClass()} rounded-full flex items-center justify-center shadow-lg ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300`}>
                <LogIn className="w-6 h-6 text-white animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-foreground text-center">
              Sign in to Your Account
            </h2>
            <p className="text-center text-muted-foreground">Enter your credentials below</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username or email"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="rounded-lg border-border focus:ring-2 focus:ring-primary transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="rounded-lg border-border focus:ring-2 focus:ring-primary pr-10 transition-all duration-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 hover:bg-primary/10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground hover:text-primary" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground hover:text-primary" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className={`w-full bg-gradient-to-r ${getGradientClass()} hover:opacity-90 text-primary-foreground py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }

          .gradient-rainbow {
            background: linear-gradient(90deg, hsl(0 100% 50%), hsl(60 100% 50%), hsl(240 100% 50%));
          }
          .gradient-sunset {
            background: linear-gradient(90deg, hsl(24.6 95% 53.1%), hsl(322.2 84% 60.5%), hsl(262.1 83.3% 57.8%));
          }
          .gradient-ocean {
            background: linear-gradient(90deg, hsl(173.4 80.4% 40%), hsl(199.1 79.2% 54.1%), hsl(221.2 83.2% 53.3%));
          }
          .gradient-forest {
            background: linear-gradient(90deg, hsl(160.1 84.1% 39.4%), hsl(142.1 76.2% 36.3%), hsl(173.4 80.4% 40%));
          }
          .gradient-candy {
            background: linear-gradient(90deg, hsl(322.2 84% 60.5%), hsl(330.3 81.2% 60.4%), hsl(291.1 92.7% 65.3%));
          }
          .gradient-twilight {
            background: linear-gradient(90deg, hsl(231.7 48.6% 59%), hsl(262.1 83.3% 57.8%), hsl(263.4 70% 50.4%));
          }
        `}
      </style>
    </div>
  );
};

export default Login;