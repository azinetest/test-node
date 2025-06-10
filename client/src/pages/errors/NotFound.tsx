import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Home, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-6">
      <Card className="w-full max-w-xl shadow-lg backdrop-blur-md bg-card/90 border border-border">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-5xl font-extrabold tracking-tight">404</CardTitle>
          <CardDescription className="text-lg mt-2">
            Page Not Found
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Sorry, the page you're looking for doesn't exist. It might have been removed, renamed, or did not exist in the first place.
            </p>

            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                onClick={() => navigate(-1)}
              >
                <Home className="w-4 h-4 mr-2" />
                Go To Back
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
            <p>If you think this is a mistake, please contact support.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;