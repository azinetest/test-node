import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { CanAccess } from "@/guards/AccessControl";
import { getServices } from "@/api/services";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/ui/pageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TextCard from '@/components/ui/text-card';

interface Service {
    _id: string;
    name: string;
    slug: string;
    prefix: string;
    status: string;
    mastersheet: string;
    description: string;
}
interface SubscribeService {
    service_id: string;
    service_name: string;
    environment: string;
    request_limit: number;
    price: number;
}

// Array of vibrant Tailwind CSS gradients for random assignment (Expanded)
const gradients = [
    "bg-gradient-to-br from-red-400 to-pink-500",
    "bg-gradient-to-br from-blue-400 to-blue-600",
    "bg-gradient-to-br from-purple-500 to-purple-700",
    "bg-gradient-to-br from-green-400 to-teal-500",
    "bg-gradient-to-br from-yellow-400 to-orange-500",
    "bg-gradient-to-br from-indigo-400 to-purple-500",
    "bg-gradient-to-br from-pink-400 to-red-500",
    "bg-gradient-to-br from-cyan-400 to-blue-500",
    "bg-gradient-to-br from-lime-400 to-green-600",
    "bg-gradient-to-br from-fuchsia-500 to-purple-600",
    "bg-gradient-to-br from-emerald-400 to-teal-600",
    "bg-gradient-to-br from-rose-400 to-red-600",
    "bg-gradient-to-br from-amber-400 to-yellow-600",
    "bg-gradient-to-br from-sky-400 to-indigo-600",
    "bg-gradient-to-br from-violet-400 to-fuchsia-600",
    "bg-gradient-to-br from-orange-400 to-red-600",
    "bg-gradient-to-br from-teal-400 to-cyan-600",
    "bg-gradient-to-br from-gray-400 to-gray-600",
];

