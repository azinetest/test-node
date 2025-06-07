import React from "react";
import PageHeader from "@/components/ui/pageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RoleForm = () => {
    const [isEdit, setIsEdit] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        description: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((preData) => {
            return {
                ...preData,
                [field]: value
            }
        })
    }

    return (
        <>
            <PageHeader
                title={isEdit ? 'Edit Role' : 'Create Role'}
                description="Manage roles and permissions"
            />
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Role Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter role name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="transition-all duration-200 focus:scale-[1.02] hover:shadow-md"
                        />
                        <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                        <Input
                            id="description"
                            placeholder="Enter role description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="transition-all duration-200 focus:scale-[1.02] hover:shadow-md"
                        />
                        <div className="permissions">

                        </div>
                    </div>
                </div>
            </form>
        </>
    )
};

export default RoleForm;    