const API_URL = "https://sales-v1-api-26316719641.asia-east1.run.app";

function token() {
  return localStorage.getItem("sessionToken");
}

async function apiCall(action, method = "GET", body = null) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "x-session-token": token()
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const url = action.startsWith("?") ? API_URL + action : API_URL + "?action=" + action;
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(errorData.error || "Request failed");
  }

  return await res.json();
}
