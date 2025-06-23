const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user.service");
const sendResponse = require("../../../../utils/response");
const getAccessControlQuery = require("../../../../utils/accessControl");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validators/user.validator");

class UserController {
  // Create a new user
  async create(req, res) {
    try {
      // Extract FormData fields
      const {
        first_name,
        last_name,
        email,
        phone,
        password,
        status,
        role_id,
        company_profile_name,
        company_profile_email,
        subscribe_services,
        expired_at,
        extra_user_limit,
      } = req.body;

      const files = req.files;
      
      // Prepare data for validation
      const data = {
        first_name,
        last_name,
        email,
        phone,
        password,
        status,
        role_id,
        profile_pic: files.profile_pic?.[0].filename,
        logo: files.logo?.[0].filename,
        favicon: files.favicon?.[0].filename,
        company_profile_name,
        company_profile_email,
        subscribe_services: subscribe_services,
        expired_at,
        extra_user_limit,
      };

      // Validate with Joi
      const { error } = createUserSchema.validate(data, { abortEarly: false });
      if (error) {
        const errors = error.details.reduce((acc, err) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        }, {});
        return sendResponse(res, {
          statusCode: StatusCodes.BAD_REQUEST,
          success: false,
          message: "Validation failed",
          errors,
        });
      }

      // Transform validated data for UserService
      const userData = {
        first_name,
        last_name,
        email,
        phone,
        password,
        status,
        role_id: role_id || null,
        profile_pic: data.profile_pic || null,
        logo: data.logo || null,
        favicon: data.favicon || null,
        company_profile: {
          name: company_profile_name || "",
          email: company_profile_email || "",
        },
        subscribe_services: data.subscribe_services || [],
        expired_at,
        extra_user_limit: data.extra_user_limit ?? null,
        parent_id: req.user?._id || null,
        created_by: req.user?._id || null,
        updated_by: null,
      };

      const newUser = await UserService.createUser(userData);

      return sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "User created successfully.",
        data: newUser,
      });
    } catch (error) {
      console.error("Error in create user controller:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while creating the user.",
        error: error.message,
      });
    }
  }

  // Update a user
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        first_name,
        last_name,
        email,
        phone,
        password,
        status,
        role_id,
        company_profile_name,
        company_profile_email,
        subscribe_services,
        expired_at,
        extra_user_limit,
      } = req.body;

      // Access uploaded files
      const files = req.files || {};

      // Prepare data for validation
      const data = {
        first_name,
        last_name,
        email,
        phone,
        password,
        status,
        role_id,
        profile_pic: files.profile_pic?.[0]?.path,
        logo: files.logo?.[0]?.path,
        favicon: files.favicon?.[0]?.path,
        company_profile_name,
        company_profile_email,
        subscribe_services: subscribe_services
          ? JSON.parse(subscribe_services)
          : [],
        expired_at,
        extra_user_limit,
      };

      // Validate with Joi
      const { error } = updateUserSchema.validate(data, { abortEarly: false });
      if (error) {
        const errors = error.details.reduce((acc, err) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        }, {});
        return sendResponse(res, {
          statusCode: StatusCodes.BAD_REQUEST,
          success: false,
          message: "Validation failed",
          errors,
        });
      }

      // Transform validated data for UserService
      const userData = {
        first_name,
        last_name,
        email,
        phone,
        password,
        status,
        role_id: role_id || null,
        profile_pic: data.profile_pic || null,
        logo: data.logo || null,
        favicon: data.favicon || null,
        company_profile: {
          name: company_profile_name || "",
          email: company_profile_email || "",
        },
        subscribe_services: data.subscribe_services || [],
        expired_at,
        extra_user_limit: data.extra_user_limit ?? null,
        updated_by: req.user?._id || null,
      };

      const updatedUser = await UserService.updateUser(id, userData);

      if (!updatedUser) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          message: "User not found.",
          data: null,
        });
      }

      return sendResponse(res, {
        message: "User updated successfully.",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error in updating user:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while updating the user.",
        error: error.message,
      });
    }
  }

  // Get all users
  async getUsers(req, res) {
    try {
      const query = getAccessControlQuery(req.user, {});
      const users = await UserService.getAllUsers(query);
      if (!users || users.length === 0) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          message: "Users not found.",
          data: null,
        });
      }
      return sendResponse(res, {
        message: "Users fetched successfully.",
        data: users,
      });
    } catch (error) {
      console.error("Error in fetching users:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while fetching users.",
        error: error.message,
      });
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const query = getAccessControlQuery(req.user, {});
      const user = await UserService.getUserById(query, id);

      if (!user) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          message: "User not found.",
          data: null,
        });
      }

      return sendResponse(res, {
        message: "User fetched successfully.",
        data: user,
      });
    } catch (error) {
      console.error("Error in fetching user by ID:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while fetching the user by ID.",
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
