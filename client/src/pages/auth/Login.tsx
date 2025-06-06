import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/api/auth';
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

  const handleSubmit = async (e) => {
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
    } catch (error) {
      if (error.errors) {
        // Show each validation error in its own toast
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl">
        {/* Left: Branding */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-10">
          <img src={idmeritLogo} alt="IDMerit" className="h-16 mb-4" />
          <h1 className="text-3xl font-bold text-white">
            Welcome to <span className="text-yellow-300">IDMKyx</span>
          </h1>
          <p className="mt-4 text-white text-lg max-w-sm text-center">
            Delivering on our vision of fighting fraud and creating trust in the digital world, one identity at a time.
          </p>
        </div>

        {/* Right: Login Form */}
        <div className="w-full lg:w-1/2 bg-white/50 backdrop-blur-md p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <LogIn className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Sign in to Your Account
            </h2>
            <p className="text-center text-gray-600">Enter your credentials below</p>

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
                  className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
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
                    className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;