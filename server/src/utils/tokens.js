const ServiceModel = require("../modules/admin/service-management/models/service.model");

const getRequestToken = async (serviceName, envType) => {
  try {
    const service = await ServiceModel.findOne({
      slug: serviceName,
    });
    return service?.tokens?.[envType] || null;
  } catch (error) {
    console.error("Error fetching service tokens: ", error.message);
    return null;
  }
};

module.exports = {
  getRequestToken,
};
