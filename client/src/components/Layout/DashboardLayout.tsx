import React, { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, LogOut, Moon, Sun, Palette, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { logout } from '@/api/auth';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import idmeritLogo from '@/assets/company/idmerit-logo.svg';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { theme, toggleTheme, primaryColor, setPrimaryColor } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      isActive: location.pathname === '/dashboard',
    },
    {
      title: 'Roles',
      icon: ShieldCheck,
      href: '/roles',
      isActive: location.pathname.startsWith('/roles'),
    },
  ];

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('token');
    navigate('/');
  };

  const colors = [
    { name: 'Blue', value: 'blue' },
    { name: 'Purple', value: 'purple' },
    { name: 'Green', value: 'green' },
    { name: 'Orange', value: 'orange' },
    { name: 'Red', value: 'red' },
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
    <div className={`flex flex-col h-full ${mobile ? 'p-4' : ''} bg-gradient-to-b from-card to-card/80 backdrop-blur-xl scrollbar-visible`}>
      <div className="flex items-center justify-center px-6 py-4 border-b border-border/50">
        <img src={idmeritLogo} alt="Dashboard Logo" className="h-10 w-auto max-w-[150px] object-contain"
        />
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-visible">
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-background/95 to-background/90">
        <style>
          {`
            .scrollbar-visible::-webkit-scrollbar {
              width: 8px;
            }
            .scrollbar-visible::-webkit-scrollbar-track {
              background: hsl(var(--background) / 0.1);
              border-radius: 4px;
            }
            .scrollbar-visible::-webkit-scrollbar-thumb {
              background: hsl(var(--primary) / 0.5);
              border-radius: 4px;
            }
            .scrollbar-visible::-webkit-scrollbar-thumb:hover {
              background: hsl(var(--primary));
            }
            /* Firefox */
            .scrollbar-visible {
              scrollbar-width: thin;
              scrollbar-color: hsl(var(--primary) / 0.5) hsl(var(--background) / 0.1);
            }
          `}
        </style>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 fixed top-0 left-0 h-screen border-r border-border/50 bg-card/50 backdrop-blur-xl">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64 bg-card/95 backdrop-blur-xl scrollbar-visible">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <SidebarInset className="md:ml-64">
          <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl supports-[backdrop-filter]:bg-card/30 sticky top-0 z-10">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden hover:scale-105 transition-transform">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-64 bg-card/95 backdrop-blur-xl scrollbar-visible">
                    <Sidebar mobile />
                  </SheetContent>
                </Sheet>
                <h1 className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {menuItems.find((item) => item.href === location.pathname)?.title || 'Dashboard'}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="hover:scale-105 transition-all duration-300 hover:bg-primary/10"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-amber-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-blue-600" />
                  )}
                </Button>

                {/* Color Picker */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:scale-105 transition-all duration-300 hover:bg-primary/10"
                    >
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
                            onClick={() => setPrimaryColor(color.value as typeof primaryColor)}
                            className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${primaryColor === color.value
                              ? 'border-foreground shadow-lg scale-110'
                              : 'border-transparent hover:border-muted-foreground'
                              }`}
                            style={{
                              backgroundColor: `hsl(${getColorHsl(color.value)})`,
                              boxShadow:
                                primaryColor === color.value
                                  ? `0 0 20px hsl(${getColorHsl(color.value)} / 0.5)`
                                  : undefined,
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
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full hover:scale-105 transition-all duration-300"
                    >
                      <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                        <AvatarImage src={user.profile_pic} alt="AB" />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                          {user.first_name.charAt(0) + user.last_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-card/95 backdrop-blur-xl border-border/50"
                    align="end"
                  >
                    <div className="flex items-center justify-start gap-2 p-3 border-b border-border/50">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.first_name + ' ' + user.last_name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="hover:bg-destructive/10 text-destructive transition-colors"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
          <footer className="border-t border-border/50 bg-card/30 backdrop-blur-xl supports-[backdrop-filter]:bg-card/30 px-6 py-4 mt-auto">
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-muted-foreground">Powered by IDMerit</p>
              <img
                src={idmeritLogo}
                alt="IDMerit Logo"
                className="h-6 w-auto max-w-[100px] object-contain"
              />
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;