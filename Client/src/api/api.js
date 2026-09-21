const API_BASE_URL = "http://127.0.0.1:8000/";

export const apiFetch = async (url, options = {}) => {
  let accessToken = localStorage.getItem("access_token");

  const makeRequest = (token) => {
    return fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });
  };

  let response = await makeRequest(accessToken);

  // Access token expired
  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refresh_token");
    console.log("Access token expired. Trying refresh...");

    if (!refreshToken) {
      localStorage.removeItem("access_token");
      return response;
    }

    const refreshResponse = await fetch(
      `${API_BASE_URL}api/users/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    if (!refreshResponse.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return response;
    }

    const refreshData = await refreshResponse.json();

    localStorage.setItem("access_token", refreshData.access);
    console.log("New access token received. Retrying request...");

    accessToken = refreshData.access;

    // Retry original request with new access token
    response = await makeRequest(accessToken);
  }

  return response;
};