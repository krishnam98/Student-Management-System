const BASE_URL = "http://localhost:5000";

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // Handle unauthorized
  if (res.status === 401) {
    localStorage.removeItem("token");
  }

  // Handle error responses
  if (!res.ok) {
    let errorMessage = "API request failed";

    try {
      const errorData = await res.json();
      errorMessage = errorData?.message || errorMessage;
    } catch {
      // response body may be empty or non-JSON
    }

    alert(errorMessage);
    throw new Error(errorMessage);
  }

  return res.json();
};
