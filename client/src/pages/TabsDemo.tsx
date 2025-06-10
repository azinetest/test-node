
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Settings, 
  ChartBar, 
  Bell, 
  Shield, 
  Palette,
  Code,
  Star,
  Heart,
  Zap,
  Sparkles,
  Globe,
  Camera
} from "lucide-react";

const TabsDemo = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Enhanced Tabs Collection
        </h1>
        <p className="text-muted-foreground text-lg">
          Beautiful tab components with multiple styling variants and smooth animations
        </p>
      </div>

      {/* Modern Variant */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Modern Dashboard
          </CardTitle>
          <CardDescription>
            Clean and modern tab design with subtle animations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList variant="modern" className="grid w-full grid-cols-4">
              <TabsTrigger variant="modern" value="overview" className="flex items-center gap-2">
                <ChartBar className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger variant="modern" value="team" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team
              </TabsTrigger>
              <TabsTrigger variant="modern" value="projects" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger variant="modern" value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent variant="modern" value="overview" className="space-y-4">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Project Overview</h3>
                <p className="text-muted-foreground">
                  Get insights into your project performance and team productivity.
                </p>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600">
                  View Analytics
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent variant="modern" value="team">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Team Management</h3>
                <p className="text-muted-foreground">Manage team members and their roles.</p>
              </div>
            </TabsContent>
            
            <TabsContent variant="modern" value="projects">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Active Projects</h3>
                <p className="text-muted-foreground">Overview of all ongoing projects.</p>
              </div>
            </TabsContent>
            
            <TabsContent variant="modern" value="settings">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Project Settings</h3>
                <p className="text-muted-foreground">Configure project preferences.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Colorful Variant */}
      <Card className="shadow-xl bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950 dark:via-purple-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-pink-500" />
            Colorful Experience
          </CardTitle>
          <CardDescription>
            Vibrant and eye-catching design with rainbow gradients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList variant="colorful" className="grid w-full grid-cols-3">
              <TabsTrigger variant="colorful" value="gallery" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Gallery
              </TabsTrigger>
              <TabsTrigger variant="colorful" value="favorites" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Favorites
              </TabsTrigger>
              <TabsTrigger variant="colorful" value="trending" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Trending
              </TabsTrigger>
            </TabsList>
            
            <TabsContent variant="colorful" value="gallery" className="space-y-4">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Photo Gallery
                </h3>
                <p className="text-muted-foreground">
                  Browse through your beautiful photo collections.
                </p>
                <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  Upload Photos
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent variant="colorful" value="favorites">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Your Favorites</h3>
                <p className="text-muted-foreground">Collection of your most loved items.</p>
              </div>
            </TabsContent>
            
            <TabsContent variant="colorful" value="trending">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Trending Now</h3>
                <p className="text-muted-foreground">See what's popular in the community.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Glass Effect Variant */}
      <Card className="shadow-2xl bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            Glass Morphism
          </CardTitle>
          <CardDescription>
            Modern glass effect with backdrop blur and transparency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="design" className="w-full">
            <TabsList variant="glass" className="grid w-full grid-cols-3">
              <TabsTrigger variant="glass" value="design">
                Design
              </TabsTrigger>
              <TabsTrigger variant="glass" value="develop">
                Develop
              </TabsTrigger>
              <TabsTrigger variant="glass" value="deploy">
                Deploy
              </TabsTrigger>
            </TabsList>
            
            <TabsContent variant="glass" value="design" className="space-y-4">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Design Phase</h3>
                <p className="text-muted-foreground">
                  Create beautiful and intuitive user interfaces.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent variant="glass" value="develop">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Development</h3>
                <p className="text-muted-foreground">Build robust and scalable applications.</p>
              </div>
            </TabsContent>
            
            <TabsContent variant="glass" value="deploy">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Deployment</h3>
                <p className="text-muted-foreground">Launch your application to the world.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Minimal Variant */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-green-500" />
            Minimal Design
          </CardTitle>
          <CardDescription>
            Clean and simple design focused on content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="code" className="w-full">
            <TabsList variant="minimal" className="grid w-full grid-cols-3">
              <TabsTrigger variant="minimal" value="code">
                Code
              </TabsTrigger>
              <TabsTrigger variant="minimal" value="preview">
                Preview
              </TabsTrigger>
              <TabsTrigger variant="minimal" value="docs">
                Docs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent variant="minimal" value="code" className="space-y-4">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Code Editor</h3>
                <p className="text-muted-foreground text-sm">
                  Write and edit your code with syntax highlighting.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent variant="minimal" value="preview">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <p className="text-muted-foreground text-sm">See your changes in real-time.</p>
              </div>
            </TabsContent>
            
            <TabsContent variant="minimal" value="docs">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Documentation</h3>
                <p className="text-muted-foreground text-sm">Read the comprehensive guides.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TabsDemo;