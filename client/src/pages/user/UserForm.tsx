import React, { useEffect, useState } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { getServices } from "@/api/services";
import { createUser, updateUser } from "@/api/users";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

// Function to generate a random secure password
const generatePassword = (length: number = 20): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

interface Services {
  _id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
}

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isEdit, setIsEdit] = useState(!!id);
  const [services, setServices] = useState<Services[]>([]);
  const [subscribedServices, setSubscribedServices] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    status: true, // Default to active
    extra_user_limit: "",
    expired_at: "",
    role_id: "684853e02cb7f3a21285bf06",
    company_profile: {
      name: "",
      email: "",
    },
  });
  const [files, setFiles] = useState<{
    profile_pic: File | null;
    logo: File | null;
    favicon: File | null;
  }>({
    profile_pic: null,
    logo: null,
    favicon: null,
  });
  const [errors, setErrors] = useState<string[]>([]);

  // Generate password for new users
  useEffect(() => {
    if (!isEdit) {
      setFormData((prev) => ({
        ...prev,
        password: generatePassword(),
      }));
    }
  }, [isEdit]);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const service = await getServices();
        if (service.statusCode !== 200) {
          toast({
            title: "Error fetching services",
            description: "Unable to load services from the server.",
            variant: "destructive",
          });
          setServices([]);
        } else {
          setServices(service.data || []);
        }
      } catch (error: any) {
        toast({
          title: "Error fetching services",
          description:
            error.message || "Unable to load services from the server.",
          variant: "destructive",
        });
      }
    };
    fetchServices();
  }, [toast]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCompanyProfileChange = (
    field: "name" | "email",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      company_profile: {
        ...prev.company_profile,
        [field]: value,
      },
    }));
  };

  const handleFileSelect = (file: File, field: keyof typeof files) => {
    setFiles((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleServiceToggle = (id: string, name: string) => {
    setSubscribedServices((prev) => {
      if (prev.some((s) => s.service_id === id)) {
        return prev.filter((s) => s.service_id !== id);
      }
      return [
        ...prev,
        {
          service_id: id,
          service_name: name,
          price: services.find((s) => s._id === id)?.price || 0,
        },
      ];
    });
  };

  const handleServicePrice = (id: string, price: number) => {
    setSubscribedServices((prev) =>
      prev.map((service) =>
        service.service_id === id ? { ...service, price } : service
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object
    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);
    data.append("status", formData.status ? "active" : "inactive"); // Convert boolean to string
    data.append("extra_user_limit", formData.extra_user_limit);
    data.append("expired_at", formData.expired_at);
    data.append("role_id", formData.role_id);
    data.append("company_profile_name", formData.company_profile.name);
    data.append("company_profile_email", formData.company_profile.email);
    data.append("subscribe_services", JSON.stringify(subscribedServices));

    // Append files if selected
    if (files.profile_pic) data.append("profile_pic", files.profile_pic);
    if (files.logo) data.append("logo", files.logo);
    if (files.favicon) data.append("favicon", files.favicon);

    try {
      const action = isEdit ? updateUser(id, data) : createUser(data);
      await action;
      toast({
        title: isEdit ? "User updated" : "User created",
        description: `User "${formData.first_name} ${
          formData.last_name
        }" has been ${isEdit ? "updated" : "created"} successfully.`,
      });
      navigate(-1);
    } catch (error: any) {
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
          description:
            error.message || "Something went wrong while saving the user.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title={isEdit ? "Edit User" : "Create User"}
        description="Manage user and services"
      />
      <form className="space-y-8 w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 gap-6">
          {/* First Name */}
          <div className="col-span-3">
            <Label htmlFor="first_name" className="text-sm font-medium">
              First Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="first_name"
              placeholder="Enter user first name"
              value={formData.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Last Name */}
          <div className="col-span-3">
            <Label htmlFor="last_name" className="text-sm font-medium">
              Last Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="last_name"
              placeholder="Enter user last name"
              value={formData.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Email */}
          <div className="col-span-3">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-600">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter user email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Password */}
          <div className="col-span-3">
            <Label htmlFor="password" className="text-sm font-medium">
              Password <span className="text-red-600">*</span>
            </Label>
            <Input
              id="password"
              type="text"
              placeholder="Auto-generated password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full"
              readOnly={!isEdit} // Read-only for new users
            />
          </div>

          {/* Phone No. */}
          <div className="col-span-3">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone No.
            </Label>
            <Input
              id="phone"
              placeholder="Enter user phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Status */}
          <div className="col-span-3">
            <Label htmlFor="status" className="text-sm font-medium">
              Status <span className="text-red-600">*</span>
            </Label>
            <div className="mt-1 flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status}
                onCheckedChange={(checked) =>
                  handleInputChange("status", checked)
                }
              />
              <span className="text-sm">
                {formData.status ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Extra User Limit */}
          <div className="col-span-3">
            <Label htmlFor="extra_user_limit" className="text-sm font-medium">
              Extra User Limit
            </Label>
            <Input
              id="extra_user_limit"
              type="number"
              placeholder="Enter extra user limit"
              value={formData.extra_user_limit}
              onChange={(e) =>
                handleInputChange("extra_user_limit", e.target.value)
              }
              className="w-full"
            />
          </div>

          {/* Expired At */}
          <div className="col-span-3">
            <Label htmlFor="expired_at" className="text-sm font-medium">
              Expired At <span className="text-red-600">*</span>
            </Label>
            <Input
              id="expired_at"
              type="date"
              value={formData.expired_at}
              onChange={(e) => handleInputChange("expired_at", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Company Name */}
          <div className="col-span-3">
            <Label htmlFor="company_name" className="text-sm font-medium">
              Company Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="company_name"
              placeholder="Enter company name"
              value={formData.company_profile.name}
              onChange={(e) =>
                handleCompanyProfileChange("name", e.target.value)
              }
              className="w-full"
            />
          </div>

          {/* Company Email */}
          <div className="col-span-3">
            <Label htmlFor="company_email" className="text-sm font-medium">
              Company Email
            </Label>
            <Input
              id="company_email"
              type="email"
              placeholder="Enter company email"
              value={formData.company_profile.email}
              onChange={(e) =>
                handleCompanyProfileChange("email", e.target.value)
              }
              className="w-full"
            />
          </div>

          {/* Profile Picture */}
          <div className="col-span-3">
            <Label htmlFor="profile_pic" className="text-sm font-medium">
              Profile Picture <span className="text-red-600">*</span>
            </Label>
            <FileUpload
              className="mt-1"
              onFileSelect={(file) => handleFileSelect(file, "profile_pic")}
              accept="image/*"
              maxSize={5 * 1024 * 1024}
            />
          </div>

          {/* Company Logo */}
          <div className="col-span-3">
            <Label htmlFor="logo" className="text-sm font-medium">
              Company Logo <span className="text-red-600">*</span>
            </Label>
            <FileUpload
              className="mt-1"
              onFileSelect={(file) => handleFileSelect(file, "logo")}
              accept="image/*"
              maxSize={5 * 1024 * 1024}
            />
          </div>

          {/* Company Icon */}
          <div className="col-span-3">
            <Label htmlFor="favicon" className="text-sm font-medium">
              Company Icon <span className="text-red-600">*</span>
            </Label>
            <FileUpload
              className="mt-1"
              onFileSelect={(file) => handleFileSelect(file, "favicon")}
              accept="image/*"
              maxSize={5 * 1024 * 1024}
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Label className="col-span-full text-sm font-medium">Services</Label>
          {services.map((service, index) => {
            const isChecked = subscribedServices.some(
              (s) => s.service_id === service._id
            );
            const subscribedService = subscribedServices.find(
              (s) => s.service_id === service._id
            ) || {
              price: service.price,
            };

            return (
              <div
                key={index}
                className="flex items-center justify-between space-x-2 p-3 border rounded-md"
              >
                <div className="text-sm font-medium">{service.name}</div>
                <Switch
                  checked={isChecked}
                  onCheckedChange={() =>
                    handleServiceToggle(service._id, service.name)
                  }
                />
                {isChecked && (
                  <Input
                    type="number"
                    value={subscribedService.price ?? 0}
                    onChange={(e) =>
                      handleServicePrice(
                        service._id,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-24"
                    placeholder="Price"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-6">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
