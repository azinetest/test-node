import React, { useState } from 'react';
import PageHeader from '@/components/ui/pageHeader';
import { useParams } from 'react-router-dom';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const UserForm = () => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(!!id);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    extra_user_limit: '',
    expired_at: '',
    company_name: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
      <PageHeader
        title={isEdit ? 'Edit User' : 'Create User'}
        description="Manage user and services"
      />
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <form className="space-y-6 w-full">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4 w-full">

              {/* First Name */}
              <div>
                <Label htmlFor="first_name" className="text-sm font-medium">
                  First Name <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="first_name"
                  placeholder="Enter user first name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Last Name */}
              <div>
                <Label htmlFor="last_name" className="text-sm font-medium">
                  Last Name <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="last_name"
                  placeholder="Enter user last name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter user email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Phone No. */}
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone No.
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter user phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Extra User Limit */}
              <div>
                <Label htmlFor="extra_user_limit" className="text-sm font-medium">
                  Extra User Limit
                </Label>
                <Input
                  id="extra_user_limit"
                  type="number"
                  placeholder="Enter extra user limit"
                  value={formData.extra_user_limit}
                  onChange={(e) => handleInputChange('extra_user_limit', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Expired At */}
              <div>
                <Label htmlFor="expired_at" className="text-sm font-medium">
                  Expired At <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="expired_at"
                  type="date"
                  value={formData.expired_at}
                  onChange={(e) => handleInputChange('expired_at', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Company Name */}
              <div>
                <Label htmlFor="company_name" className="text-sm font-medium">
                  Company Name
                </Label>
                <Input
                  id="company_name"
                  placeholder="Enter company name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  className="w-full"
                />
              </div>

            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;