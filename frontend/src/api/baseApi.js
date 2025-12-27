import { api } from "../lib/api";

const BASE_URL = "http://localhost:5102";

export async function baseFetch(path, options = {}) {
  const { body, headers, ...rest } = options;

  // Map fetch options to axios config
  // Note: 'path' here is usually relative (e.g. /api/courses), 
  // and 'api' has baseURL configured, but baseFetch callers might sometimes pass full URL?
  // Existing baseApi prepended BASE_URL. lib/api uses VITE_API_URL.
  // We should pass the relative path to api(). 
  // If path starts with /, api() handles it against baseURL.

  const config = {
    url: path,
    method: rest.method || 'GET',
    headers: headers || {},
    data: body, // fetch uses 'body' (string), axios uses 'data'
    ...rest
  };

  try {
    const res = await api(config);
    return res.data;
  } catch (error) {
    // baseFetch expected to throw the error message string or object
    const msg = error?.response?.data?.message || error?.message || "Request failed";
    throw msg;
  }
}
