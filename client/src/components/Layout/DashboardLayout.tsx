import React from 'react';
import { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, Settings, User, LogOut, Moon, Sun, Palette, LayoutDashboard } from 'lucide-react';
import { logout } from '@/api/auth';
import { useAuth } from '@/contexts/AuthContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { theme, toggleTheme, primaryColor, setPrimaryColor } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      isActive: location.pathname === "/dashboard",
    },
  ];

  const handleLogout = async () => {
    // In a real app, this would clear auth tokens
    await logout();
    localStorage.removeItem('token');
    navigate('/');
  };

  const colors = [
    { name: 'Blue', value: 'blue' as const },
    { name: 'Purple', value: 'purple' as const },
    { name: 'Green', value: 'green' as const },
    { name: 'Orange', value: 'orange' as const },
    { name: 'Red', value: 'red' as const },
  ];

  const getColorHsl = (colorValue: string) => {
    const colorMap = {
      blue: '221.2 83.2% 53.3%',
      purple: '262.1 83.3% 57.8%',
      green: '142.1 76.2% 36.3%',
      orange: '24.6 95% 53.1%',
      red: '346.8 77.2% 49.8%',
    };
    return colorMap[colorValue as keyof typeof colorMap] || colorMap.blue;
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? 'p-4' : ''} bg-gradient-to-b from-card to-card/80 backdrop-blur-xl`}>
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border/50">
        <div className="w-8 h-8 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">D</span>
        </div>
        <span className="font-semibold text-lg bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Dashboard</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = item.isActive;
          return (
            <Link
              key={item.title}
              to={item.href}
              onClick={() => mobile && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] group ${isActive
                ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25'
                : 'hover:bg-gradient-to-r hover:from-muted hover:to-muted/50 hover:shadow-md'
                }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <item.icon className={`h-5 w-5 transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
              <span className="font-medium">{item.title}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 border-r border-border/50 bg-card/50 backdrop-blur-xl">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-card/95 backdrop-blur-xl">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl supports-[backdrop-filter]:bg-card/30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden hover:scale-105 transition-transform">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64 bg-card/95 backdrop-blur-xl">
                  <Sidebar mobile />
                </SheetContent>
              </Sheet>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {menuItems.find(item => item.href === location.pathname)?.title || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:scale-105 transition-all duration-300 hover:bg-primary/10">
                {theme === 'dark' ?
                  <Sun className="h-5 w-5 text-amber-500" /> :
                  <Moon className="h-5 w-5 text-blue-600" />
                }
              </Button>

              {/* Color Picker */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:scale-105 transition-all duration-300 hover:bg-primary/10">
                    <Palette className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50">
                  <div className="p-3">
                    <p className="text-sm font-medium mb-3 text-center">Choose Theme Color</p>
                    <div className="grid grid-cols-5 gap-3">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setPrimaryColor(color.value)}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${primaryColor === color.value
                            ? 'border-foreground shadow-lg scale-110'
                            : 'border-transparent hover:border-muted-foreground'
                            }`}
                          style={{
                            backgroundColor: `hsl(${getColorHsl(color.value)})`,
                            boxShadow: primaryColor === color.value ? `0 0 20px hsl(${getColorHsl(color.value)} / 0.5)` : undefined
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:scale-105 transition-all duration-300">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-xl border-border/50" align="end">
                  <div className="flex items-center justify-start gap-2 p-3 border-b border-border/50">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.first_name + ' ' + user.last_name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem onClick={() => navigate('/dashboard/profile')} className="hover:bg-primary/10 transition-colors">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-destructive/10 text-destructive transition-colors">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-background/50 to-background">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
