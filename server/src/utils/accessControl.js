module.exports = (user, extraConditions = {}) => {
  if (user.role === "super_admin") {
    return { ...extraConditions };
  } else {
    return {
      created_by: user._id,
      ...extraConditions,
    };
  }
};