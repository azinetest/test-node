import React, { useState, useEffect } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPermissions } from '@/api/roles';
import { useToast } from '@/hooks/use-toast';
import { useParams } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const RoleForm = () => {
    const { toast } = useToast();
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(!!id);
    const [permissions, setPermissions] = useState<{ id: string; name: string }[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        permissions: selectedPermissions
    });


    // Fetch permissions
    useEffect(() => {
        getPermissions()
            .then((data) => {
                setPermissions(data);
            })
            .catch(() => {
                toast({
                    title: 'Error fetching permissions',
                    description: "Unable to load permissions from the server.",
                    variant: 'destructive',
                });
            });
    }, []);

    // Handle input change
    const handleInputChange = (field: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    // Handle checkbox toggle
    const handlePermissionToggle = (permissionId: string) => {
        setSelectedPermissions((prev) =>
            prev.includes(permissionId)
                ? prev.filter((id) => id !== permissionId)
                : [...prev, permissionId]
        );
    };

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            permissions: selectedPermissions,
        };

        console.log("Submitting Role:", payload);

        // Replace with actual create/update API logic
        toast({
            title: isEdit ? "Role updated" : "Role created",
            description: `Role "${formData.name}" has been ${isEdit ? "updated" : "created"} successfully.`,
        });
    };

    return (
        <>
            <PageHeader
                title={isEdit ? 'Edit Role' : 'Create Role'}
                description="Manage roles and permissions"
            />
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-sm font-medium">Role Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter role name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="transition-all duration-200 focus:scale-[1.02] hover:shadow-md"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                            <Input
                                id="description"
                                placeholder="Enter role description"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="transition-all duration-200 focus:scale-[1.02] hover:shadow-md"
                            />
                        </div>

                        {/* Permissions section */}
                        <div className="space-y-2 mt-4">
                            <Label className="text-sm font-medium">Permissions</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {permissions.map((perm) => (
                                    <label key={perm.id} className="flex items-center space-x-2">
                                        <Switch
                                            id="switch-1"
                                            checked={selectedPermissions.includes(perm.id)}
                                            onCheckedChange={() => handlePermissionToggle(perm.id)}
                                        />
                                        <span>{perm.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" className="mt-6">
                            {isEdit ? 'Update Role' : 'Create Role'}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default RoleForm;