
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft, Home } from 'lucide-react';

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900 p-4">
      <Card className="w-full max-w-lg shadow-xl backdrop-blur-sm bg-card/95 animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center animate-scale-in">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            403
          </CardTitle>
          <CardDescription className="text-lg">
            Access Forbidden
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
            </p>

            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                onClick={() => navigate(-2)}
              >
                <Home className="w-4 h-4 mr-2" />
                Go To Back
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Error Code: 403 - Forbidden Access
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forbidden;
