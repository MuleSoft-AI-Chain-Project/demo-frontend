const handleHttpErrors = function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      message: error.message,
      url: error.config.baseURL + error.config.url.slice(1),
      details: error.response.data
    }
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: error.message,
      url: error.config.baseURL + error.config.url.slice(1),
      details: 'Check the availability of your API and/or the CORS policy on the API.'
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message,
      url: error.config.baseURL + error.config.url.slice(1),
      details: 'Unknown error'
    }
  }
  console.log(error.config);
}

export { handleHttpErrors }
