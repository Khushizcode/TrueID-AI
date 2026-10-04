const BASE_URL = "http://localhost:8080";

export function getToken() {
  return localStorage.getItem("trueid_token");
}

// Also sets the old keys so the current App.jsx keeps working
export function saveSession(token, user) {
  localStorage.setItem("trueid_token", token);
  localStorage.setItem("trueid_user", JSON.stringify(user));
  localStorage.setItem("trueid_logged_in", "true");
}

export function clearSession() {
  localStorage.removeItem("trueid_token");
  localStorage.removeItem("trueid_user");
  localStorage.removeItem("trueid_logged_in");
}

async function request(path, { method = "GET", body, formData, auth = true } = {}) {
  const headers = {};
  if (auth && getToken()) {
    headers.Authorization = `Bearer ${getToken()}`;
  }

  let payload;
  if (formData) {
    payload = formData; // do NOT set Content-Type for FormData
  } else if (body) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, { method, headers, body: payload });
  } catch {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (res.status === 401 && auth) {
    clearSession();
    window.dispatchEvent(new Event("trueid-logout"));
  }

  if (!res.ok) {
    throw new Error((data && data.error) || `Request failed (${res.status})`);
  }
  return data;
}

export const signup = (name, email, organization, password) =>
  request("/api/auth/signup", {
    method: "POST",
    body: { name, email, organization, password },
    auth: false,
  });

export const login = (email, password) =>
  request("/api/auth/login", {
    method: "POST",
    body: { email, password },
    auth: false,
  });

export const getProfile = () => request("/api/auth/profile");

export const updateProfile = (name, organization) =>
  request("/api/auth/profile", { method: "PUT", body: { name, organization } });

export function createScreening({ documentType, purpose, file }) {
  const form = new FormData();
  form.append("documentType", documentType);
  form.append("purpose", purpose || "");
  form.append("document", file);
  return request("/api/screening", { method: "POST", formData: form });
}

export const getHistory = () => request("/api/screening/history");

export const getScreening = (id) => request(`/api/screening/${id}`);

export const getReports = () => request("/api/reports");