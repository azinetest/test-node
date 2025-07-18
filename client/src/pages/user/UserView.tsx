import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/ui/pageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { getUserById } from '@/api/users';
import { PERMISSIONS } from "@/constants/permissions";
import { CanAccess } from "@/guards/AccessControl";

// --- Interfaces (re-used from UserForm for consistency) ---
interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
}

interface Role {
  _id: string;
  name: string;
}

interface SubscribedService {
  service_id: string;
  service_name: string;
  price: number;
  environment: "production" | "sandbox";
  request_limit: number;
}

interface CompanyProfile {
  name: string;
  email: string;
}

interface UserData {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: 0 | 1; // Assuming 0 for inactive, 1 for active
  extra_user_limit: number;
  expired_at: string;
  role_id: string | Role; // Can be just ID string or a full Role object
  company_profile: CompanyProfile;
  subscribe_services: SubscribedService[];
  created_at: string;
  updated_at: string;
}

const UserView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("User ID not provided.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUserById(id);

        if (response.statusCode === 200 && response.status) {
          setUserData(response.data);
        } else {
          throw new Error(response.message || "Failed to fetch user details.");
        }
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err.message || "An unexpected error occurred.");
        toast({
          title: "Error",
          description: err.message || "Failed to load user details.",
          variant: "destructive",
        });
        navigate('/users'); // Redirect to users list on error
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
        <Button onClick={() => navigate('/users')} className="mt-4">Go Back to Users</Button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center text-muted-foreground p-4">
        <p>No user data found.</p>
        <Button onClick={() => navigate('/users')} className="mt-4">Go Back to Users</Button>
      </div>
    );
  }

  // Helper to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="View User Details" description={`Details for ${userData.first_name} ${userData.last_name}`} />

      <div className="space-y-8">
        {/* User Details Card */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div>
                <Label className="font-semibold">First Name:</Label>
                <p>{userData.first_name || 'N/A'}</p>
              </div>
              <div>
                <Label className="font-semibold">Last Name:</Label>
                <p>{userData.last_name || 'N/A'}</p>
              </div>
              <div>
                <Label className="font-semibold">Email:</Label>
                <p>{userData.email || 'N/A'}</p>
              </div>
              <div>
                <Label className="font-semibold">Phone:</Label>
                <p>{userData.phone || 'N/A'}</p>
              </div>
              <div>
                <Label className="font-semibold">Status:</Label>
                <p>{userData.status === 1 ? 'Active' : 'Inactive'}</p>
              </div>
              <div>
                <Label className="font-semibold">Extra User Limit:</Label>
                <p>{userData.extra_user_limit?.toString() || '0'}</p>
              </div>
              <div>
                <Label className="font-semibold">Expired At:</Label>
                <p>{formatDate(userData.expired_at)}</p>
              </div>
              <div>
                <Label className="font-semibold">Role:</Label>
                <p>{
                  typeof userData.role_id === 'object' && userData.role_id !== null
                    ? (userData.role_id as Role).name || 'N/A'
                    : typeof userData.role_id === 'string'
                      ? userData.role_id || 'N/A'
                      : 'N/A'
                }</p>
              </div>
              <div>
                <Label className="font-semibold">Created At:</Label>
                <p>{formatDate(userData.created_at)}</p>
              </div>
              <div>
                <Label className="font-semibold">Last Updated:</Label>
                <p>{formatDate(userData.updated_at)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Profile Card */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <Label className="font-semibold">Company Name:</Label>
                <p>{userData.company_profile?.name || 'N/A'}</p>
              </div>
              <div>
                <Label className="font-semibold">Company Email:</Label>
                <p>{userData.company_profile?.email || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscribed Services Card */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>Subscribed Services</CardTitle>
          </CardHeader>
          <CardContent>
            {userData.subscribe_services && userData.subscribe_services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userData.subscribe_services.map((service) => (
                  <div key={service.service_id} className="p-4 border rounded-lg shadow-sm bg-card">
                    <h4 className="text-base font-semibold mb-2">{service.service_name}</h4>
                    <p className="text-sm text-muted-foreground">Price: ${service.price}</p>
                    <p className="text-sm text-muted-foreground">Environment: {service.environment}</p>
                    <p className="text-sm text-muted-foreground">Request Limit: {service.request_limit}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No subscribed services.</p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-3 pt-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <CanAccess permission={PERMISSIONS.USER.UPDATE}>
            <Button onClick={() => navigate(`/users/edit/${id}`)}>
              Edit User
            </Button>
          </CanAccess>
        </div>
      </div>
    </div >
  );
};

export default UserView;