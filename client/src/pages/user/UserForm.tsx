import React, { useEffect, useState } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload"; // Assuming this is a custom component for file uploads
import { getServices } from "@/api/services"; // API call to fetch services
import { createUser, updateUser } from "@/api/users"; // API calls for user creation/update
import { useToast } from "@/hooks/use-toast"; // Custom toast hook
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming you have these UI components
import { Separator } from "@/components/ui/separator"; // Assuming you have a Separator component

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

interface SubscribedService {
  service_id: string;
  service_name: string;
  price: number;
}

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isEdit, setIsEdit] = useState(!!id);
  const [services, setServices] = useState<Services[]>([]);
  const [subscribedServices, setSubscribedServices] = useState<SubscribedService[]>([]); // Type this
  const [errors, setErrors] = useState<string[]>([]); // Explicitly type errors as string[]
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    status: true, // Default to active
    extra_user_limit: "",
    expired_at: "",
    role_id: "684853e02cb7f3a21285bf06", // Consider making this dynamic or a dropdown
    company_profile: {
      name: "",
      email: "",
      logo: null as File | null, // Add file states for uploads
      favicon: null as File | null,
    },
    profile_pic: null as File | null,
  });

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
        const serviceResponse = await getServices();
        if (serviceResponse.statusCode !== 200) {
          toast({
            title: "Error fetching services",
            description: "Unable to load services from the server.",
            variant: "destructive",
          });
          setServices([]);
        } else {
          setServices(serviceResponse.data || []);
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

  // Handle fetching existing user data for edit mode (add this useEffect)
  useEffect(() => {
    const fetchUserData = async () => {
      if (isEdit && id) {
        // In a real app, you would uncomment your actual API call here:
        // try {
        //   const userResponse = await getUserById(id); // Assume getUserById exists
        //   if (userResponse.statusCode === 200) {
        //     const userData = userResponse.data;
        //     setFormData({
        //       first_name: userData.first_name,
        //       last_name: userData.last_name,
        //       email: userData.email,
        //       phone: userData.phone,
        //       password: userData.password, // Be cautious with pre-filling passwords in a real app (often omitted or a placeholder)
        //       status: userData.status,
        //       extra_user_limit: userData.extra_user_limit,
        //       expired_at: userData.expired_at ? new Date(userData.expired_at).toISOString().split('T')[0] : '', // Format date
        //       role_id: userData.role_id,
        //       company_profile: {
        //         name: userData.company_profile.name,
        //         email: userData.company_profile.email,
        //         logo: null, // Files generally aren't pre-filled for security/data size, user re-uploads if needed
        //         favicon: null,
        //       },
        //       profile_pic: null, // Files generally aren't pre-filled
        //     });
        //     setSubscribedServices(userData.subscribed_services || []);
        //   } else {
        //     toast({
        //       title: "Error fetching user data",
        //       description: "Could not load user details.",
        //       variant: "destructive",
        //     });
        //     navigate("/users"); // Redirect if user not found
        //   }
        // } catch (error: any) {
        //   toast({
        //     title: "Error fetching user data",
        //     description: error.message || "Unable to load user details.",
        //     variant: "destructive",
        //   });
        //   navigate("/users"); // Redirect on error
        // }

        // For demonstration, simulating fetching user data:
        console.log(`Fetching user data for ID: ${id}`);
        setFormData((prev) => ({
          ...prev,
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          status: true,
          extra_user_limit: "5",
          expired_at: "2025-12-31",
          company_profile: {
            name: "Example Corp",
            email: "info@examplecorp.com",
            logo: null,
            favicon: null,
          },
        }));
        setSubscribedServices([
          // Simulate some subscribed services
          { service_id: "service1_id", service_name: "Service A", price: 100 },
          { service_id: "service2_id", service_name: "Service B", price: 150 },
        ]);
      }
    };
    fetchUserData();
  }, [id, isEdit, navigate, toast]);


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

  const handleFileSelect = (file: File, field: "profile_pic" | "logo" | "favicon") => {
    if (field === "profile_pic") {
      setFormData((prev) => ({ ...prev, profile_pic: file }));
    } else if (field === "logo") {
      setFormData((prev) => ({
        ...prev,
        company_profile: { ...prev.company_profile, logo: file },
      }));
    } else if (field === "favicon") {
      setFormData((prev) => ({
        ...prev,
        company_profile: { ...prev.company_profile, favicon: file },
      }));
    }
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

  // Helper function to get error for a specific field
  const getErrorForField = (field: string) => {
    const specificError = errors.find(err => err.toLowerCase().includes(field.toLowerCase().replace(/_/g, ' ')));
    return specificError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation example
    const newErrors: string[] = [];
    if (!formData.first_name.trim()) newErrors.push("First Name is required.");
    if (!formData.last_name.trim()) newErrors.push("Last Name is required.");
    if (!formData.email.trim()) newErrors.push("Email is required.");
    // Password is only required for new users
    if (!isEdit && !formData.password.trim()) newErrors.push("Password is required for new users.");
    if (!formData.company_profile.name.trim()) newErrors.push("Company Name is required.");
    if (!formData.expired_at.trim()) newErrors.push("Expired At date is required.");

    // Validate file uploads only for new users or if the file is explicitly marked as required in edit mode
    // (Assuming FileUpload handles showing current files, and user can re-upload if needed)
    if (!isEdit) {
      if (!formData.profile_pic) newErrors.push("Profile Picture is required.");
      if (!formData.company_profile.logo) newErrors.push("Company Logo is required.");
      if (!formData.company_profile.favicon) newErrors.push("Company Icon is required.");
    }


    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast({
        title: "Validation Error",
        description: (
          <ul className="list-disc pl-4">
            {newErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        ),
        variant: "destructive",
      });
      return;
    }
    setErrors([]); // Clear errors if validation passes

    // In a real application, you would construct FormData here to send files.
    // For this example, we'll use placeholder URLs.
    const dataToSend = {
      ...formData,
      subscribed_services: subscribedServices, // Include subscribed services
      // Replace file objects with placeholder URLs or actual upload logic
      profile_pic: formData.profile_pic ? "uploaded_profile_pic_url" : null, // This would be the actual URL after upload
      company_profile: {
        ...formData.company_profile,
        logo: formData.company_profile.logo ? "uploaded_logo_url" : null, // This would be the actual URL after upload
        favicon: formData.company_profile.favicon ? "uploaded_favicon_url" : null, // This would be the actual URL after upload
      },
    };

    try {
      // You would typically use FormData for actual file uploads to your API.
      // Example of how you'd build FormData:
      /*
      const apiFormData = new FormData();
      apiFormData.append("first_name", formData.first_name);
      apiFormData.append("last_name", formData.last_name);
      apiFormData.append("email", formData.email);
      apiFormData.append("phone", formData.phone);
      if (!isEdit) apiFormData.append("password", formData.password); // Only send password for new user
      apiFormData.append("status", String(formData.status));
      apiFormData.append("extra_user_limit", formData.extra_user_limit);
      apiFormData.append("expired_at", formData.expired_at);
      apiFormData.append("role_id", formData.role_id);
      apiFormData.append("company_profile[name]", formData.company_profile.name);
      apiFormData.append("company_profile[email]", formData.company_profile.email);
      if (formData.profile_pic) apiFormData.append("profile_pic", formData.profile_pic);
      if (formData.company_profile.logo) apiFormData.append("company_profile_logo", formData.company_profile.logo); // API might expect different field names
      if (formData.company_profile.favicon) apiFormData.append("company_profile_favicon", formData.company_profile.favicon);
      apiFormData.append("subscribed_services", JSON.stringify(subscribedServices)); // Stringify complex objects
      */

      const action = isEdit ? updateUser(id!, dataToSend) : createUser(dataToSend); // Use dataToSend, not formData for the mock API call
      await action;
      toast({
        title: isEdit ? "User updated" : "User created",
        description: `User "${formData.first_name} ${formData.last_name}" has been ${isEdit ? "updated" : "created"} successfully.`,
      });
      navigate(-1);
    } catch (error: any) {
      if (error.statusCode && error.statusCode === 422) {
        const apiErrors = error.errors || {}; // Changed 'errors' to 'apiErrors' to avoid conflict
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
          description: error.message || "Something went wrong while saving the user.",
          variant: "destructive",
        });
      }
    }
  };


  return (
    // Removed any potential fixed height classes here (e.g., h-full, h-screen)
    // The `space-y-6` provides vertical spacing between elements.
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title={isEdit ? "Edit User" : "Create User"}
        description="Manage user and services"
      />
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* User Details Section */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* First Name */}
              <div>
                <Label htmlFor="first_name" className="text-sm font-medium">
                  First Name <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="first_name"
                  placeholder="Enter user first name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  className="w-full mt-1" // Added mt-1 for consistency
                />
                {getErrorForField('first_name') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('first_name')}</p>
                )}
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
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  className="w-full mt-1" // Added mt-1 for consistency
                />
                {getErrorForField('last_name') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('last_name')}</p>
                )}
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
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full mt-1" // Added mt-1 for consistency
                />
                {getErrorForField('email') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('email')}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password {isEdit ? '' : <span className="text-red-600">*</span>}
                </Label>
                <Input
                  id="password"
                  type="text"
                  placeholder="Auto-generated password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full mt-1" // Added mt-1 for consistency
                  readOnly={!isEdit} // Read-only for new users unless specifically allowing override
                />
                {getErrorForField('password') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('password')}</p>
                )}
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
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full mt-1" // Added mt-1 for consistency
                />
              </div>

              {/* Status */}
              <div className="flex items-center space-x-2 pt-6">
                <Label htmlFor="status" className="text-sm font-medium">
                  Status
                </Label>
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) => handleInputChange("status", checked)}
                />
                <span className="text-sm">
                  {formData.status ? "Active" : "Inactive"}
                </span>
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
                  onChange={(e) => handleInputChange("extra_user_limit", e.target.value)}
                  className="w-full mt-1" // Added mt-1 for consistency
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
                  onChange={(e) => handleInputChange("expired_at", e.target.value)}
                  className="w-full mt-1" // Added mt-1 for consistency
                />
                {getErrorForField('expired_at') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('expired_at')}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Profile Section */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Company Name */}
              <div>
                <Label htmlFor="company_name" className="text-sm font-medium">
                  Company Name <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="company_name"
                  placeholder="Enter company name"
                  value={formData.company_profile.name}
                  onChange={(e) => handleCompanyProfileChange("name", e.target.value)}
                  className="w-full mt-1" // Added mt-1 for consistency
                />
                {getErrorForField('company name') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('company name')}</p>
                )}
              </div>

              {/* Company Email */}
              <div>
                <Label htmlFor="company_email" className="text-sm font-medium">
                  Company Email
                </Label>
                <Input
                  id="company_email"
                  type="email"
                  placeholder="Enter company email"
                  value={formData.company_profile.email}
                  onChange={(e) => handleCompanyProfileChange("email", e.target.value)}
                  className="w-full mt-1" // Added mt-1 for consistency
                />
              </div>

              {/* Profile Picture */}
              <div>
                <Label htmlFor="profile_pic" className="text-sm font-medium">
                  Profile Picture {isEdit ? '' : <span className="text-red-600">*</span>}
                </Label>
                <FileUpload
                  className="mt-1"
                  onFileSelect={(file) => handleFileSelect(file, "profile_pic")}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024} // 5 MB
                />
                {formData.profile_pic && <p className="text-xs text-muted-foreground mt-1">Selected: {formData.profile_pic.name}</p>}
                {getErrorForField('profile picture') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('profile picture')}</p>
                )}
              </div>

              {/* Company Logo */}
              <div>
                <Label htmlFor="logo" className="text-sm font-medium">
                  Company Logo {isEdit ? '' : <span className="text-red-600">*</span>}
                </Label>
                <FileUpload
                  className="mt-1"
                  onFileSelect={(file) => handleFileSelect(file, "logo")}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024} // 5 MB
                />
                {formData.company_profile.logo && <p className="text-xs text-muted-foreground mt-1">Selected: {formData.company_profile.logo.name}</p>}
                {getErrorForField('company logo') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('company logo')}</p>
                )}
              </div>

              {/* Company Icon (Favicon) */}
              <div>
                <Label htmlFor="favicon" className="text-sm font-medium">
                  Company Icon {isEdit ? '' : <span className="text-red-600">*</span>}
                </Label>
                <FileUpload
                  className="mt-1"
                  onFileSelect={(file) => handleFileSelect(file, "favicon")}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024} // 5 MB
                />
                {formData.company_profile.favicon && <p className="text-xs text-muted-foreground mt-1">Selected: {formData.company_profile.favicon.name}</p>}
                {getErrorForField('company icon') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('company icon')}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Section */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Optional: Add max-h and overflow-y-auto here if the services list can get very long */}
            {/* For example: <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground">No services available.</p>
              ) : (
                services.map((service) => {
                  const isChecked = subscribedServices.some(
                    (s) => s.service_id === service._id
                  );
                  const subscribedService = subscribedServices.find(
                    (s) => s.service_id === service._id
                  ) || { price: service.price }; // Default to original price if not in subscribed

                  return (
                    <div
                      key={service._id}
                      className="flex flex-col p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-card"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-base font-semibold">{service.name}</div>
                        <Switch
                          checked={isChecked}
                          onCheckedChange={() => handleServiceToggle(service._id, service.name)}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                      {isChecked && (
                        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border">
                          <Label htmlFor={`price-${service._id}`} className="text-sm">Price:</Label>
                          <Input
                            id={`price-${service._id}`}
                            type="number"
                            value={subscribedService.price ?? 0}
                            onChange={(e) =>
                              handleServicePrice(
                                service._id,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-24 text-sm"
                            placeholder="Price"
                          />
                          <span className="text-sm text-muted-foreground">USD</span> {/* Add currency */}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
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