const sendResponse = require("../../../utils/response");
const { StatusCodes } = require("http-status-codes");
const { getRequestToken } = require("../../../utils/tokens");
const AMLService = require("../services/aml.service");

class AMLController {
  async personInfoRequest(req, res) {
    try {
      const userDetails = req.user;
      const {
        envType,
        first_name,
        last_name,
        middle_name,
        dob,
        gender,
        address,
        state,
        city,
        zip,
        country,
        request_id,
        response_type,
        monitoring,
      } = req.body;

      // Get request token/config
      const requestDetails = await getRequestToken("aml", envType);
      if (!requestDetails) {
        return sendResponse(res, {
          statusCode: StatusCodes.BAD_REQUEST,
          message: "AML service is not configured properly.",
          data: null,
        });
      }

      // Check if user has subscribed to AML
      if (
        !userDetails.subscribe_services ||
        !userDetails.subscribe_services.includes("aml")
      ) {
        return sendResponse(res, {
          statusCode: StatusCodes.FORBIDDEN,
          message: "AML service is not subscribed.",
          data: null,
        });
      }

      // Prepare request data
      const requestData = {
        first_name,
        last_name,
        middle_name,
        dob,
        gender,
        address,
        state,
        city,
        zip,
        country,
        request_id,
        response_type: response_type || "json",
        name_type: "p",
        monitoring: monitoring || "false",
      };

      // // Call the AML service
      const amlResponse = await AMLService.requestInfo(
        envType,
        requestData,
        requestDetails,
        userDetails,
        "person_info"
      );

      // Return success response
      return sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "AML request processed successfully.",
        data: amlResponse,
      });
    } catch (error) {
      console.error("AML request failed:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "An error occurred while processing the AML request.",
      });
    }
  }

  async organizationInfoRequest(req, res) {
    try {
      const userDetails = req.user;
      const {
        envType,
        company_name,
        address,
        state,
        city,
        zip,
        country,
        request_id,
        response_type,
        monitoring,
      } = req.body;

      // Get request token/config
      const requestDetails = await getRequestToken("aml", envType);
      if (!requestDetails) {
        return sendResponse(res, {
          statusCode: StatusCodes.BAD_REQUEST,
          message: "AML service is not configured properly.",
          data: null,
        });
      }

      // // Check if user has subscribed to AML
      // if (
      //   !userDetails.subscribe_services ||
      //   !userDetails.subscribe_services.includes("aml")
      // ) {
      //   return sendResponse(res, {
      //     statusCode: StatusCodes.FORBIDDEN,
      //     message: "AML service is not subscribed.",
      //     data: null,
      //   });
      // }

      // Prepare request data
      const requestData = {
        company_name,
        address,
        state,
        city,
        zip,
        country,
        request_id,
        response_type: response_type || "json",
        name_type: "c",
        monitoring: monitoring || "false",
      };

      // Call the AML service
      const amlResponse = await AMLService.requestInfo(
        envType,
        requestData,
        requestDetails,
        userDetails,
        "organization_info"
      );

      // Return success response
      return sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "AML request processed successfully.",
        data: amlResponse,
      });
    } catch (error) {
      console.error("AML request failed:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "An error occurred while processing the AML request.",
      });
    }
  }
}

module.exports = new AMLController();
