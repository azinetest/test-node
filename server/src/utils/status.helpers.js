function getResponseStatus(statusCode, responseData) {
  let main_status = "failed";
  let sub_status = "Error";

  if (statusCode === 200) {
    main_status = "success";
    if (Array.isArray(responseData) && responseData.length > 0) {
      sub_status = "Found";
    } else {
      sub_status = "Not Found";
    }
  } else if (statusCode === 400) {
    sub_status = "Validation";
  } else if (statusCode === 503) {
    sub_status = "Failed";
  }

  return { main_status, sub_status };
}

module.exports = { getResponseStatus };