const ServiceList = () => {
    const { user } = useUser();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const checkServiceSubscibed = (serviceId: string) => {
        return false;
        // if (!Array.isArray(user?.subscribe_services)) return false;
        // return (user.subscribe_services as SubscribeService[]).some(
        //     (subService) => subService.service_id === serviceId
        // );
    }
    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getServices();
                if (response.statusCode !== 200) {
                    toast({
                        title: "Error",
                        description: "Unable to load services from the server.",
                        variant: "destructive",
                    });
                    navigate(-1);
                }
                setServices(response.data || []);
            } catch (err: any) {
                console.error("Error fetching services:", err);
                setError(err.message || "Failed to fetch services.");
                toast({
                    title: "Error",
                    description: err.message || "Failed to load services.",
                    variant: "destructive",
                });
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };
        fetchServicesData();
    }, [toast]); // Dependency array includes toast to prevent lint warnings, though it's stable

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Loading services...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                <p>{error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Services"
                description="Manage your available services and their configurations."
            />
            {services.length === 0 ? (
                <div className="text-center text-muted-foreground p-8 border rounded-lg bg-card shadow-sm">
                    <p>No services found. Click "Create New Service" to add one.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <TextCard
                            key={service._id}
                            title={service.name}
                            subtitle={service.slug} // Using slug as subtitle, adjust as needed
                            description={service.description || "No description available."}
                            // icon={getServiceIcon(service.name)}
                            gradient={gradients[index]}
                            isSubscribed={checkServiceSubscibed(service._id)}
                            isDisabled={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ServiceList;
/* import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { CanAccess } from "@/guards/AccessControl";
import { getServices } from "@/api/services";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/ui/pageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TextCard from '@/components/ui/text-card'; // Assuming this component exists
import { FileText, Briefcase, Heart, Settings, Package, Zap, Cloud, Database, Shield, Lock, Globe, Layers, TrendingUp } from 'lucide-react'; // Import more icons

interface Service {
    _id: string;
    name: string;
    slug: string;
    prefix: string;
    status: string; // e.g., "active", "inactive"
    mastersheet: string;
    description?: string; // Added optional description as it's used in TextCard
}

// Assuming UserContext provides a user object with subscribed_services
interface UserContextType {
    user: {
        _id: string;
        roles: string[]; // Assuming roles are string IDs
        subscribe_services?: { service_id: string }[]; // Array of objects with service_id
    } | null;
}

// Array of vibrant Tailwind CSS gradients for random assignment (Expanded)
const gradients = [
    "bg-gradient-to-br from-red-400 to-pink-500",
    "bg-gradient-to-br from-blue-400 to-blue-600",
    "bg-gradient-to-br from-purple-500 to-purple-700",
    "bg-gradient-to-br from-green-400 to-teal-500",
    "bg-gradient-to-br from-yellow-400 to-orange-500",
    "bg-gradient-to-br from-indigo-400 to-purple-500",
    "bg-gradient-to-br from-pink-400 to-red-500",
    "bg-gradient-to-br from-cyan-400 to-blue-500",
    "bg-gradient-to-br from-lime-400 to-green-600",
    "bg-gradient-to-br from-fuchsia-500 to-purple-600",
    "bg-gradient-to-br from-emerald-400 to-teal-600",
    "bg-gradient-to-br from-rose-400 to-red-600",
    "bg-gradient-to-br from-amber-400 to-yellow-600",
    "bg-gradient-to-br from-sky-400 to-indigo-600",
    "bg-gradient-to-br from-violet-400 to-fuchsia-600",
    "bg-gradient-to-br from-orange-400 to-red-600",
    "bg-gradient-to-br from-teal-400 to-cyan-600",
    "bg-gradient-to-br from-gray-400 to-gray-600", // Keep a muted one for disabled or specific cases
];

// Helper function to get a random gradient
const getRandomGradient = () => {
    return gradients[Math.floor(Math.random() * gradients.length)];
};

// Helper function to get an icon based on service name/slug
const getServiceIcon = (serviceName: string) => {
    const lowerCaseName = serviceName.toLowerCase();
    if (lowerCaseName.includes("kyc")) return <FileText size={32} />;
    if (lowerCaseName.includes("kyb")) return <Briefcase size={32} />;
    if (lowerCaseName.includes("aml")) return <Heart size={32} />;
    if (lowerCaseName.includes("security")) return <Shield size={32} />;
    if (lowerCaseName.includes("data")) return <Database size={32} />;
    if (lowerCaseName.includes("api")) return <Zap size={32} />;
    if (lowerCaseName.includes("cloud")) return <Cloud size={32} />;
    if (lowerCaseName.includes("global")) return <Globe size={32} />;
    if (lowerCaseName.includes("analytics")) return <TrendingUp size={32} />;
    if (lowerCaseName.includes("management")) return <Layers size={32} />;
    return <Package size={32} />; // Default icon
};

const ServiceList = () => {
    const { user } = useUser() as UserContextType; // Type assertion for user context
    const { toast } = useToast();
    const navigate = useNavigate();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getServices();
                if (response.statusCode !== 200) {
                    throw new Error(response.message || "Unable to load services from the server.");
                }
                setServices(response.data || []);
            } catch (err: any) {
                console.error("Error fetching services:", err);
                setError(err.message || "Failed to fetch services.");
                toast({
                    title: "Error",
                    description: err.message || "Failed to load services.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchServicesData();
    }, [toast]);

    const handleCardClick = (serviceId: string) => {
        // Navigate to a service detail page or perform an action
        navigate(`/services/view/${serviceId}`);
    };

    // Determine if a service is subscribed by the current user
    const isServiceSubscribed = useCallback((serviceId: string): boolean => {
        return user?.subscribe_services?.some(s => s.service_id === serviceId) || false;
    }, [user?.subscribe_services]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Loading services...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                <p>{error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Services"
                description="Explore and manage your available services."
            />

            <div className="flex justify-end mb-4">
                <CanAccess requiredPermissions={['service.create']}>
                    <Button onClick={() => navigate("/services/create")}>
                        Create New Service
                    </Button>
                </CanAccess>
            </div>

            {services.length === 0 ? (
                <div className="text-center text-muted-foreground p-8 border rounded-lg bg-card shadow-sm">
                    <p>No services found. Click "Create New Service" to add one.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const isSubscribed = isServiceSubscribed(service._id);
                        const isDisabled = service.status !== 'active'; // Example: disable if status is not 'active'

                        return (
                            <TextCard
                                key={service._id}
                                title={service.name}
                                subtitle={service.slug} // Using slug as subtitle, adjust as needed
                                description={service.description || "No description available."}
                                icon={getServiceIcon(service.name)}
                                gradient={getRandomGradient()} // Random gradient for each card
                                onClick={() => handleCardClick(service._id)}
                                isSubscribed={isSubscribed}
                                isDisabled={isDisabled}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ServiceList; */