
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, TrendingUp, Calendar } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,421',
      change: '+180.1%',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Active Projects',
      value: '127',
      change: '+19%',
      icon: FileText,
      trend: 'up',
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+201.3%',
      icon: TrendingUp,
      trend: 'up',
    },
    {
      title: 'Events',
      value: '32',
      change: '+4.1%',
      icon: Calendar,
      trend: 'up',
    },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Created new project', time: '2 minutes ago', status: 'success' },
    { user: 'Jane Smith', action: 'Updated profile', time: '5 minutes ago', status: 'info' },
    { user: 'Mike Johnson', action: 'Deleted file', time: '10 minutes ago', status: 'warning' },
    { user: 'Sarah Wilson', action: 'Joined team', time: '15 minutes ago', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest activities from your team.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      activity.status === 'success' ? 'default' :
                      activity.status === 'warning' ? 'destructive' : 'secondary'
                    }
                  >
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Project Overview */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>
              Current project status and progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Website Redesign</p>
                <p className="text-sm text-muted-foreground">75%</p>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Mobile App</p>
                <p className="text-sm text-muted-foreground">45%</p>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">API Development</p>
                <p className="text-sm text-muted-foreground">90%</p>
              </div>
              <Progress value={90} className="h-2" />
            </div>
            <div className="pt-4">
              <Button className="w-full">View All Projects</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
