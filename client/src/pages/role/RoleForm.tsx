import React, { useState, useEffect } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPermissions, createRole, getRoleById, updateRole } from '@/api/roles';
import { useToast } from '@/hooks/use-toast';
import { useParams, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Import Card components

const RoleForm = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(!!id);

  const [permissions, setPermissions] = useState<any[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[], // Explicitly type as string[]
    status: true
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Fetch permissions
    getPermissions()
      .then((data) => {
        if (data.statusCode !== 200) {
          toast({
            title: "Error fetching permissions",
            description: "Unable to load permissions from the server.",
            variant: "destructive",
          });
        } else {
          setPermissions(data.data);
        }
      })
      .catch((error) => {
        toast({
          title: "Error fetching permissions",
          description: error.message || "Unable to load permissions from the server.",
          variant: "destructive",
        });
      });

    // Fetch role data if in edit mode
    const fetchRole = async () => {
      if (isEdit && id) {
        try {
          const role = await getRoleById(id);
          if (role.statusCode === 200 && role.data) {
            const fetchedPermissions = role.data.permissions.map((permission) => permission._id);
            setSelectedPermissions(fetchedPermissions);
            setFormData({
              name: role.data.name,
              description: role.data.description,
              permissions: fetchedPermissions, // Set permissions in formData as well
              status: Boolean(role.data.status),
            });
          } else {
            toast({
              title: "Role Not Found",
              description: "The requested role could not be found.",
              variant: "destructive",
            });
            navigate("/roles"); // Redirect if role not found
          }
        } catch (error: any) {
          toast({
            title: "Error fetching role data",
            description: error.message || "Unable to load role details.",
            variant: "destructive",
          });
          navigate("/roles"); // Redirect on error
        }
      }
    };
    fetchRole();
  }, [id, isEdit, navigate, toast]); // Added dependencies

  const getErrorForField = (field: string) => {
    // A more generic way to find errors
    const specificError = errors.find(err => err.toLowerCase().includes(field.toLowerCase().replace('_', ' ')));
    return specificError;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleStatusToggle = (value: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      status: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    if (!formData.name.trim()) {
      newErrors.push("Role name is required");
    }
    if (!formData.description.trim()) {
      newErrors.push("Description is required");
    }
    if (selectedPermissions.length === 0) {
      newErrors.push("At least one permission must be selected");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast({
        title: "Validation Error",
        description: (
          <ul className="list-disc pl-4">
            {newErrors.map((err, i) => (
              <li key={i} className="text-sm">{err}</li>
            ))}
          </ul>
        ),
        variant: "destructive",
      });
      return;
    }

    setErrors([]); // Clear errors if validation passes

    const payload = {
      ...formData,
      permissions: selectedPermissions, // Ensure permissions are from selectedPermissions state
    };

    const action = isEdit
      ? updateRole(id!, payload) // Use id! as it's guaranteed to exist in edit mode
      : createRole(payload);

    action
      .then((role) => {
        toast({
          title: isEdit ? "Role updated" : "Role created",
          description: `Role "${formData.name}" has been ${isEdit ? "updated" : "created"} successfully.`,
        });
        navigate(-1); // Navigate back after successful operation
      })
      .catch((error) => {
        if (error.statusCode && error.statusCode === 422) {
          const apiErrors = error.errors || {};
          const errorMessages = Object.entries(apiErrors)
            .map(([field, msg]) => (
              <li key={field} className="text-sm">
                <span className="font-semibold capitalize">{field.replace(/_/g, ' ')}</span>: {String(msg)}
              </li>
            ));
          toast({
            title: "Validation Error",
            description: <ul className="list-disc pl-4">{errorMessages}</ul>,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: error.message || "Something went wrong while saving the role.",
            variant: "destructive",
          });
        }
      });
  };

  const groupPermissionsByModule = (permissions: any[]) => {
    return permissions.reduce((acc, perm) => {
      const module = perm.module || "Other";
      if (!acc[module]) {
        acc[module] = [];
      }
      acc[module].push(perm);
      return acc;
    }, {} as Record<string, typeof permissions>);
  };

  const groupedPermissions = groupPermissionsByModule(permissions);

  return (
    // Removed `h-full` or fixed height classes from this main div if they were present before.
    // The `space-y-6` provides vertical spacing. `animate-fade-in` is fine.
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title={isEdit ? 'Edit Role' : 'Create Role'}
        description="Manage roles and permissions"
      />

      {/* The form itself. `w-full` is fine. */}
      <form className="space-y-8 w-full" onSubmit={handleSubmit}>
        {/* Role Details Section */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>Role Details</CardTitle>
            <CardDescription>Basic information and status for the role.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Role Name */}
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Role Name <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter role name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full mt-1"
                />
                {getErrorForField('name') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('name')}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="description"
                  placeholder="Enter role description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full mt-1"
                />
                {getErrorForField('description') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('description')}</p>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center space-x-2 pt-6 md:pt-0"> {/* Adjust padding for alignment */}
                <Label htmlFor="status" className="text-sm font-medium">
                  Status
                </Label>
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={handleStatusToggle}
                />
                <span className="text-sm">{formData.status ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions Section */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Select the permissions for this role.</CardDescription>
          </CardHeader>
          <CardContent>
            {getErrorForField('permissions') && (
              <p className="text-sm text-red-600 mb-4">{getErrorForField('permissions')}</p>
            )}
            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([moduleName, perms]) => {
                const permsArray = perms as any[];
                const allSelected = permsArray.every(p => selectedPermissions.includes(p._id));

                const toggleAllInModule = () => {
                  if (allSelected) {
                    setSelectedPermissions(prev =>
                      prev.filter(id => !permsArray.some(p => p._id === id))
                    );
                  } else {
                    const newIds = permsArray
                      .map(p => p._id)
                      .filter(id => !selectedPermissions.includes(id));
                    setSelectedPermissions(prev => [...prev, ...newIds]);
                  }
                };

                return (
                  <div key={moduleName} className="border p-4 rounded-lg bg-background/50 shadow-inner">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-border/50">
                      <h3 className="font-semibold text-lg">{moduleName} Permissions</h3>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={allSelected}
                          onCheckedChange={toggleAllInModule}
                        />
                        <span className="text-sm text-muted-foreground">
                          {allSelected ? 'Unselect All' : 'Select All'}
                        </span>
                      </div>
                    </div>
                    {/* The `grid` layout will naturally expand as needed.
                        If you have many permissions and want a scrollbar specifically within this section,
                        you could add `max-h-96 overflow-y-auto` (adjust max-h as needed) here:
                    */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3">
                      {permsArray.map((perm) => (
                        <label key={perm._id} className="flex items-center space-x-2 cursor-pointer py-1">
                          <Switch
                            checked={selectedPermissions.includes(perm._id)}
                            onCheckedChange={() => handlePermissionToggle(perm._id)}
                          />
                          <span className="text-sm font-medium text-foreground">{perm.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;