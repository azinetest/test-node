const UserModel = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");

const UserService = {
  async createUser(userData) {
    try {
      // Create a new user instance
      const newUser = new UserModel(userData);

      // Save the user to the database
      return await newUser.save();
    } catch (error) {
      console.error("Error creating user: ", error);
      throw new Error("Error creating user: " + error.message);
    }
  },

  async getAllUsers(query) {
    try {
      // Fetch all user from the database
      return await UserModel.find(query).select('-password -tokens -created_by -updated_by');
    } catch (error) {
      console.error("Error fetching all user: ", error);
      throw new Error("Error fetching all user: " + error.message);
    }
  },

  async getUserById(query,userId) {
    try {
      return await UserModel.findOne({ _id: userId, ...query }).select('-password -tokens -created_by -updated_by');
    } catch (error) {
      console.error("Error fetching user by ID: ", error);
      throw new Error("Error fetching user by ID: " + error.message);
    }
  },

  async updateUser(userId, userData) {
    try {
      return await UserModel.findByIdAndUpdate(
        userId,
        userData,
        { new: true, runValidators: true }
      );
    } catch (error) {
      console.error("Error update user: ", error);
      throw new Error("Error update user: " + error.message);
    }
  },

  async deleteUser(userId) {
    try {
      const deleteUser = UserModel.deleteOne({ _id: userId });

      if (deleteUser.deletedCount === 0) {
        return {
          status: StatusCodes.NOT_FOUND,
          message: "User not found.",
          data: null,
        };
      }

      return {
        status: StatusCodes.OK,
        message: "User deleted successfully.",
        data: null,
      };
    } catch (error) {
      console.error("Error delete user: ", error);
      throw new Error("Error delete user: " + error.message);
    }
  },
};

module.exports = UserService;