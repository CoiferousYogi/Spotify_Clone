import backendURL from "./config";

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
  return accessToken;
};

// Making a helper function to make unauthenticated POST request
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  const response = await fetch(backendURL + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const formattedResponse = await response.json();

  return formattedResponse;
};

// // Making a helper function to make authenticated POST request
export const makeAuthenticatedPOSTRequest = async (route, body) => {
  const token = getToken();
  const response = await fetch(backendURL + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const formattedResponse = await response.json();

  return formattedResponse;
};

// Helper for authenticated GET Request
export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken();
  const response = await fetch(backendURL + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};
