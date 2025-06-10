import React, { useState, useEffect } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPermissions, createRole, getRoleById, updateRole } from '@/api/roles';
import { useToast } from '@/hooks/use-toast';
import { useParams, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

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
    permissions: selectedPermissions,
    status: true
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
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
    const fetchRole = async () => {
      if (isEdit) {
        const role = await getRoleById(id);
        if (role.statusCode == 200 && role.data == null) {
          toast({
            title: "Not Found",
            description: "Role is not found.",
            variant: "destructive",
          });
        }
        setSelectedPermissions(role.data.permissions.map((permission, index) => {
          return permission._id;
        }));
        setFormData({
          name: role.data.name,
          description: role.data.description,
          permissions: selectedPermissions,
          status: Boolean(role.data.status),
        });

      }
    }
    fetchRole();
  }, []);

  const getErrorForField = (field: string) => {
    if (!errors.length) return null;
    if (field === 'name' && errors.includes("Role name is required")) return "Role name is required";
    if (field === 'description' && errors.includes("Description is required")) return "Description is required";
    if (field === 'permissions' && errors.includes("At least one permission must be selected")) return "At least one permission must be selected";
    return null;
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
      return;
    }

    setErrors([]);

    const payload = {
      ...formData,
      permissions: selectedPermissions,
    };

    // Use updateRole if editing, else createRole
    const action = isEdit
      ? updateRole(id, payload)  // assuming formData has id for the role
      : createRole(payload);

    action
      .then((role) => {
        toast({
          title: isEdit ? "Role updated" : "Role created",
          description: `Role "${formData.name}" has been ${isEdit ? "updated" : "created"} successfully.`,
        });
        // Navigate after successful creation or update
        navigate(-1);
      })
      .catch((error) => {
        if (error.statusCode && error.statusCode === 422) {
          const errors = error.errors || {};
          const errorMessages = Object.entries(errors)
            .map(([field, msg]) => `${field}: ${msg}`)
            .join("\n");
          toast({
            title: "Validation Error",
            description: errorMessages,
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

  return (
    <>
      <PageHeader
        title={isEdit ? 'Edit Role' : 'Create Role'}
        description="Manage roles and permissions"
      />
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4 w-full">
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
                  className="w-full"
                />
                {getErrorForField('name') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('name')}</p>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-end md:gap-6">

                {/* DESCRIPTION */}
                <div className="flex-1">
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

                {/* STATUS */}
                <div className="mt-4 md:mt-0">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status
                  </Label>
                  <div className="flex items-center space-x-3 mt-2">
                    <Switch
                      id="status"
                      checked={formData.status}
                      onCheckedChange={handleStatusToggle}
                    />
                    <span className="text-sm">{formData.status ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-6 mt-6">
                <Label className="text-base font-semibold">
                  Permissions <span className="text-red-600">*</span>
                </Label>
                {getErrorForField('permissions') && (
                  <p className="text-sm text-red-600">{getErrorForField('permissions')}</p>
                )}
                {Object.entries(groupPermissionsByModule(permissions)).map(([moduleName, perms]) => {
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
                    <div key={moduleName} className="border p-4 rounded bg-muted/20 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <Label className="font-medium">{moduleName} Permissions</Label>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={allSelected}
                            onCheckedChange={toggleAllInModule}
                          />
                          <span className="text-sm">{allSelected ? 'Unselect All' : 'Select All'}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {permsArray.map((perm) => (
                          <label key={perm._id} className="flex items-center space-x-2">
                            <Switch
                              checked={selectedPermissions.includes(perm._id)}
                              onCheckedChange={() => handlePermissionToggle(perm._id)}
                            />
                            <span className="text-sm">{perm.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-6">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RoleForm;