import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { debounce } from "lodash";

// Utility to generate a secure random password
const generatePassword = (length: number = 20): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

// Interfaces
interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
}

interface SubscribedService {
  service_id: string;
  service_name: string;
  price: number;
}

interface CompanyProfile {
  name: string;
  email: string;
  logo: File | null;
  favicon: File | null;
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  status: "active" | "inactive";
  extra_user_limit: string;
  expired_at: string;
  role_id: string;
  company_profile: CompanyProfile;
  profile_pic: File | null;
}

interface ValidationError {
  field: string;
  message: string;
}

// Reusable FormField Component
interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  error,
}) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium">
      {label} {required && <span className="text-red-600">*</span>}
    </Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full mt-1"
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const isEdit = !!id;

  // Lazy initialization for form data
  const initialFormData = useMemo(
    () => ({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: isEdit ? "" : generatePassword(),
      status: "active" as const,
      extra_user_limit: "",
      expired_at: "",
      role_id: "684853e02cb7f3a21285bf06",
      company_profile: { name: "", email: "", logo: null, favicon: null },
      profile_pic: null,
    }),
    [isEdit]
  );

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [services, setServices] = useState<Service[]>([]);
  const [subscribedServices, setSubscribedServices] = useState<SubscribedService[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  // Centralized validation logic
  const validateForm = useCallback((): ValidationError[] => {
    const newErrors: ValidationError[] = [];
    const requiredFields: [keyof FormData, string][] = [
      ["first_name", "First Name"],
      ["last_name", "Last Name"],
      ["email", "Email"],
      ["expired_at", "Expired At"],
    ];

    requiredFields.forEach(([field, label]) => {
      const value = formData[field];
      if (typeof value === "string" && !value.trim()) {
        newErrors.push({ field, message: `${label} is required.` });
      }
    });

    if (!isEdit) {
      if (!formData.password.trim()) newErrors.push({ field: "password", message: "Password is required." });
      if (!formData.profile_pic) newErrors.push({ field: "profile_pic", message: "Profile Picture is required." });
      if (!formData.company_profile.logo) newErrors.push({ field: "company_profile.logo", message: "Company Logo is required." });
      if (!formData.company_profile.favicon) newErrors.push({ field: "company_profile.favicon", message: "Company Icon is required." });
    }

    if (!formData.company_profile.name.trim()) {
      newErrors.push({ field: "company_profile.name", message: "Company Name is required." });
    }

    return newErrors;
  }, [formData, isEdit]);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        if (response.statusCode !== 200) {
          toast({ title: "Error", description: "Unable to load services.", variant: "destructive" });
          setServices([]);
        } else {
          setServices(response.data || []);
        }
      } catch (error: any) {
        toast({ title: "Error", description: error.message || "Failed to fetch services.", variant: "destructive" });
      }
    };
    fetchServices();
  }, [toast]);

  // Fetch user data for edit mode
  useEffect(() => {
    if (!isEdit || !id) return;
    const fetchUserData = async () => {
      try {
        // Simulated API call
        setFormData({
          ...initialFormData,
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          status: "active",
          extra_user_limit: "5",
          expired_at: "2025-12-31",
          company_profile: { name: "Example Corp", email: "info@examplecorp.com", logo: null, favicon: null },
          profile_pic: null,
        });
        setSubscribedServices([
          { service_id: "service1_id", service_name: "Service A", price: 100 },
          { service_id: "service2_id", service_name: "Service B", price: 150 },
        ]);
      } catch (error: any) {
        toast({ title: "Error", description: error.message || "Failed to fetch user data.", variant: "destructive" });
        navigate("/users");
      }
    };
    fetchUserData();
  }, [id, isEdit, navigate, toast, initialFormData]);

  // Debounced input handler
  const handleInputChange = useCallback(
    debounce((field: keyof FormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }, 300),
    []
  );

  const handleCompanyProfileChange = useCallback(
    debounce((field: keyof CompanyProfile, value: string) => {
      setFormData((prev) => ({
        ...prev,
        company_profile: { ...prev.company_profile, [field]: value },
      }));
    }, 300),
    []
  );

  const handleServiceToggle = useCallback((id: string, name: string, price: number) => {
    setSubscribedServices((prev) =>
      prev.some((s) => s.service_id === id)
        ? prev.filter((s) => s.service_id !== id)
        : [...prev, { service_id: id, service_name: name, price }]
    );
  }, []);

  const handleServicePrice = useCallback((id: string, price: number) => {
    setSubscribedServices((prev) =>
      prev.map((s) => (s.service_id === id ? { ...s, price } : s))
    );
  }, []);

  const handleImageChange = useCallback((file: File | null, name: keyof FormData | keyof CompanyProfile) => {
    if (name in formData.company_profile) {
      setFormData((prev) => ({
        ...prev,
        company_profile: { ...prev.company_profile, [name]: file },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: file }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        toast({
          title: "Validation Error",
          description: (
            <ul className="list-disc pl-4">
              {validationErrors.map((err, i) => (
                <li key={i}>{err.message}</li>
              ))}
            </ul>
          ),
          variant: "destructive",
        });
        return;
      }

      const dataToSend = { ...formData, subscribe_services: subscribedServices };
      try {
        const action = isEdit ? updateUser(id!, dataToSend) : createUser(dataToSend);
        await action;
        toast({
          title: isEdit ? "User updated" : "User created",
          description: `User "${formData.first_name} ${formData.last_name}" has been ${isEdit ? "updated" : "created"} successfully.`,
        });
        navigate(-1);
      } catch (error: any) {
        const errorMessages =
          error.statusCode === 422 && error.errors
            ? Object.entries(error.errors).map(([field, msg]) => (
              <li key={field} className="text-sm">
                <span className="font-semibold capitalize">{field.replace(/_/g, " ")}</span>: {String(msg)}
              </li>
            ))
            : error.message || "Something went wrong.";
        toast({
          title: "Error",
          description: <ul className="list-disc pl-4">{errorMessages}</ul>,
          variant: "destructive",
        });
      }
    },
    [formData, subscribedServices, isEdit, id, navigate, toast, validateForm]
  );

  const getErrorForField = useCallback(
    (field: string) => errors.find((err) => err.field === field)?.message,
    [errors]
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title={isEdit ? "Edit User" : "Create User"} description="Manage user and services" />
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* User Details */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormField
                id="first_name"
                label="First Name"
                value={formData.first_name}
                onChange={(value) => handleInputChange("first_name", value)}
                required
                placeholder="Enter first name"
                error={getErrorForField("first_name")}
              />
              <FormField
                id="last_name"
                label="Last Name"
                value={formData.last_name}
                onChange={(value) => handleInputChange("last_name", value)}
                required
                placeholder="Enter last name"
                error={getErrorForField("last_name")}
              />
              <FormField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                required
                placeholder="Enter email"
                error={getErrorForField("email")}
              />
              <FormField
                id="password"
                label="Password"
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
                required={!isEdit}
                placeholder="Auto-generated password"
                error={getErrorForField("password")}
              />
              <FormField
                id="phone"
                label="Phone No."
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value)}
                placeholder="Enter phone number"
              />
              <div className="flex items-center space-x-2 pt-6">
                <Label htmlFor="status" className="text-sm font-medium">
                  Status
                </Label>
                <Switch
                  id="status"
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => handleInputChange("status", checked ? "active" : "inactive")}
                />
                <span className="text-sm">{formData.status === "active" ? "Active" : "Inactive"}</span>
              </div>
              <FormField
                id="extra_user_limit"
                label="Extra User Limit"
                type="number"
                value={formData.extra_user_limit}
                onChange={(value) => handleInputChange("extra_user_limit", value)}
                placeholder="Enter user limit"
              />
              <FormField
                id="expired_at"
                label="Expired At"
                type="date"
                value={formData.expired_at}
                onChange={(value) => handleInputChange("expired_at", value)}
                required
                error={getErrorForField("expired_at")}
              />
              <div>
                <Label htmlFor="profile_pic" className="text-sm font-medium">
                  Profile Picture {!isEdit && <span className="text-red-600">*</span>}
                </Label>
                <FileUpload
                  className="mt-1"
                  onFileSelect={(file) => handleImageChange(file, "profile_pic")}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                />
                {formData.profile_pic && <p className="text-xs text-muted-foreground mt-1">Selected: {formData.profile_pic.name}</p>}
                {getErrorForField("profile_pic") && <p className="mt-1 text-sm text-red-600">{getErrorForField("profile_pic")}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Profile */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="company_name"
                label="Company Name"
                value={formData.company_profile.name}
                onChange={(value) => handleCompanyProfileChange("name", value)}
                required
                placeholder="Enter company name"
                error={getErrorForField("company_profile.name")}
              />
              <FormField
                id="company_email"
                label="Company Email"
                type="email"
                value={formData.company_profile.email}
                onChange={(value) => handleCompanyProfileChange("email", value)}
                placeholder="Enter company email"
              />
              <div>
                <Label htmlFor="logo" className="text-sm font-medium">
                  Company Logo {!isEdit && <span className="text-red-600">*</span>}
                </Label>
                <FileUpload
                  className="mt-1"
                  onFileSelect={(file) => handleImageChange(file, "logo")}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                />
                {formData.company_profile.logo && (
                  <p className="text-xs text-muted-foreground mt-1">Selected: {formData.company_profile.logo.name}</p>
                )}
                {getErrorForField("company_profile.logo") && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField("company_profile.logo")}</p>
                )}
              </div>
              <div>
                <Label htmlFor="favicon" className="text-sm font-medium">
                  Company Icon {!isEdit && <span className="text-red-600">*</span>}
                </Label>
                <FileUpload
                  className="mt-1"
                  onFileSelect={(file) => handleImageChange(file, "favicon")}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                />
                {formData.company_profile.favicon && (
                  <p className="text-xs text-muted-foreground mt-1">Selected: {formData.company_profile.favicon.name}</p>
                )}
                {getErrorForField("company_profile.favicon") && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField("company_profile.favicon")}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
              {services.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground">No services available.</p>
              ) : (
                services.map((service) => {
                  const isChecked = subscribedServices.some((s) => s.service_id === service._id);
                  const subscribedService = subscribedServices.find((s) => s.service_id === service._id) || {
                    price: service.price,
                  };

                  return (
                    <div
                      key={service._id}
                      className="flex flex-col p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-card"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-base font-semibold">{service.name}</div>
                        <Switch
                          checked={isChecked}
                          onCheckedChange={() => handleServiceToggle(service._id, service.name, service.price)}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                      {isChecked && (
                        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border">
                          <Label htmlFor={`price-${service._id}`} className="text-sm">
                            Price:
                          </Label>
                          <Input
                            id={`price-${service._id}`}
                            type="number"
                            value={subscribedService.price}
                            onChange={(e) => handleServicePrice(service._id, parseFloat(e.target.value) || 0)}
                            className="w-24 text-sm"
                            placeholder="Price"
                          />
                          <span className="text-sm text-muted-foreground">USD</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
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