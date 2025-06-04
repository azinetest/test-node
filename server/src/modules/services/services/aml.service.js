const axios = require("axios");
const RequestLogsModel = require("../models/kyx_requests.models");
const { getResponseStatus } = require("../../../utils/status.helpers");

const AMLService = {

  async requestInfo(
    envType,
    requestData,
    requestDetails,
    userDetails,
    requestType
  ) {
    const logEntry = {
      request_id: requestData.request_id,
      user_id: userDetails._id,
      service: "aml",
      env_type: envType,
      request_at: new Date(),
      response_at: null,
      request_type: requestType,
      request: requestData,
      response: null,
      created_by: userDetails._id,
    };

    const log = await RequestLogsModel.create(logEntry);

    try {
      const amlResponse = await axios.post(
        `${requestDetails.url}info`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${requestDetails.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { main_status, sub_status } = getResponseStatus(
        amlResponse.status,
        amlResponse.data
      );

      await RequestLogsModel.updateOne(
        { _id: log._id },
        {
          $set: {
            trans_id: amlResponse.data?.transaction_id || "",
            main_status,
            sub_status,
            response_at: new Date(),
            response: amlResponse.data,
          },
        }
      );

      
      return amlResponse.data;
    } catch (error) {
      const errorData = error.response?.data || { message: error.message };

      await RequestLogsModel.updateOne(
        { _id: log._id },
        {
          $set: {
            main_status: "failed",
            sub_status: "Failed",
            response_at: new Date(),
            response: errorData,
          },
        }
      );

      console.error("Error in AMLService.requestInfo:", errorData);
      throw error;
    }
  },
};

module.exports = AMLService;