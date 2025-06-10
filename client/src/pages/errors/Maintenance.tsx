
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, ArrowLeft, RefreshCw, Clock } from 'lucide-react';

const Maintenance = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900 p-4">
      <Card className="w-full max-w-lg shadow-xl backdrop-blur-sm bg-card/95 animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center animate-scale-in">
              <Wrench className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Under Maintenance
          </CardTitle>
          <CardDescription className="text-lg">
            We'll be back shortly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              We're currently performing scheduled maintenance to improve your experience. Please check back in a few minutes.
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-6 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Estimated downtime: 30 minutes</span>
            </div>
            
            <div className="space-y-3">
              <Button onClick={handleRefresh} className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Check Again
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Thank you for your patience while we improve our services.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Maintenance;
