module.exports = (user, extraConditions = {}) => {
  console.log();
  if (user.role_id?.slug === "super-admin") {
    return { ...extraConditions };
  } else {
    return {
      created_by: user._id,
      ...extraConditions,
    };
  }
};